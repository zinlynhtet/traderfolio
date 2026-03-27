/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // For GitHub Pages deployment
  basePath: process.env.GITHUB_ACTIONS ? '/v0-trader-portfolio' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/v0-trader-portfolio/' : '',
  trailingSlash: true,
}

export default nextConfig
