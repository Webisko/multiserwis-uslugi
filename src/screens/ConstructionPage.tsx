import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';
import {
  IndustrialPipelineIcon,
  SteelStructureIcon,
  SynergyHubIcon,
  CheckMarkIcon,
} from '../components/icons/IndustrialIcons';

type ConstructionPageProps = {
  companyData?: CompanyData;
};

export const ConstructionPage: React.FC<ConstructionPageProps> = ({ companyData }) => {
  const resolvedCompany = companyData ?? company;
  const constructionAreas = [
    {
      title: 'Instalacje i rurociągi przemysłowe',
      description:
        'Modernizujemy, przebudowujemy i naprawiamy instalacje rurociągowe oraz układy przesyłowe w zakładach produkcyjnych.',
      icon: <IndustrialPipelineIcon size={24} />,
      items: [
        'Modernizacja i naprawa rurociągów spawanych, zgrzewanych i skręcanych – w całości lub na wskazanych odcinkach',
        'Montaż konstrukcji wsporczych, estakad i tras rurociągowych',
        'Wymiana armatury przemysłowej (zawory, zasuwy, przepustnice) oraz odcinków rurociągów',
        'Przebudowy instalacji rurociągowych pod nowe urządzenia i izolacje termiczne',
      ],
    },
    {
      title: 'Prace konstrukcyjne pod maszyny i urządzenia',
      description:
        'Projektujemy, prefabrykujemy i montujemy konstrukcje stalowe oraz elementy wsporcze pod nowe lub modernizowane linie.',
      icon: <SteelStructureIcon size={24} />,
      items: [
        'Wykonywanie konstrukcji stalowych pod maszyny i urządzenia technologiczne',
        'Konstrukcje wsporcze pod silniki, pompy, wentylatory przemysłowe i rurociągi',
        'Dostosowanie, wykonanie i montaż konstrukcji adaptacyjnych przy wymianie maszyn',
        'Prace konstrukcyjne i mechaniczne przy montażu oraz modernizacji urządzeń',
      ],
    },
    {
      title: 'Realizacja na czynnych obiektach przemysłowych',
      description:
        'Dobieramy materiały, technologię spawania i harmonogram robót do specyfiki zakładu, aby zachować ciągłość produkcji.',
      icon: <SynergyHubIcon size={24} />,
      items: [
        'Bezpieczne prowadzenie prac na czynnych instalacjach i halach produkcyjnych',
        'Pełna koordynacja z relokacją maszyn, pracami dźwigowymi i elektryką',
        'Dobór gatunków stali, armatury i uszczelnień do medium technologicznego',
        'Praca w oknach serwisowych, postoju technologicznym lub systemie zmianowym',
      ],
    },
  ];

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <PageHeader
        badge="Instalacje technologiczne i konstrukcje"
        title="Hydraulika i montaż przemysłowy"
        subtitle="Rurociągi przemysłowe, armatura technologiczna oraz konstrukcje wsporcze pod maszyny realizowane na czynnych obiektach."
      />

      <section className="page-section">
        <div className="page-container">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-industrial-900 border border-gray-800 text-industrial-accent">
              <IndustrialPipelineIcon size={28} />
            </div>
            <h2 className="section-title mb-4">
              Zakres prac <span className="text-industrial-accent">rurociągowych i montażowych</span>
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-gray-300">
              Obsługujemy przebudowy rurociągów technologicznych, wymianę armatury przemysłowej,
              konstrukcje wsporcze oraz prace montażowe przy integracji nowych urządzeń.
            </p>
          </div>

          <div className="mb-14 grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-3">
            {constructionAreas.map((area) => (
              <div key={area.title} className="offer-card flex flex-col justify-between">
                <div>
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-industrial-950 border border-gray-800 text-industrial-accent">
                    {area.icon}
                  </div>
                  <h3 className="card-title mb-3">{area.title}</h3>
                  <p className="mb-5 text-sm sm:text-base leading-relaxed text-gray-300">
                    {area.description}
                  </p>
                  <ul className="space-y-3 text-sm sm:text-base text-gray-200">
                    {area.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckMarkIcon
                          size={17}
                          className="text-industrial-accent shrink-0 mt-1"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <ServiceInquiryCta
            title="Potrzebujesz przebudowy rurociągów, wymiany armatury albo konstrukcji pod nowe urządzenie?"
            description="Opisz rodzaj instalacji, medium, warunki na obiekcie oraz planowany termin. Dobierzemy technologię wykonania i skoordynujemy montaż z pracami dźwigowymi lub relokacyjnymi."
            contactLabel="Skonsultuj hydraulikę i montaż"
          />
        </div>
      </section>
    </SiteSettingsProvider>
  );
};
