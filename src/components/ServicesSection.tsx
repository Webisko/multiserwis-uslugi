import React, { useState, useEffect } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { useCompanyData } from '../data/company';
import { fetchLiveServices, type ServiceOfferingPayload } from '../lib/siteContent';
import {
  ServiceIconBySlug,
  CheckMarkIcon,
  TechnicalCertIcon,
  SteelStructureIcon,
} from './icons/IndustrialIcons';

const fallbackServices: ServiceOfferingPayload[] = [];

type ServicesSectionProps = {
  services?: ServiceOfferingPayload[];
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services = fallbackServices,
}) => {
  const company = useCompanyData();
  const [liveServices, setLiveServices] = useState<ServiceOfferingPayload[]>(services);

  useEffect(() => {
    void fetchLiveServices().then((fresh) => {
      if (fresh && fresh.items.length > 0) {
        setLiveServices(fresh.items);
      }
    });
  }, []);

  // Display all 6 core industrial services in a balanced 3x2 grid
  const displayedServices = liveServices.length > 0 ? liveServices : services;

  return (
    <section id="uslugi" className="page-section-alt relative border-b border-gray-800/80">
      <div className="page-container">
        <div className="text-center mb-12 md:mb-16">
          <div className="mb-4 flex justify-center">
            <span className="section-badge">
              <SteelStructureIcon size={15} />
              <span>6 filarów kompetencji</span>
            </span>
          </div>
          <h2 className="section-title mb-4">
            Nasze <span className="text-industrial-accent">usługi przemysłowe</span>
          </h2>
          <p className="section-lead mx-auto">
            Dostarczamy kompleksowe wsparcie techniczne dla zakładów produkcyjnych, logistyki i
            utrzymania ruchu. Wybierz interesujący Cię obszar, aby poznać szczegóły techniczne.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedServices.map((service) => (
            <article
              key={service.id}
              id={service.slug}
              className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-industrial-950/90 border border-gray-800 hover:border-industrial-accent/60 transition-all duration-300 hover:shadow-[0_12px_36px_-12px_rgba(245,158,11,0.16)] hover:-translate-y-1 overflow-hidden h-full"
            >
              {/* Hover Background Gradient */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-industrial-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              <div className="relative z-10">
                {/* Icon Container */}
                <div className="w-14 h-14 bg-industrial-900 rounded-xl flex items-center justify-center text-industrial-accent mb-5 border border-gray-800 group-hover:border-industrial-accent/40 group-hover:bg-industrial-accent group-hover:text-industrial-950 transition-colors duration-300">
                  <ServiceIconBySlug slug={service.slug} size={28} />
                </div>

                <h3 className="card-title mb-3 group-hover:text-industrial-accent transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-300 text-sm sm:text-base mb-5 pb-5 border-b border-gray-800 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2.5 mb-7">
                  {service.items.slice(0, 5).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-300">
                      <CheckMarkIcon
                        size={16}
                        className="text-industrial-accent shrink-0 mt-1"
                      />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-auto pt-4 border-t border-gray-800/60 flex items-center justify-between">
                <a
                  href={service.pagePath ? `${company.links.basePath}${service.pagePath}` : '#kontakt'}
                  aria-label={`Poznaj szczegóły usługi: ${service.title}`}
                  className="inline-flex items-center justify-between w-full group/btn"
                >
                  <span className="text-sm sm:text-base font-bold text-white group-hover:text-industrial-accent transition-colors">
                    Szczegóły oferty
                    <span className="sr-only"> – {service.title}</span>
                  </span>
                  <span
                    className="h-10 w-10 rounded-full bg-industrial-900 border border-gray-800 flex items-center justify-center text-industrial-accent group-hover:bg-industrial-accent group-hover:text-industrial-950 group-hover:border-industrial-accent transition-colors duration-300"
                    aria-hidden="true"
                  >
                    <ArrowRight
                      size={18}
                      className="transform group-hover/btn:translate-x-0.5 transition-transform"
                    />
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Unified Training Banner below the 3x2 grid */}
        <div className="mt-10 rounded-2xl border border-gray-800 bg-industrial-950/80 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-xl bg-industrial-accent/15 border border-industrial-accent/30 flex items-center justify-center text-industrial-accent">
              <TechnicalCertIcon size={28} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-industrial-accent mb-1">
                Akredytowany ośrodek szkoleniowy
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Szkolenia UDT, IMBiGS, SEP (G1, G2, G3) oraz kursy spawalnicze
              </h3>
              <p className="text-sm sm:text-base text-gray-300 mt-1">
                Szkolimy i certyfikujemy operatorów wózków, żurawi, podestów ruchomych, suwnic,
                konserwatorów UTB, elektryków oraz spawaczy (TIG, MIG/MAG, MMA).
              </p>
            </div>
          </div>

          <a
            href={company.links.trainingSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-industrial-900 hover:bg-industrial-accent border border-gray-700 hover:border-industrial-accent px-6 py-3.5 text-sm sm:text-base font-bold text-white hover:text-industrial-950 transition-colors shrink-0 w-full sm:w-auto"
          >
            <span>Przejdź do oferty szkoleń</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
