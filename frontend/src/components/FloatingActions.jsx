import React, { useState, useEffect } from 'react';
import { MessageSquare, PhoneCall, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-45 flex flex-col gap-2.5 sm:gap-3">
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/919142021216?text=Hello%2C%20I%20am%20inquiring%20about%20transportation%20services%20from%20Maa%20Ugra%20Tara%20Roadways."
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer group relative"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 fill-white" />
        <span className="absolute right-14 bg-white dark:bg-brand-slate-900 text-brand-slate-800 dark:text-white text-xs font-semibold px-2 py-1 rounded shadow-md border border-brand-slate-100 dark:border-brand-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp Inquiry
        </span>
      </motion.a>

      {/* Call Now Button */}
      <motion.a
        href="tel:+919142021216"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-orange-500 hover:bg-brand-orange-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer group relative"
        aria-label="Call Office"
      >
        <PhoneCall className="h-4.5 w-4.5 sm:h-5 sm:w-5 fill-white" />
        <span className="absolute right-14 bg-white dark:bg-brand-slate-900 text-brand-slate-800 dark:text-white text-xs font-semibold px-2 py-1 rounded shadow-md border border-brand-slate-100 dark:border-brand-slate-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Call Now
        </span>
      </motion.a>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-slate-700 hover:bg-brand-slate-800 dark:bg-brand-slate-800 dark:hover:bg-brand-slate-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActions;
