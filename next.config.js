/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "multai.co.uk" }], // non-www incoming
        destination: "https://www.multai.co.uk/:path*",
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
