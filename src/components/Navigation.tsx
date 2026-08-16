import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { currentPath, navigateTo, openEnquiryModal } = useNavigation();
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'CASE STUDIES', path: '/work' },
    { label: 'SERVICES', path: '/services' },
    { label: 'HOW WE WORK', path: '/how-we-work' },
    { label: 'ABOUT', path: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-[#0C0C0C]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#222222]/80 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo Left */}
          <button
            onClick={() => navigateTo('/')}
            className="flex items-center gap-3 group cursor-pointer py-1"
          >
            <img
              src="/Logo/Logo mockup.png"
              alt="Circle Dot Design Studio"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </button>

          {/* Desktop Nav Center */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-widest text-gray-600 dark:text-[#A5A8A1]">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigateTo(link.path)}
                className={`hover:text-gray-900 dark:hover:text-[#F3F4EF] transition-colors cursor-pointer uppercase ${
                  currentPath === link.path ? 'text-[#E30613] font-semibold' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA & Theme Toggle Right */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-gray-300 dark:border-[#222222] bg-gray-100 dark:bg-[#141414] text-gray-800 dark:text-[#F3F4EF] hover:border-[#E30613] transition-all cursor-pointer flex items-center justify-center"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <button
              onClick={() => openEnquiryModal()}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-gray-300 dark:border-[#F3F4EF]/20 bg-gray-100 dark:bg-[#F3F4EF]/5 text-xs font-medium tracking-wider text-gray-900 dark:text-[#F3F4EF] hover:border-[#E30613] hover:text-[#E30613] dark:hover:text-[#E30613] transition-all cursor-pointer group"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#E30613]" />
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle + Menu */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-gray-300 dark:border-[#222222] bg-gray-100 dark:bg-[#141414] text-gray-800 dark:text-[#F3F4EF]"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-900 dark:text-[#F3F4EF] hover:text-[#E30613] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 dark:bg-[#0C0C0C]/95 backdrop-blur-2xl md:hidden flex flex-col justify-between p-8 pt-28">
          <div className="flex flex-col gap-6 text-lg font-display tracking-wider">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigateTo(link.path);
                }}
                className={`text-left py-2 border-b border-gray-200 dark:border-[#222222] ${
                  currentPath === link.path ? 'text-[#E30613] font-bold' : 'text-gray-900 dark:text-[#F3F4EF]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-[#222222] flex flex-col gap-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openEnquiryModal();
              }}
              className="w-full py-3.5 rounded-full bg-[#E30613] text-white font-semibold text-sm tracking-wider flex items-center justify-center gap-2"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-center text-gray-500 dark:text-[#A5A8A1]">
              Circle Dot Design Studio · India / Global
            </p>
          </div>
        </div>
      )}
    </>
  );
};
