import { NextRequest, NextResponse } from "next/server";

/**
 * API route untuk newsletter signup — terima email dari NewsletterBanner,
 * lalu kirim ke Brevo (Contacts API) supaya masuk ke List subscriber blog.
 *
 * Kenapa lewat API route, bukan fetch langsung dari client:
 * BREVO_API_KEY adalah secret dan tidak boleh kebawa ke browser. Route ini
 * jalan di server Next.js, jadi key-nya aman.
 */

const BREVO_API_URL = "https://api.brevo.com/v3/contacts";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email tidak valid." },
        { status: 400 },
      );
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (!apiKey || !listId) {
      console.error(
        "BREVO_API_KEY atau BREVO_LIST_ID belum di-set di environment variables.",
      );
      return NextResponse.json(
        { error: "Newsletter belum dikonfigurasi. Coba lagi nanti." },
        { status: 500 },
      );
    }

    const brevoResponse = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [Number(listId)],
        updateEnabled: true, // kalau email sudah ada, update saja (jangan error)
      }),
    });

    // Brevo balas 204 untuk sukses, atau 400 dengan code "duplicate_parameter"
    // kalau email sudah pernah subscribe sebelumnya — keduanya kita anggap sukses
    // dari sisi user (mereka tidak perlu tahu detail ini).
    if (brevoResponse.ok || brevoResponse.status === 204) {
      return NextResponse.json({ success: true });
    }

    const errorData = await brevoResponse.json().catch(() => null);

    if (errorData?.code === "duplicate_parameter") {
      return NextResponse.json({ success: true });
    }

    console.error("Brevo API error:", errorData);
    return NextResponse.json(
      { error: "Gagal mendaftarkan email. Coba lagi." },
      { status: 502 },
    );
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan. Coba lagi." },
      { status: 500 },
    );
  }
}
