import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import GlowCursor from './components/interactive/GlowCursor';
import Home from './pages/Home';
import IUPC from './pages/IUPC';
import Hackathon from './pages/Hackathon';
import CTF from './pages/CTF';
import TimelinePage from './pages/TimelinePage';
import Contact from './pages/Contact';
import Registration from './pages/Registration';
import FAQSection from './pages/Home/FAQSection';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} />;
      case 'iupc':
        return <IUPC setActivePage={setActivePage} />;
      case 'hackathon':
        return <Hackathon setActivePage={setActivePage} />;
      case 'ctf':
        return <CTF setActivePage={setActivePage} />;
      case 'timeline':
        return <TimelinePage />;
      case 'faq':
        return (
          <div className="pt-24 pb-12">
            <FAQSection />
          </div>
        );
      case 'contact':
        return <Contact />;
      case 'registration':
        return <Registration setActivePage={setActivePage} />;
      default:
        return <Home setActivePage={setActivePage} />;
    }
  };

  return (
    <ThemeProvider>
      {/* Interactive cursor elements */}
      <GlowCursor />

      {/* Primary Layout */}
      <div className="flex flex-col min-h-screen text-primary dark:text-white transition-colors duration-300">
        <Navbar activePage={activePage} setActivePage={setActivePage} />
        
        <main className="flex-1 relative">
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
        </main>

        <Footer setActivePage={setActivePage} />
      </div>
    </ThemeProvider>
  );
}