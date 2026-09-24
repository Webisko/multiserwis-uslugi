import React from 'react';
import { ChevronDown, Clock3, Layers3 } from 'lucide-react';
import { company, type CompanyData, useCompanyData } from '../data/company';
import { WhatsAppIcon } from './WhatsAppIcon';

type HeroProps = {
  companyData?: CompanyData;
};

export const Hero: React.FC<HeroProps> = ({ companyData }) => {
  // Support both direct props (Astro server rendering) and context (React tree)
  let resolvedCompany: CompanyData;
  try {
    const contextCompany = useCompanyData();
    resolvedCompany = companyData ?? contextCompany ?? company;
  } catch {
    resolvedCompany = companyData ?? company;
  }

  const basePath = resolvedCompany.links.basePath;

  return (
    <section 
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-industrial-900 px-4 pt-36 pb-20 sm:pt-40 sm:pb-24 md:pt-44 md:pb-28 lg:pt-48 lg:pb-32"
    >
      {/* 1. Background Layer with hardware-accelerated CSS breathing animation */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="h-full w-full relative bg-industrial-900 animate-hero-breathe">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet={`${basePath}/hero-bg-mobile.avif`}
              type="image/avif"
            />
            <source
              media="(max-width: 640px)"
              srcSet={`${basePath}/hero-bg-mobile.webp`}
              type="image/webp"
            />
            <source
              srcSet={`${basePath}/hero-bg.webp`}
              type="image/webp"
            />
            <img
              src={`${basePath}/hero-bg.webp`}
              alt="Dźwigi, podnośniki i park maszynowy Multiserwis w tle"
              width="1024"
              height="1024"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-55 filter brightness-[0.7] contrast-[1.05]"
            />
          </picture>

          {/* Subtle colored overlay elements for depth */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(10,17,29,0.7) 0%, rgba(18,30,45,0.4) 45%, rgba(10,17,29,0.8) 100%), radial-gradient(circle at 20% 20%, rgba(245,158,11,0.18), transparent 35%)',
            }}
          />
          <div className="absolute inset-x-[10%] bottom-[-12%] h-[38%] rounded-full bg-industrial-accent/15 blur-3xl" />
          <div className="absolute right-[14%] top-[22%] h-56 w-56 rounded-full border border-industrial-accent/10 bg-industrial-accent/5 blur-3xl" />
        </div>
      </div>

      {/* 2. Static Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-industrial-900 via-industrial-900/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-industrial-900/30 via-transparent to-transparent z-10 pointer-events-none" />

      {/* 3. Main Content with CSS entry animation */}
      <div className="container mx-auto px-4 z-30 text-center relative perspective-1000 animate-hero-fade-in">
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
      </div>

      <div
        className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 transform text-industrial-accent/80 md:block animate-bounce"
        aria-hidden="true"
      >
        <ChevronDown size={40} />
      </div>
    </section>
  );
};