import React from 'react';
import { Clock3, ArrowRight, Phone } from 'lucide-react';
import { company, type CompanyData, useCompanyData } from '../data/company';
import { WhatsAppIcon } from './WhatsAppIcon';
import { SynergyHubIcon, CraneTruckIcon } from './icons/IndustrialIcons';

type HeroProps = {
  companyData?: CompanyData;
};

export const Hero: React.FC<HeroProps> = ({ companyData }) => {
  let resolvedCompany: CompanyData;
  try {
    const contextCompany = useCompanyData();
    resolvedCompany = companyData ?? contextCompany ?? company;
  } catch {
    resolvedCompany = companyData ?? company;
  }

  const basePath = resolvedCompany.links.basePath;

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-industrial-950 pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24">
      {/* 1. Background Layer with hardware-accelerated CSS breathing animation */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="h-full w-full relative bg-industrial-950 animate-hero-breathe">
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
            <source srcSet={`${basePath}/hero-bg.webp`} type="image/webp" />
            <img
              src={`${basePath}/hero-bg.webp`}
              alt="Dźwigi, podnośniki i zaplecze techniczne Multiserwis Kutno"
              width="1024"
              height="1024"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-50 filter brightness-[0.65] contrast-[1.08]"
            />
          </picture>

          {/* Subtle colored overlay elements for depth */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(3,7,18,0.82) 0%, rgba(17,24,39,0.52) 48%, rgba(3,7,18,0.88) 100%), radial-gradient(circle at 20% 22%, rgba(245,158,11,0.16), transparent 36%)',
            }}
          />
          <div className="absolute inset-x-[12%] bottom-[-14%] h-[36%] rounded-full bg-industrial-accent/12 blur-3xl" />
        </div>
      </div>

      {/* 2. Static Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-industrial-950 via-industrial-950/35 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-industrial-950/50 via-transparent to-transparent z-10 pointer-events-none" />

      {/* 3. Main Content */}
      <div className="page-container z-30 text-center relative animate-hero-fade-in">
        <div className="mb-5 flex justify-center sm:mb-6">
          <span className="section-badge bg-industrial-950/80 backdrop-blur-md">
            <CraneTruckIcon size={16} />
            <span>Kompleksowe wsparcie przemysłu</span>
          </span>
        </div>

        <h1 className="mb-6 font-display text-4xl font-bold uppercase leading-[1.04] tracking-tight text-white drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
          Siła{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-industrial-accent to-amber-200">
            precyzji
          </span>
          <br />w przemyśle
        </h1>

        <p className="mx-auto mb-8 max-w-3xl text-base font-normal leading-relaxed text-gray-200 drop-shadow sm:mb-10 sm:text-lg md:text-xl">
          Obsługujemy zakłady produkcyjne w obszarach wynajmu żurawi i podestów, relokacji linii
          technologicznych, dozoru UDT, spawalnictwa, hydrauliki przemysłowej oraz elektryki. Jeden
          wykonawca do odpowiedzialnych zadań na produkcji, budowie i w utrzymaniu ruchu.
        </p>

        <div className="flex flex-col justify-center gap-3.5 sm:flex-row sm:gap-5">
          <a
            href="#uslugi"
            className="group inline-flex items-center justify-center gap-2.5 rounded-lg bg-industrial-accent px-7 py-4 text-base font-bold text-industrial-950 shadow-[0_0_24px_rgba(245,158,11,0.3)] transition-all hover:-translate-y-0.5 hover:bg-industrial-accentHover hover:shadow-[0_0_36px_rgba(245,158,11,0.45)] sm:px-9 sm:py-4 sm:text-lg"
          >
            <span>Poznaj pełny zakres usług</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={`${basePath}/kontakt`}
            className="inline-flex items-center justify-center gap-2.5 rounded-lg border border-gray-500/80 bg-industrial-900/80 px-7 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-industrial-accent hover:text-industrial-accent sm:px-9 sm:py-4 sm:text-lg"
          >
            <Phone size={18} />
            <span>Poproś o wycenę</span>
          </a>
        </div>

        {/* 3 Value Pillars */}
        <div className="mt-10 grid grid-cols-1 gap-4 text-left sm:mt-12 sm:grid-cols-3 max-w-5xl mx-auto">
          <div className="rounded-xl border border-white/10 bg-industrial-900/75 p-5 backdrop-blur-md">
            <div className="mb-3 flex items-center gap-3">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-industrial-accent/15 text-industrial-accent">
                <Clock3 size={20} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-industrial-accent">
                Szybka reakcja
              </p>
            </div>
            <p className="text-sm leading-relaxed text-gray-200 sm:text-base">
              Wstępna wycena i kontakt techniczny w ciągu 24 godzin w dni robocze.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-industrial-900/75 p-5 backdrop-blur-md">
            <div className="mb-3 flex items-center gap-3">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300">
                <WhatsAppIcon className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
                Sprawne ustalenia
              </p>
            </div>
            <p className="text-sm leading-relaxed text-gray-200 sm:text-base">
              Zdjęcia i parametry zlecenia prześlesz bezpośrednio przez WhatsApp lub telefon.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-industrial-900/75 p-5 backdrop-blur-md">
            <div className="mb-3 flex items-center gap-3">
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-industrial-accent/15 text-industrial-accent">
                <SynergyHubIcon size={20} />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-industrial-accent">
                Jedna koordynacja
              </p>
            </div>
            <p className="text-sm leading-relaxed text-gray-200 sm:text-base">
              Sprzęt dźwigowy, relokację, UDT, spawanie i elektrykę realizujemy własnymi siłami.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
