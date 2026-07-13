import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Terminal } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Home', path: 'home' },
  { name: 'IUPC', path: 'iupc' },
  { name: 'Hackathon', path: 'hackathon' },
  { name: 'CTF', path: 'ctf' },
  { name: 'Timeline', path: 'timeline' },
  { name: 'FAQ', path: 'faq' },
  { name: 'Contact', path: 'contact' },
];

export default function Navbar({ activePage, setActivePage }) {
  const { darkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-bgLight/90 dark:bg-bgDark/85 backdrop-blur-md border-b border-primary/20 dark:border-bgDark-border shadow-md' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => { setActivePage('home'); setIsOpen(false); }}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <div className="p-1.5 rounded-lg bg-primary/10 dark:bg-accent-cyan/10 border border-primary/25 dark:border-accent-cyan/25 group-hover:border-accent-cyan/60 transition-colors">
            <Terminal className="w-5 h-5 text-primary dark:text-accent-cyan" />
          </div>
          <span className="font-mono font-bold text-lg tracking-wider text-primary dark:text-white">
            BUP<span className="text-primary dark:text-accent-cyan">.TECHFEST</span>
          </span>
        </div>

        {/* Desktop Menu - High contrast text sizes */}
        <div className="hidden md:flex items-center space-x-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => setActivePage(item.path)}
              className={`relative px-4 py-2 font-sans text-sm uppercase tracking-wider font-bold transition-colors duration-200 ${
                activePage === item.path 
                  ? 'text-primary dark:text-accent-cyan' 
                  : 'text-primary dark:text-white hover:text-primary-light dark:hover:text-accent-cyan'
              }`}
            >
              {item.name}
              {activePage === item.path && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary dark:bg-accent-cyan"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}

          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full border border-primary/20 dark:border-white/10 hover:bg-primary/5 dark:hover:bg-white/5 text-primary dark:text-white transition-all"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-accent-cyan" /> : <Moon className="w-4 h-4 text-primary" />}
          </button>

          {/* Registration Button */}
          <button
            onClick={() => setActivePage('registration')}
            className="ml-6 px-5 py-2 font-sans text-sm uppercase tracking-wider border border-primary dark:border-accent-cyan bg-primary dark:bg-transparent text-white dark:text-accent-cyan hover:bg-transparent hover:text-primary dark:hover:bg-accent-cyan/10 transition-all duration-300 rounded-sm font-bold shadow-md"
          >
            Register Now
          </button>
        </div>

        {/* Mobile Toggler */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-primary/20 dark:border-white/10 text-primary dark:text-white"
          >
            {darkMode ? <Sun className="w-4 h-4 text-accent-cyan" /> : <Moon className="w-4 h-4 text-primary" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-primary dark:text-white hover:text-accent-cyan transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-primary/20 dark:border-bgDark-border bg-bgLight dark:bg-bgDark/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    setActivePage(item.path);
                    setIsOpen(false);
                  }}
                  className={`py-2 text-left font-sans text-sm uppercase tracking-wider font-bold ${
                    activePage === item.path ? 'text-primary dark:text-accent-cyan' : 'text-primary dark:text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => {
                  setActivePage('registration');
                  setIsOpen(false);
                }}
                className="w-full mt-4 py-3 text-center font-sans text-xs uppercase tracking-widest bg-primary dark:bg-accent-cyan text-white dark:text-bgDark font-bold rounded-sm shadow-md"
              >
                Register Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}