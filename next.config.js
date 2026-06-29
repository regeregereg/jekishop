async rewrites() {
  return [
    {
      source: '/blog',
      destination: 'https://jekiblog.vercel.app/blog',
    },
    {
      source: '/blog/:path*',
      destination: 'https://jekiblog.vercel.app/blog/:path*',
    },
  ];
},
