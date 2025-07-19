/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // enables App Router if not already
  },
  reactStrictMode: true,
  images: {
    domains: ['your-supabase-url.supabase.co'], // replace if you're using Supabase storage
  },
};

module.exports = nextConfig;
