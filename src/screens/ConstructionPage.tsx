import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { HardHat, Building2, Hammer, Ruler } from 'lucide-react';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';

type ConstructionPageProps = {
  companyData?: CompanyData;
};

export const ConstructionPage: React.FC<ConstructionPageProps> = ({ companyData }) => {
  const resolvedCompany = companyData ?? company;
  const constructionAreas = [
    {
      title: 'Prace remontowe w obiektach przemysłowych',
      description:
        'Realizujemy roboty wykończeniowe, odtworzeniowe i modernizacyjne w halach, zapleczach technicznych oraz obiektach pomocniczych.',
      icon: <Hammer size={22} />,
      items: ['remonty fragmentów hal i pomieszczeń technicznych', 'prace adaptacyjne pod nowe procesy', 'roboty odtworzeniowe po relokacjach i modernizacjach'],
    },
    {
      title: 'Fundamenty i przygotowanie pod maszyny',
      description:
        'Wspieramy przygotowanie przestrzeni pod montaż urządzeń, linii i wyposażenia technologicznego.',
      icon: <Ruler size={22} />,
      items: ['fundamenty i bazy pod urządzenia', 'przygotowanie stanowisk roboczych', 'koordynacja z pracami relokacyjnymi i elektrycznymi'],
    },
    {
      title: 'Prace towarzyszące dla inwestycji przemysłowych',
      description:
        'Obsługujemy roboty pomocnicze i wykonawcze tam, gdzie liczy się sprawna współpraca kilku branż jednocześnie.',
      icon: <Building2 size={22} />,
      items: ['roboty budowlane przy modernizacjach obiektów', 'przygotowanie przestrzeni dla nowych instalacji', 'prace uzgadniane indywidualnie pod zakres inwestycji'],
    },
  ];

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <PageHeader 
        title="Usługi Remontowo-Budowlane" 
        subtitle="Realizujemy prace budowlane w obiektach przemysłowych, magazynowych i użyteczności publicznej."
      />

      <section className="py-20 bg-industrial-950">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-industrial-900 text-industrial-accent">
              <HardHat size={32} />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white">Zakres prac budowlanych dla przemysłu</h2>
            <p className="text-lg leading-relaxed text-gray-300">
              Obsługujemy prace budowlane jako uzupełnienie modernizacji, relokacji i przygotowania przestrzeni pod nowe urządzenia. Zakres każdorazowo dopasowujemy do obiektu, harmonogramu i wymagań inwestora.
            </p>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {constructionAreas.map((area) => (
              <div key={area.title} className="rounded-2xl border border-gray-800 bg-industrial-900/70 p-8">
                <div className="mb-5 inline-flex rounded-xl bg-industrial-800 p-3 text-industrial-accent">
                  {area.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{area.title}</h3>
                <p className="mb-5 text-sm leading-relaxed text-gray-400">{area.description}</p>
                <ul className="space-y-3 text-sm text-gray-300">
                  {area.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-industrial-accent"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <ServiceInquiryCta
            title="Masz zakres budowlany do skoordynowania z pracami technicznymi lub relokacją?"
            description="Opisz obiekt, rodzaj prac i termin realizacji. Ustalimy, czy potrzebujesz osobnej ekipy budowlanej, czy pakietu łączącego budownictwo z elektryką, relokacją albo przygotowaniem pod urządzenia."
            contactLabel="Skonsultuj zakres budowlany"
          />
        </div>
      </section>
    </SiteSettingsProvider>
  );
};
