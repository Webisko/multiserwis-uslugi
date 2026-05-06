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
      title: 'Instalacje i rurociągi przemysłowe',
      description:
        'Modernizujemy i naprawiamy instalacje rurociągowe oraz układy przesyłowe w zakładach przemysłowych.',
      icon: <Hammer size={22} />,
      items: ['modernizacja i naprawa rurociągów spawanych, zgrzewanych i skręcanych', 'montaż konstrukcji wsporczych i tras rurociągowych', 'wymiana armatury, przebudowy rurociągów i izolacje termiczne'],
    },
    {
      title: 'Prace konstrukcyjne pod maszyny i urządzenia',
      description:
        'Wykonujemy konstrukcje stalowe i elementy wsporcze pod nowe lub modernizowane urządzenia.',
      icon: <Ruler size={22} />,
      items: ['konstrukcje pod maszyny, pompy, wentylatory i rurociągi', 'dostosowanie i montaż konstrukcji do wymiany maszyn', 'prace konstrukcyjne i mechaniczne przy montażu oraz modernizacji urządzeń'],
    },
    {
      title: 'Realizacja na czynnych obiektach przemysłowych',
      description:
        'Dobieramy technologię i harmonogram do warunków zakładu, aby ograniczyć wpływ prac na produkcję.',
      icon: <Building2 size={22} />,
      items: ['prace na czynnych instalacjach i obiektach', 'koordynacja z relokacją, wymianą urządzeń i elektryką', 'zakres dopasowywany indywidualnie do obiektu i harmonogramu inwestycji'],
    },
  ];

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <PageHeader 
        title="Usługi Hydrauliczne i Montażowo-Konstrukcyjne" 
        subtitle="Rurociągi przemysłowe, armatura i konstrukcje wsporcze realizowane z myślą o pracy zakładów przemysłowych."
      />

      <section className="py-20 bg-industrial-950">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-industrial-900 text-industrial-accent">
              <HardHat size={32} />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white">Zakres prac hydraulicznych i montażowo-konstrukcyjnych</h2>
            <p className="text-lg leading-relaxed text-gray-300">
              Obsługujemy modernizacje rurociągów, wymianę armatury, konstrukcje wsporcze oraz prace montażowe przy urządzeniach. Zakres każdorazowo dopasowujemy do obiektu, harmonogramu i wymagań inwestora.
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
            title="Potrzebujesz przebudowy rurociągów, armatury albo konstrukcji pod nowe urządzenie?"
            description="Opisz obiekt, rodzaj prac i termin realizacji. Ustalimy zakres hydrauliki przemysłowej i prac montażowo-konstrukcyjnych, także wtedy, gdy trzeba go skoordynować z relokacją lub elektryką."
            contactLabel="Skonsultuj hydraulikę i montaż"
          />
        </div>
      </section>
    </SiteSettingsProvider>
  );
};
