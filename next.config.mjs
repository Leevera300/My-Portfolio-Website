/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath:
    process.env.NODE_ENV === "production" ? "/My-Portfolio-Website" : "",
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/My-Portfolio-Website/" : "",
  trailingSlash: true,
};

export default nextConfig;
