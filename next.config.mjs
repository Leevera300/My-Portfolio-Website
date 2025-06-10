/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true, // required if you use <Image />
  },
  basePath: "/My-Portfolio-Website",
  assetPrefix: "/My-Portfolio-Website/",
};

export default nextConfig;
