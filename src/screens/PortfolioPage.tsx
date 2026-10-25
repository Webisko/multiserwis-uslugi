import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { MapPin } from 'lucide-react';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';
import {
  fetchLivePortfolioItems,
  getDefaultSiteContent,
  type PortfolioItemPayload,
} from '../lib/siteContent';
import { CheckMarkIcon } from '../components/icons/IndustrialIcons';

type PortfolioPageProps = {
  companyData?: CompanyData;
  portfolioItems?: PortfolioItemPayload[];
};

const defaultPortfolioItems = getDefaultSiteContent().portfolio.items;

const PortfolioContent: React.FC<{ initialItems: PortfolioItemPayload[] }> = ({ initialItems }) => {
  const [items, setItems] = useState<PortfolioItemPayload[]>(initialItems);

  useEffect(() => {
    void fetchLivePortfolioItems().then((fresh) => {
      if (fresh && fresh.items.length > 0) {
        setItems(fresh.items);
      }
    });
  }, []);

  return (
    <>
      <PageHeader
        badge="Doświadczenie w praktyce"
        title="Przykładowe realizacje"
        subtitle="Przekrój realizowanych przez nas prac dźwigowych, relokacyjnych, spawalniczych, instalacyjnych oraz serwisowych UDT."
      />

      <section className="page-section">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
            <h2 className="section-title mb-4">
              Kompetencje potwierdzone <span className="text-industrial-accent">na obiektach</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Realizujemy zadania dla zakładów produkcyjnych, centrów logistycznych oraz generalnych
              wykonawców w całej Polsce i w Europie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-14">
            {items.map((item) => (
              <article
                key={item.id}
                className="offer-card flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {item.imageUrl ? (
                    <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 h-52 overflow-hidden border-b border-gray-800">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  ) : null}

                  <div className="mb-3.5 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
                    <span className="rounded-lg bg-industrial-accent/15 border border-industrial-accent/30 px-3 py-1 text-industrial-accent">
                      {item.category}
                    </span>
                    {item.location ? (
                      <span className="inline-flex items-center gap-1 rounded-lg border border-gray-800 bg-industrial-950/80 px-3 py-1 text-gray-300">
                        <MapPin size={12} className="text-industrial-accent" />
                        <span>{item.location}</span>
                      </span>
                    ) : null}
                  </div>

                  <h3 className="card-title mb-3">{item.title}</h3>
                  {item.description ? (
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-5">
                      {item.description}
                    </p>
                  ) : null}

                  <ul className="space-y-2.5 text-sm sm:text-base text-gray-200">
                    {item.items.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <CheckMarkIcon
                          size={16}
                          className="text-industrial-accent shrink-0 mt-1"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <ServiceInquiryCta
            title="Planujesz podobne zadanie w swoim zakładzie?"
            description="Opisz swój projekt, wymagany sprzęt lub zakres prac instalacyjno-relokacyjnych. Przedstawimy referencyjne podejście i przygotujemy dopasowaną wycenę."
            contactLabel="Zapytaj o wycenę realizacji"
          />
        </div>
      </section>
    </>
  );
};

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  companyData,
  portfolioItems = defaultPortfolioItems,
}) => {
  const resolvedCompany = companyData ?? company;

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <PortfolioContent initialItems={portfolioItems} />
    </SiteSettingsProvider>
  );
};
