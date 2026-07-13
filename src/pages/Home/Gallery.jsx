import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

const GALLERY_ITEMS = [
  { id: 1, category: 'Coding', title: 'IUPC Final Battleground', url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80' },
  { id: 2, category: 'Hackathon', title: '24H Pitch Sweep', url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80' },
  { id: 3, category: 'Cyber', title: 'CTF Roster Sweeps', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80' },
  { id: 4, category: 'Networking', title: 'Alumni Core Summit', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80' },
  { id: 5, category: 'Campus', title: 'BUP Multi-Lab Grid', url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
  { id: 6, category: 'Awarding', title: 'Locked Trophy Seeding', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80' },
];

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section className="py-20 px-6 bg-primary/5 dark:bg-bgDark-card/10 border-y border-bgLight-border dark:border-bgDark-border relative">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex p-1.5 rounded-full border border-primary/10 dark:border-accent-cyan/25 text-primary dark:text-accent-cyan font-mono text-[9px] tracking-widest font-bold uppercase bg-bgLight dark:bg-bgDark">
            [ PORTAL MEDIA ]
          </div>
          <h2 className="text-3xl font-bold text-primary dark:text-white">
            FESTIVAL ARCHIVES
          </h2>
          {/* Prominent high-contrast creamy white description */}
          <p className="text-base sm:text-lg font-sans font-semibold text-stone-100 dark:text-stone-100 leading-relaxed max-w-xl mx-auto">
            Take a look back at moments from the historical technical carnivals on BUP campus.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="relative group aspect-video rounded-md overflow-hidden border border-bgLight-border dark:border-bgDark-border bg-bgLight-card dark:bg-bgDark-card cursor-pointer shadow-md"
              onClick={() => setSelectedImg(item)}
            >
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover" 
              />

              <div className="absolute inset-0 bg-primary/80 dark:bg-bgDark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10">
                <div className="flex justify-between items-start font-mono">
                  <span className="text-[10px] tracking-widest text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded-sm uppercase font-bold">
                    {item.category}
                  </span>
                  <Maximize2 className="w-4 h-4 text-white/50 hover:text-accent-cyan transition-colors" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-sans font-bold text-white text-base">
                    {item.title}
                  </h4>
                  <span className="block font-mono text-[9px] text-white/40 uppercase">
                    BUP MEDIA DEPT INDEX: {item.id}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bgDark/90 backdrop-blur-md"
          >
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-accent-cyan text-white/70 hover:text-accent-cyan transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-video rounded-md overflow-hidden border border-white/10 bg-bgDark shadow-2xl"
            >
              <img 
                src={selectedImg.url} 
                alt={selectedImg.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent font-mono text-white space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-accent-cyan font-bold">
                  {selectedImg.category}
                </span>
                <h3 className="font-sans font-bold text-lg">{selectedImg.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}