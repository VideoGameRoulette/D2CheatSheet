/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export' disabled for Docker/Node server; enable for static hosting (e.g. GitHub Pages)
  images: {
    unoptimized: true,
  },
  // Preserve existing static assets
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : undefined,
};

module.exports = nextConfig;
