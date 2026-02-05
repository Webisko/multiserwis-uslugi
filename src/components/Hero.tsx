import React, { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  // Scroll effect: Background moves down slower than foreground
  const yScroll = useTransform(scrollY, [0, 500], [0, 150]);
  
  // Mouse Parallax Logic
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 1 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  // Combine scroll Y and mouse Y for the image transform
  // We use useMotionTemplate to combine styles cleanly if needed, 
  // but here we can pass x/y directly to the motion.img style prop.
  // Note: We need to combine ySpring (mouse) and yScroll (scroll).
  const yCombined = useTransform([ySpring, yScroll], ([mY, sY]: any[]) => mY + sY);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - width / 2;
    const y = e.clientY - height / 2;
    
    // Calculate movement values
    mouseX.set(x * 0.02); 
    mouseY.set(y * 0.02);
  };

  return (
    <section 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-industrial-900"
    >
      
      {/* 1. Background Image Layer - THIS IS THE ONLY THING THAT MOVES */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          style={{ x: xSpring, y: yCombined }}
          initial={{ scale: 1.1 }} // Start slightly larger to avoid gaps when moving
          animate={{ scale: 1.15 }} // Breathing animation
          transition={{ 
            scale: {
              duration: 12, 
              ease: "easeInOut", 
              repeat: Infinity, 
              repeatType: "mirror" 
            }
          }}
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
          alt="Maszyny budowlane w tle"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Static Overlays - THESE DO NOT MOVE */}
      {/* Lighter overlay (30%) so image is visible */}
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />
      {/* Gradient from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-industrial-900/40 to-transparent z-10 pointer-events-none" />
      {/* Additional top gradient for brightness */}
      <div className="absolute inset-0 bg-gradient-to-b from-industrial-900/30 via-transparent to-transparent z-10 pointer-events-none" />

      {/* 3. Main Content - STATIC (No x/y transforms) */}
      <div className="container mx-auto px-4 z-30 text-center relative perspective-1000">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex justify-center mb-8">
             <div className="px-6 py-2 border border-industrial-accent/30 bg-industrial-900/80 backdrop-blur-md rounded shadow-lg">
                <span className="text-industrial-accent text-base font-display tracking-[0.2em] uppercase font-bold">
                  Kompleksowe Wsparcie Przemysłu
                </span>
             </div>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8 tracking-tight leading-none drop-shadow-2xl">
            SIŁA <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-accent to-yellow-200">
              PRECYZJI
            </span><br />
            W PRZEMYŚLE
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-100 text-xl md:text-2xl mb-12 font-light leading-relaxed drop-shadow-lg bg-black/40 p-6 rounded-xl backdrop-blur-sm border border-white/10">
            Specjalizujemy się w wynajmie maszyn, relokacji linii produkcyjnych oraz serwisie technicznym.
            Twój zaufany partner w najcięższych zadaniach.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="/multiserwis-uslugi/wynajem"
              className="group relative px-10 py-5 bg-industrial-accent text-industrial-900 font-bold rounded text-xl overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:-translate-y-1"
            >
              <span className="relative z-10">Poznaj Ofertę Maszyn</span>
              <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </a>
            <a
              href="/multiserwis-uslugi/kontakt"
              className="px-10 py-5 bg-industrial-900/80 backdrop-blur-sm border border-gray-400 text-white font-bold rounded text-xl hover:bg-white/10 hover:border-white transition-all hover:-translate-y-1"
            >
              Skontaktuj się
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-industrial-accent/80 z-30"
      >
        <ChevronDown size={40} />
      </motion.div>
    </section>
  );
};