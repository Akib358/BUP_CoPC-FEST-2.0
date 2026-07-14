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
import AdminPortal from './pages/AdminPortal';
import FAQSection from './pages/Home/FAQSection';
import { ThemeProvider } from './context/ThemeContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Terminal, X } from 'lucide-react';

// Custom Tech Vector Icons
const IupcIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

const HackathonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <polyline points="7 9 10 12 7 15" />
    <line x1="12" y1="15" x2="16" y2="15" />
  </svg>
);

const CtfIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7s0 6 8 10z" />
    <rect x="9" y="11" width="6" height="5" rx="1" />
    <path d="M10.5 11V9a1.5 1.5 0 0 1 3 0v2" />
  </svg>
);

const INITIAL_REGISTRATIONS = [
  { id: 101, fullName: "Abrar Shahriar", email: "abrar@buet.ac.bd", phone: "01711223344", university: "BUET", department: "CSE", studentId: "202214001", teamName: "CodeCrafters", track: "iupc", member2Name: "Tahmid Hasan", member3Name: "Nabil Ahmed", paymentStatus: "Approved" },
  { id: 102, fullName: "Farzana Yasmin", email: "farzana@bup.edu.bd", phone: "01822334455", university: "BUP", department: "ICT", studentId: "24107621", teamName: "ByteMe", track: "hackathon", member2Name: "Sadman Sakib", member3Name: "Zarif Rahman", paymentStatus: "Pending" },
  { id: 103, fullName: "Tanvir Anjum", email: "tanvir@mist.ac.bd", phone: "01933445566", university: "MIST", department: "CSE", studentId: "202114055", teamName: "SecBreakers", track: "ctf", member2Name: "Imtiaz Kabir", member3Name: "Rakib Khan", paymentStatus: "Approved" },
  { id: 104, fullName: "Maimuna Tasnim", email: "maimuna@du.ac.bd", phone: "01544556677", university: "DU", department: "CSE", studentId: "30225102", teamName: "DU_Algorithm_X", track: "iupc", member2Name: "Rohan Kabir", member3Name: "Tasfia Ahmed", paymentStatus: "Pending" }
];

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [registrations, setRegistrations] = useState(INITIAL_REGISTRATIONS);
  const [currentUser, setCurrentUser] = useState(null); 
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('iupc');

  const triggerRegistrationFlow = () => {
    setShowTrackModal(true);
  };

  const handleTrackSelection = (track) => {
    setSelectedTrack(track);
    setShowTrackModal(false);
    setActivePage('registration');
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home setActivePage={setActivePage} triggerRegistration={triggerRegistrationFlow} registrations={registrations} />;
      case 'iupc':
        return <IUPC setActivePage={setActivePage} triggerRegistration={triggerRegistrationFlow} />;
      case 'hackathon':
        return <Hackathon setActivePage={setActivePage} triggerRegistration={triggerRegistrationFlow} />;
      case 'ctf':
        return <CTF setActivePage={setActivePage} triggerRegistration={triggerRegistrationFlow} />;
      case 'timeline':
        return <TimelinePage />;
      case 'faq':
        return <div className="pt-24 pb-12"><FAQSection /></div>;
      case 'contact':
        return <Contact />;
      case 'registration':
        return (
          <Registration 
            setActivePage={setActivePage} 
            selectedTrack={selectedTrack} 
            registrations={registrations}
            setRegistrations={setRegistrations}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        );
      case 'admin':
        return (
          <AdminPortal 
            setActivePage={setActivePage} 
            registrations={registrations} 
            setRegistrations={setRegistrations}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        );
      default:
        return <Home setActivePage={setActivePage} triggerRegistration={triggerRegistrationFlow} registrations={registrations} />;
    }
  };

  return (
    <ThemeProvider>
      <GlowCursor />

      <div className="flex flex-col min-h-screen text-primary dark:text-white transition-colors duration-300">
        <Navbar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          triggerRegistration={triggerRegistrationFlow} 
        />
        
        <main className="flex-1 relative">
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
        </main>

        <Footer setActivePage={setActivePage} />
      </div>

      <AnimatePresence>
        {showTrackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bgDark/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-lg w-full rounded border border-[#0d2d6c] bg-[#051638] p-6 shadow-2xl font-mono text-white space-y-6"
            >
              <button 
                onClick={() => setShowTrackModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full border border-white/10 hover:border-accent-cyan text-white/50 hover:text-accent-cyan transition-colors"
                aria-label="Close track selector modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1.5">
                <span className="text-[10px] text-accent-cyan tracking-widest font-bold block">
                  [ STEP_01_SELECT_SECTOR ]
                </span>
                <h3 className="font-sans font-bold text-xl">CHOOSE COMPETITION TRACK</h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'iupc', icon: IupcIcon, title: 'IUPC Contest', desc: 'Inter-University competitive programming sprint.' },
                  { id: 'hackathon', icon: HackathonIcon, title: '24H Hackathon', desc: 'Hardware, IoT, AI, and Software prototype deployment.' },
                  { id: 'ctf', icon: CtfIcon, title: 'CTF Championship', desc: 'Jeopardy-style cybersecurity flag capture.' }
                ].map((track) => {
                  const Icon = track.icon;
                  return (
                    <button
                      key={track.id}
                      onClick={() => handleTrackSelection(track.id)}
                      className="flex items-center space-x-4 p-4 rounded border border-white/10 hover:border-accent-cyan hover:bg-accent-cyan/5 text-left transition-all"
                    >
                      <div className="p-3 bg-white/5 rounded text-accent-cyan">
                        <Icon />
                      </div>
                      <div>
                        <h4 className="font-sans font-bold text-sm text-white">{track.title}</h4>
                        <p className="text-[11px] text-white/50 leading-relaxed">{track.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
}