/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "ist-363-restaurants.local",
      },
      {
        hostname: "restaurants.ist363.xyz",
      }
    ]
  }
}

module.exports = nextConfig
