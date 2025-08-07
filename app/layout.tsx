'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import '../styles/globals.css';
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from 'react-icons/fa';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [fadeTransition, setFadeTransition] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const dropdownTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setFadeTransition(false);
    const timeout = setTimeout(() => setFadeTransition(true), 100);
    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? 'light' : 'dark';
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
  };

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
      label: 'Services',
      href: '/services',
      dropdown: [
        { label: 'App Development', href: '/services/app-development' },
        { label: 'Data & AI', href: '/services/data-ai' },
        { label: 'QA Testing', href: '/services/qa' },
        { label: 'UI/UX Design', href: '/services/uiux' },
        { label: 'Digital Marketing', href: '/services/marketing' },
      ],
    },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ];

  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => setShowDropdown(false), 200);
  };

  const cancelDropdownClose = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
  };

  return (
    <html lang="en" className={darkMode ? 'dark scroll-smooth' : 'scroll-smooth'}>
      <head>
        <title>MULTAI | Delivering creative solutions that turn vision into reality</title>
        <meta name="description" content="MULTAI is a modern IT company providing innovative, scalable, and open-source-friendly software solutions for businesses globally." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content={darkMode ? '#0f172a' : '#ffffff'} />

        {/* Open Graph */}
        <meta property="og:title" content="MULTAI | Delivering creative solutions that turn vision into reality" />
        <meta property="og:description" content="Discover our innovative services in app development, data & AI, digital marketing, and more." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://www.multai.com" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MULTAI | Delivering creative solutions that turn vision into reality" />
        <meta name="twitter:description" content="Explore our services in software, AI, and digital solutions for businesses worldwide." />
        <meta name="twitter:image" content="/og-image.png" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "MULTAI",
              url: "https://www.multai.com",
              logo: "https://www.multai.com/logo.png",
              sameAs: [
                "https://linkedin.com",
                "https://facebook.com",
                "https://instagram.com",
                "https://youtube.com"
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-987-654-3210",
                contactType: "Customer Support",
                areaServed: "US",
                availableLanguage: "English"
              }
            }),
          }}
        />
      </head>
      <body className={`transition-opacity duration-500 ease-in-out ${fadeTransition ? 'opacity-100' : 'opacity-0'} bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans`}>
        {/* NAVBAR */}
        {/* ... (No changes to navbar, footer, or mobile menu) ... */}

        {/* Include your existing full NAVBAR and FOOTER code here unchanged */}
        {/* MAIN CONTENT */}
        <main className="min-h-[80vh] px-4 transition-opacity duration-500 ease-in-out">
          {children}
        </main>

        {/* FOOTER */}
        {/* (your existing footer content remains unchanged) */}
      </body>
    </html>
  );
}
