/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1) GitHub Pages hosting path
  basePath: "/My-Portfolio-Website",
  // 2) Load static assets using relative paths
  assetPrefix: "/My-Portfolio-Website/",
  // 3) Export with trailing slashes for folder structure (/about → /about/index.html)
  trailingSlash: true,
  // 4) Static export configuration
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
