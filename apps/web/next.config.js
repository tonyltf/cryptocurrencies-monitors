module.exports = (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    /* config options here */
    reactStrictMode: true,
    transpilePackages: ["ui"],
    output: 'standalone',
    env: { 
      SERVER_API_PATH: process.env.SERVER_API_PATH ,
      EXTERNAL_API_PATH: process.env.EXTERNAL_API_PATH,
    },
  };
  console.log(process.env.SERVER_API_PATH, { nextConfig });
  return nextConfig;
}