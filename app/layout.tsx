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
    { label: 'Blog', href: '/blog' }, // ✅ BLOG route
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
      <body className={`transition-opacity duration-500 ease-in-out ${fadeTransition ? 'opacity-100' : 'opacity-0'} bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans`}>
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b shadow">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="MULTAI Logo" width={40} height={40} />
            </Link>

            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium relative">
              {navItems.map((item) =>
                item.dropdown ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      cancelDropdownClose();
                      setShowDropdown(true);
                    }}
                    onMouseLeave={closeDropdown}
                  >
                    <button className={`flex items-center gap-1 hover:text-cyan-400 transition ${pathname.startsWith('/services') ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
                      {item.label} <span>▾</span>
                    </button>
                    {showDropdown && (
                      <div className="absolute top-full left-0 bg-white dark:bg-gray-800 border shadow rounded w-56 z-50" onMouseEnter={cancelDropdownClose} onMouseLeave={closeDropdown}>
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setShowDropdown(false)}
                            className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              pathname === subItem.href ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 font-medium' : 'text-gray-800 dark:text-white'
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={item.href} href={item.href} className={`hover:text-blue-500 transition ${pathname === item.href ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-300'}`}>
                    {item.label}
                  </Link>
                )
              )}
              <button onClick={toggleTheme} className="ml-4 hover:scale-110 transition-transform text-sm">
                {darkMode ? '☀️' : '🌙'}
              </button>
            </nav>

            {/* Mobile Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setShowMobileMenu(!showMobileMenu)} aria-label="Toggle Menu" className="text-2xl text-gray-600 dark:text-gray-300">☰</button>
              <button onClick={toggleTheme} className="ml-4 text-xl text-gray-600 dark:text-gray-300">{darkMode ? '☀️' : '🌙'}</button>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="md:hidden px-6 pb-4 space-y-2">
              {navItems.map((item) =>
                item.dropdown ? (
                  <details key={item.label} className="group border rounded overflow-hidden">
                    <summary className="cursor-pointer py-2 px-4 flex justify-between items-center text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <span>{item.label}</span>
                      <span className="transform transition-transform group-open:rotate-90">▶</span>
                    </summary>
                    <div className="ml-4 mt-1 mb-2 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setShowMobileMenu(false)}
                          className={`block text-sm px-4 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                            pathname === subItem.href ? 'text-blue-600 font-medium' : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link key={item.href} href={item.href} onClick={() => setShowMobileMenu(false)} className={`block py-2 px-4 rounded ${pathname === item.href ? 'text-blue-600 font-semibold' : 'text-gray-800 dark:text-gray-200'}`}>
                    {item.label}
                  </Link>
                )
              )}
            </div>
          )}
        </header>

        {/* MAIN CONTENT */}
        <main className="min-h-[80vh] px-4 transition-opacity duration-500 ease-in-out">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-t dark:border-gray-700 py-10 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium">Say Hello</button>
                <button className="w-full px-4 py-2 border border-gray-400 dark:border-gray-500 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition" >Newsletter</button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">USA Office</h4>
              <p className="text-sm">123 Silicon Valley Blvd,<br />San Francisco, CA, USA</p>
              <p className="text-sm mt-2">📞 +1 987 654 3210</p>
              <p className="text-sm">✉️ usa@multai.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">India Office</h4>
              <p className="text-sm">456 Hitech City Road,<br />Hyderabad, India</p>
              <p className="text-sm mt-2">📞 +91 98765 43210</p>
              <p className="text-sm">✉️ india@multai.com</p>
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4 text-xl">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><FaLinkedinIn /></a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700"><FaFacebookF /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500"><FaInstagram /></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600"><FaYoutube /></a>
                <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hover:text-green-500"><FaWhatsapp /></a>
              </div>
            </div>
          </div>
          <div className="text-center text-xs mt-10 text-gray-500 dark:text-gray-500">
            &copy; 2025 MULTAI. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
