import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  async redirects() {
    return [
      { source: '/learn/:path*',    destination: '/cookbook/:path*',    permanent: true },
      { source: '/practice/:path*', destination: '/kitchen/:path*',     permanent: true },
      { source: '/community',       destination: '/open-tables',        permanent: true },
      { source: '/fun',             destination: '/side-dish',          permanent: true },
      { source: '/glossary',        destination: '/pantry',             permanent: true },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
