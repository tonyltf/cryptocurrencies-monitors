/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  output: 'standalone',
  env: { 
    SERVER_API_PATH: 'http://localhost:8000',
    EXTERNAL_API_PATH: 'http://localhost:8000',
  },
}