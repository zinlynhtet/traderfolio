/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Fixed: Changed from '/v0-trader-portfolio' to '/traderfolio'
  basePath: process.env.GITHUB_ACTIONS ? '/traderfolio' : '',

  // assetPrefix helps ensure CSS and JS files load from the subfolder
  assetPrefix: process.env.GITHUB_ACTIONS ? '/traderfolio/' : '',

  trailingSlash: true,
}

export default nextConfig