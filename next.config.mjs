/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow images from all domains
      },
    ],
  },
};

export default nextConfig;
