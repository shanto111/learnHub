// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb", // Adjust the limit as needed
    },
  },
  images: {
    formats: ["image/webp"], // avif বাদ দেওয়া আছে
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co", // external image host allow করা হলো
      },
    ],
  },
};

export default nextConfig;
