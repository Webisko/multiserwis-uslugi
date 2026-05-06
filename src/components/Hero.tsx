import React, { useRef } from 'react';
import { ChevronDown, Clock3, Layers3 } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useCompanyData } from '../data/company';
import { WhatsAppIcon } from './WhatsAppIcon';

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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-industrial-900 px-0 pb-12 pt-24 sm:pb-16 sm:pt-28 md:h-screen md:pt-0"
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
          <div className="mb-6 flex justify-center sm:mb-8">
             <div className="rounded border border-industrial-accent/30 bg-industrial-900/80 px-4 py-2 shadow-lg backdrop-blur-md sm:px-6">
                <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-industrial-accent sm:text-base sm:tracking-[0.2em]">
                  Kompleksowe Wsparcie Przemysłu
                </span>
             </div>
          </div>

          <h1 className="mb-6 font-display text-4xl font-bold leading-none tracking-tight text-white drop-shadow-2xl sm:text-5xl md:mb-8 md:text-7xl lg:text-8xl">
            SIŁA <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-accent to-yellow-200">
              PRECYZJI
            </span><br />
            W PRZEMYŚLE
          </h1>
          
          <p className="mx-auto mb-8 max-w-3xl rounded-xl border border-white/10 bg-black/40 p-4 text-base font-light leading-relaxed text-gray-100 drop-shadow-lg backdrop-blur-sm sm:mb-10 sm:text-lg md:mb-12 md:p-6 md:text-2xl">
            Obsługujemy zakłady przemysłowe w obszarach wynajmu maszyn, relokacji linii,
            UDT, elektryki, spawalnictwa i hydrauliki przemysłowej. Jeden partner do realizacji
            wymagających zadań na produkcji, budowie i w utrzymaniu ruchu.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-6">
            <a
              href={`${basePath}/uslugi-techniczne`}
              className="group relative overflow-hidden rounded px-6 py-4 text-base font-bold text-industrial-900 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] bg-industrial-accent sm:px-10 sm:py-5 sm:text-xl"
            >
              <span className="relative z-10 sm:hidden">Zakres usług</span>
              <span className="relative z-10 hidden sm:inline">Zobacz zakres usług</span>
              <div className="absolute inset-0 h-full w-full bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </a>
            <a
              href={`${basePath}/kontakt`}
              className="rounded border border-gray-400 bg-industrial-900/80 px-6 py-4 text-base font-bold text-white transition-all hover:-translate-y-1 hover:border-white hover:bg-white/10 backdrop-blur-sm sm:px-10 sm:py-5 sm:text-xl"
            >
              <span className="sm:hidden">Szybka wycena</span>
              <span className="hidden sm:inline">Poproś o wycenę</span>
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 text-left sm:mt-8 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-industrial-900/70 px-4 py-4 backdrop-blur-sm sm:px-5">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-industrial-accent/15 text-industrial-accent">
                <Clock3 size={18} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">Szybka reakcja</p>
              <p className="mt-1 text-sm leading-relaxed text-white sm:text-base">Wycena i pierwszy kontakt w ciągu 24h w dni robocze.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-industrial-900/70 px-4 py-4 backdrop-blur-sm sm:px-5">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                <WhatsAppIcon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">Szybkie ustalenia</p>
              <p className="mt-1 text-sm leading-relaxed text-white sm:text-base">Usługi obsługujemy także przez WhatsApp, gdy liczy się czas i szybka decyzja.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-industrial-900/70 px-4 py-4 backdrop-blur-sm sm:px-5">
              <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white">
                <Layers3 size={18} />
              </div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">Jedna koordynacja</p>
              <p className="mt-1 text-sm leading-relaxed text-white sm:text-base">Wynajem, relokacja, UDT i prace techniczne koordynujemy w jednym zespole.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 transform text-industrial-accent/80 md:block"
      >
        <ChevronDown size={40} />
      </motion.div>
    </section>
  );
};