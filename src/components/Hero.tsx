import React, { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useCompanyData } from '../data/company';

export const Hero: React.FC = () => {
  const company = useCompanyData();
  const basePath = company.links.basePath;
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
      
      {/* 1. Background Layer - THIS IS THE ONLY THING THAT MOVES */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
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
          className="h-full w-full"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(10,17,29,0.95) 0%, rgba(18,30,45,0.82) 38%, rgba(83,59,17,0.58) 100%), radial-gradient(circle at 20% 20%, rgba(245,158,11,0.22), transparent 35%), radial-gradient(circle at 78% 30%, rgba(148,163,184,0.18), transparent 32%), repeating-linear-gradient(115deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 2px, transparent 2px, transparent 38px), repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 56px)',
            }}
          />
          <div className="absolute inset-x-[10%] bottom-[-12%] h-[38%] rounded-full bg-industrial-accent/20 blur-3xl" />
          <div className="absolute left-[12%] top-[18%] h-40 w-40 rounded-full border border-white/10 bg-white/5 blur-2xl" />
          <div className="absolute right-[14%] top-[22%] h-56 w-56 rounded-full border border-industrial-accent/10 bg-industrial-accent/10 blur-3xl" />
        </motion.div>
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
            Obsługujemy zakłady przemysłowe w obszarach wynajmu maszyn, relokacji linii,
            UDT, elektryki i prac technicznych. Jeden partner do realizacji wymagających zadań
            na produkcji, budowie i w utrzymaniu ruchu.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href={`${basePath}/uslugi-techniczne`}
              className="group relative px-10 py-5 bg-industrial-accent text-industrial-900 font-bold rounded text-xl overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:-translate-y-1"
            >
              <span className="relative z-10">Zobacz zakres usług</span>
              <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </a>
            <a
              href={`${basePath}/kontakt`}
              className="px-10 py-5 bg-industrial-900/80 backdrop-blur-sm border border-gray-400 text-white font-bold rounded text-xl hover:bg-white/10 hover:border-white transition-all hover:-translate-y-1"
            >
              Poproś o wycenę
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