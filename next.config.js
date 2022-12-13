/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "ist-363-restaurants.local",
      }
    ]
  }
}

module.exports = nextConfig
