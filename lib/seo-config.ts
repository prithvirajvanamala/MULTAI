// lib/seo-config.ts
export const defaultSEO = {
  title: 'MULTAI | Delivering creative solutions that turn vision into reality',
  description: 'MULTAI offers IT services and products tailored to transform your vision into results.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.multai.com/',
    site_name: 'MULTAI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MULTAI Website Preview',
      },
    ],
  },
  twitter: {
    handle: '@your_handle',
    site: '@your_handle',
    cardType: 'summary_large_image',
  },
};
