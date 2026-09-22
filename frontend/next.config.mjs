/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three", "gsap", "lenis"],
  output: "export",
  distDir: "dist",
};

export default nextConfig;
