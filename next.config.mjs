/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Adding fallback for 'fs' module
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // This prevents errors related to the 'fs' module in the browser
    };

    return config;
  },
};

export default nextConfig;
