/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-supabase-url.supabase.co'], // Replace with your actual Supabase domain
  },
  // Remove experimental if using Next.js 14+
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = nextConfig;