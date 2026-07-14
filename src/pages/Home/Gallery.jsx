import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, X, Maximize2 } from 'lucide-react';

const GALLERY_ITEMS = [
  { 
    id: 1, 
    category: 'CP Contest', 
    title: 'Introductory CP Contest', 
    date: '28-02-2026', 
    venue: 'Gen Belal Tower, BUP', 
    year: '2026',
    images: [
      '/assets/gallery/introductory_cp/img1.JPG',
      '/assets/gallery/introductory_cp/cp1.JPG',
      '/assets/gallery/introductory_cp/cp2.JPG',
      '/assets/gallery/introductory_cp/cp3.JPG'
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
    ]
  },

  { 
    id: 2, 
    category: 'Tech Carnival', 
    title: 'CSE Tech Carnival, 2025', 
    date: '25-08-2025', 
    venue: 'BUP', 
    year: '2025',
    images: [
      '/assets/gallery/tech_carnival/img3.JPG',
      '/assets/gallery/tech_carnival/fest1.JPG',
      '/assets/gallery/tech_carnival/fest2.JPG',
      '/assets/gallery/tech_carnival/fest3.JPG'
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
    ]
  },

  { 
    id: 3, 
    category: 'Team Forming', 
    title: 'Team Forming Contest 2026', 
    date: '07-03-2026', 
    venue: 'FBS tower, BUP', 
    year: '2026',
    images: [
      '/assets/gallery/team_forming/img2.JPG',
      '/assets/gallery/team_forming/tfc1.JPG',
      '/assets/gallery/team_forming/tfc2.JPG',
      '/assets/gallery/team_forming/tfc3.JPG'
    ],
    fallbacks: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
    ]
  },
];

export default function Gallery() {
  const [selectedEvent, setSelectedEvent] = useState(null); // Active event object in Lightbox
  const [activeImg, setActiveImg] = useState(0); // Slideshow index

  // Slide transition interval (5s loop) running inside active Lightbox
  useEffect(() => {
    if (selectedEvent === null) return;

    const interval = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedEvent]);

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev + 1) % 3);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev - 1 + 3) % 3);
  };

  const openLightbox = (item) => {
    setSelectedEvent(item);
    setActiveImg(0);
  };

  return (
    <section className="py-20 px-6 bg-primary/5 dark:bg-bgDark-card/10 border-y border-bgLight-border dark:border-bgDark-border relative">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <div className="inline-flex p-1.5 rounded-full border border-primary/10 dark:border-accent-cyan/25 text-primary dark:text-accent-cyan font-mono text-[9px] tracking-widest font-bold uppercase bg-bgLight dark:bg-bgDark">
            [ PORTAL MEDIA ]
          </div>
          <h2 className="text-3xl font-bold text-primary dark:text-white">
            FESTIVAL ARCHIVES
          </h2>
          <p className="text-base sm:text-lg font-sans font-semibold text-stone-100 dark:text-stone-100 leading-relaxed max-w-xl mx-auto">
            Take a look back at moments from the historical technical carnivals on BUP campus.
          </p>
        </div>

        {/* Stable 3-Column Grid for cards on Homepage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="relative group aspect-video rounded-md overflow-hidden border border-primary/20 dark:border-white/5 bg-bgLight-card dark:bg-[#051638]/90 cursor-pointer shadow-lg hover:border-accent-cyan transition-all duration-300"
            >
              {/* Cover Image */}
              <img 
                src={item.images[0]} 
                onError={(e) => {
                  e.target.src = item.fallbacks[0];
                }}
                className="w-full h-full object-cover select-none" 
              />

              {/* Hover overlay details */}
              <div className="absolute inset-0 bg-primary/80 dark:bg-bgDark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 z-10">
                <div className="flex justify-between items-start font-mono">
                  <span className="text-[10px] tracking-widest text-accent-cyan bg-accent-cyan/15 border border-accent-cyan/20 px-2 py-0.5 rounded-sm uppercase font-bold inline-block">
                    {item.category}
                  </span>
                  <Maximize2 className="w-4 h-4 text-white/55 hover:text-accent-cyan transition-colors" />
                </div>

                <div className="space-y-2 text-white">
                  <h4 className="font-sans font-bold text-sm leading-tight">{item.title}</h4>
                  <div className="flex flex-col space-y-0.5 font-mono text-[10px] text-white/70">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-accent-cyan" /> {item.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-accent-cyan" /> {item.venue}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECURE HIGH-RESOLUTION THEATER MODAL (Lightbox Layout) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEvent(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-bgDark/95 backdrop-blur-md"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-accent-rose text-white/60 hover:text-accent-rose transition-all z-50"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* 
               Autofocus Lens Animation: Starts blurred and slightly shrunken, 
               then transitions quickly into crystal clear sharpness.
            */}
            <motion.div
              initial={{ scale: 0.92, filter: "blur(8px)", opacity: 0 }}
              animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
              exit={{ scale: 0.92, filter: "blur(8px)", opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full border border-[#0d2d6c] bg-[#051638]/95 p-6 md:p-8 rounded-lg shadow-2xl flex flex-col items-center justify-center"
            >
              {/* Outer Blueprint grid overlay */}
              <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none rounded-lg" />

              <div className="w-full flex gap-4 md:gap-6 items-stretch relative z-10">
                {/* Left Margin Timeline Indicators */}
                <div className="hidden sm:flex flex-col justify-between items-center text-[10px] font-mono font-bold text-white/35 border-r border-[#0d2d6c]/60 pr-4 md:pr-6 shrink-0 select-none">
                  <span className={selectedEvent.year === '2026' ? 'text-accent-cyan font-extrabold' : ''}>2026</span>
                  <span className={selectedEvent.year === '2025' ? 'text-accent-cyan font-extrabold' : ''}>2025</span>
                  <span className="opacity-50">2024</span>
                  <span className="opacity-45">2023</span>
                </div>

                {/* Massive Image Screen */}
                <div className="relative flex-1 aspect-video rounded border border-[#0d2d6c] overflow-hidden bg-bgDark group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImg}
                      src={selectedEvent.images[activeImg]}
                      onError={(e) => {
                        e.target.src = selectedEvent.fallbacks[activeImg];
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Manual Arrow Controls (Fades in on hover) */}
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 z-30 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={prevImage}
                      className="p-2 rounded-full border border-white/20 bg-bgDark/80 hover:bg-[#00f2fe] hover:text-bgDark text-white pointer-events-auto transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="p-2 rounded-full border border-white/20 bg-bgDark/80 hover:bg-[#00f2fe] hover:text-bgDark text-white pointer-events-auto transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Slideshow dots (Fades in on hover) */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[0, 1, 2].map((dot) => (
                      <div
                        key={dot}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          activeImg === dot ? 'bg-[#00f2fe] w-3' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Blueprint Info Bar coordinates */}
              <div className="w-full mt-5 pt-4 border-t border-[#0d2d6c]/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 font-mono text-[10px] tracking-wider text-stone-100 relative z-10 select-none">
                <span className="font-bold">ARCHIVED FESTIVAL MOMENTS // BUP CSE</span>
                <span className="text-right uppercase font-bold text-accent-cyan">
                  XXVI • {selectedEvent.title} • {selectedEvent.date}
                </span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}