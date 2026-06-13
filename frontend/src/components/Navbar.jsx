import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, PhoneCall, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isCurrent = (path) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Fleet', path: '/fleet' },
    { name: 'Coverage', path: '/coverage' },
    { name: 'Compliance', path: '/compliance' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-3 bg-white/80 dark:bg-brand-slate-950/80 backdrop-blur-md shadow-md border-b border-brand-slate-100 dark:border-brand-slate-900' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logoImg} alt="Maa Ugra Tara Roadways" className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-outfit font-extrabold text-lg sm:text-xl leading-none text-brand-slate-900 dark:text-white group-hover:text-brand-blue-500 transition-colors">
                MAA UGRA TARA
              </span>
              <span className="font-sans font-bold text-xs tracking-widest text-brand-orange-500">
                ROADWAYS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium text-sm transition-colors duration-200 ${
                  isCurrent(link.path)
                    ? 'text-brand-orange-500'
                    : 'text-brand-slate-600 dark:text-brand-slate-300 hover:text-brand-blue-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Toolbar Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-brand-slate-100 hover:bg-brand-slate-200 dark:bg-brand-slate-900 dark:hover:bg-brand-slate-800 text-brand-slate-600 dark:text-brand-slate-300 transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Quick Contact Button */}
            <a href="tel:+919142021216" className="flex items-center gap-1.5 text-xs font-bold text-brand-blue-600 dark:text-brand-blue-400 bg-brand-blue-50 dark:bg-brand-blue-950/30 px-3 py-2 rounded-lg border border-brand-blue-100 dark:border-brand-blue-900/50 hover:bg-brand-blue-100 dark:hover:bg-brand-blue-950/60 transition-colors">
              <PhoneCall className="h-3.5 w-3.5" />
              Call Now
            </a>

            {/* CTA */}
            <Link to="/contact" className="btn-accent px-4 py-2 text-sm">
              Get Quote
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-brand-slate-100 dark:bg-brand-slate-900 text-brand-slate-600 dark:text-brand-slate-300 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg bg-brand-slate-100 dark:bg-brand-slate-900 text-brand-slate-600 dark:text-brand-slate-300 hover:text-brand-blue-500 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-brand-slate-950 z-50 shadow-2xl p-6 border-l border-brand-slate-100 dark:border-brand-slate-900 lg:hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <img src={logoImg} alt="Maa Ugra Tara Roadways" className="h-8 w-auto object-contain" />
                    <span className="font-outfit font-extrabold text-base leading-none text-brand-slate-900 dark:text-white">
                      MAA UGRA TARA
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg bg-brand-slate-100 dark:bg-brand-slate-900 text-brand-slate-600 dark:text-brand-slate-300 cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`font-semibold text-lg py-2 border-b border-brand-slate-100 dark:border-brand-slate-900/50 transition-colors ${
                        isCurrent(link.path)
                          ? 'text-brand-orange-500'
                          : 'text-brand-slate-700 dark:text-brand-slate-350 hover:text-brand-blue-500'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-8">
                <a href="tel:+919142021216" className="flex items-center justify-center gap-2 text-brand-blue-600 dark:text-brand-blue-400 bg-brand-blue-50 dark:bg-brand-blue-950/20 px-4 py-3 rounded-lg border border-brand-blue-100 dark:border-brand-blue-900/40 font-bold">
                  <PhoneCall className="h-4 w-4" />
                  Call Support (+91-91420-21216)
                </a>
                <Link to="/contact" className="btn-accent py-3 font-bold text-center">
                  Get Free Quote
                </Link>
                <div className="flex justify-center items-center gap-1.5 text-xs text-brand-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  GST Registered Logistics Provider
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
