/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_PAGES ? "/my-portfolio" : "",
  assetPrefix: process.env.GITHUB_PAGES ? "/my-portfolio/" : "",
};

export default nextConfig;
