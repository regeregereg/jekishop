import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleBody } from "@/components/article/ArticleBody";
import { ReadingProgress } from "@/components/article/ReadingProgress";
import { TableOfContents } from "@/components/article/TableOfContents";
import { ShareButtons } from "@/components/article/ShareButtons";
import { TagList } from "@/components/article/TagList";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { BackToTop } from "@/components/interactive/BackToTop";
import {
  dummyArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/dummy-data";
import { extractHeadings } from "@/lib/article-utils";
import { siteConfig } from "@/lib/site-config";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return dummyArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.heroImageUrl }],
      publishedTime: article.publishedAt,
      authors: [article.author.name],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const headings = extractHeadings(article.body);
  const related = getRelatedArticles(article);
  const articleUrl = `${siteConfig.url}/blog/${article.slug}`;

  return (
    <>
      <Navbar showBackButton />
      <ReadingProgress />

      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-4 sm:px-6 pt-4">
          <Breadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              {
                label: article.category.name,
                href: `/blog/kategori/${article.category.slug}`,
              },
              { label: article.title },
            ]}
          />

          <div className="mt-4">
            <ArticleHeader article={article} />
          </div>

          {headings.length > 0 && (
            <div className="mt-6">
              <TableOfContents headings={headings} />
            </div>
          )}

          <div className="mt-7">
            <ArticleBody blocks={article.body} />
          </div>

          <div className="mt-8">
            <TagList tags={article.tags} />
          </div>

          <div className="mt-6 pb-8 border-b border-border">
            <ShareButtons url={articleUrl} title={article.title} />
          </div>
        </article>

        <section className="mx-auto max-w-5xl px-4 sm:px-6 mt-10 mb-12">
          <RelatedArticles articles={related} />
        </section>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
