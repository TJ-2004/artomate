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
    ],
  },
};
export default nextConfig;
