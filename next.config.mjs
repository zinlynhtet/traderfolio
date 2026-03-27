/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_ACTIONS ? '/traderfolio' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/traderfolio/' : '',
  trailingSlash: true,
}

export default nextConfig