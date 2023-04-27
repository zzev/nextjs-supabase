/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async headers() {
    return [{
      // matching all API routes
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: 'http://app.localhost:3000' },
        { key: "Access-Control-Allow-Methods", value: "OPTIONS, GET, POST, PUT, PATCH, DELETE" },
        { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
      ]}
    ]
  },
  async rewrites() {
    return [{
       has: [{
          type: 'host',
          value: 'app.localhost',
        }],
       source: '/:path*',
       destination: '/app/:path*'
    }]
  }
}

module.exports = nextConfig
