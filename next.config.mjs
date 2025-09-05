/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lexica-serve-encoded-images.sharif.workers.dev",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.lexica.art",
        port: "",
        pathname: "/**",
      },
    ],
  },
  outputFileTracingRoot: process.cwd(),
};
export default nextConfig;
