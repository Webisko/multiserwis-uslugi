import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { FileText, Settings, Wrench } from 'lucide-react';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';
import {
  UdtHookShieldIcon,
  CheckMarkIcon,
  IndustrialPipelineIcon,
  SwitchgearPowerIcon,
} from '../components/icons/IndustrialIcons';

type UdtPageProps = {
  companyData?: CompanyData;
};

export const UdtPage: React.FC<UdtPageProps> = ({ companyData }) => {
  const resolvedCompany = companyData ?? company;

  const devices = [
    'Wózki jezdniowe podnośnikowe (widłowe)',
    'Podesty ruchome / zwyżki',
    'Żurawie samojezdne',
    'Żurawie przenośne HDS i leśne',
    'Ładowarki teleskopowe',
    'Windy załadowcze (windy samochodowe)',
    'Dźwigniki i podnośniki warsztatowe',
    'Naczepy do transportu pojazdów',
    'Hakowce i bramowce',
    'Suwnice',
    'Wciągarki i wciągniki',
  ];

  const diagnosticScopes = [
    {
      title: 'Mechanika i hydraulika siłowa',
      icon: <IndustrialPipelineIcon size={22} />,
      items: [
        'Diagnostyka układów hydrauliki siłowej, usuwanie wycieków i spadków ciśnienia',
        'Naprawa, regeneracja i wymiana siłowników hydraulicznych',
        'Wymiana przewodów hydraulicznych, rozdzielaczy i uszczelnień',
        'Wymiana zużytych i uszkodzonych podzespołów mechanicznych',
        'Dobór, dostawa i montaż części zamiennych',
      ],
    },
    {
      title: 'Elektryka, sterowanie i renowacje',
      icon: <SwitchgearPowerIcon size={22} />,
      items: [
        'Diagnostyka usterek elektrycznych i elektronicznych w urządzeniach UTB',
        'Wymiana czujników krańcowych, przekaźników, joysticków i elementów sterowania',
        'Przywracanie pełnej sprawności układów bezpieczeństwa i sterowania',
        'Renowacje maszyn: przygotowanie pod malowanie (szlifowanie, czyszczenie)',
        'Malowanie konstrukcji, zabezpieczenia antykorozyjne i odnowa powłok ochronnych',
      ],
    },
  ];

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <PageHeader
        badge="Dozór techniczny i utrzymanie ruchu"
        title="Konserwacja, serwis i obsługa UDT"
        subtitle="Przejmujemy pełną obsługę urządzeń podlegających pod UDT: rejestrację, odtwarzanie dokumentacji, przeglądy konserwatorskie oraz kompleksowy serwis."
      />

      <section className="page-section">
        <div className="page-container">
          <div className="text-center mb-12 md:mb-14">
            <h2 className="section-title mb-4">
              Kompleksowa obsługa <span className="text-industrial-accent">formalna i techniczna</span>
            </h2>
            <p className="section-lead mx-auto">
              Zapewniamy ciągłość eksploatacji urządzeń transportu bliskiego – od wyprowadzenia
              zaległości dokumentacyjnych po bieżącą konserwację i udział w badaniach z inspektorem.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {/* Service Column 1 */}
            <div className="offer-card">
              <div className="w-12 h-12 bg-industrial-950 border border-gray-800 rounded-xl flex items-center justify-center text-industrial-accent mb-5">
                <FileText size={24} />
              </div>
              <h3 className="card-title mb-3">Rejestracja i formalności UDT</h3>
              <p className="text-gray-300 text-sm sm:text-base mb-5">
                Przejmujemy pełną organizację badań i dokumentacji:
              </p>
              <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
                {[
                  'Obsługa urządzeń zarejestrowanych oraz rejestracja nowych',
                  'Pełna obsługa formalna w przypadku braku dokumentacji',
                  'Wykonywanie resursu i odtwarzanie DTR urządzeń',
                  'Przygotowanie techniczne maszyn i asysta podczas badań UDT',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckMarkIcon size={16} className="text-industrial-accent shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Column 2 */}
            <div className="offer-card relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-24 h-24 bg-industrial-accent/10 rounded-full blur-2xl pointer-events-none"
                aria-hidden="true"
              />
              <div className="w-12 h-12 bg-industrial-950 border border-gray-800 rounded-xl flex items-center justify-center text-industrial-accent mb-5">
                <Settings size={24} />
              </div>
              <h3 className="card-title mb-3">Przeglądy konserwacyjne</h3>
              <p className="text-gray-300 text-sm sm:text-base mb-5">
                Regularny nadzór uprawnionego konserwatora UTB:
              </p>
              <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
                {[
                  'Wykonywanie i dokumentowanie przeglądów konserwacyjnych',
                  'Prowadzenie dzienników konserwacji zgodnie z wymogami UDT',
                  'Bieżąca kontrola układów bezpieczeństwa, cięgien i zawiesi',
                  'Szybkie usuwanie usterek wykrytych podczas przeglądów',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckMarkIcon size={16} className="text-industrial-accent shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Column 3 */}
            <div className="offer-card">
              <div className="w-12 h-12 bg-industrial-950 border border-gray-800 rounded-xl flex items-center justify-center text-industrial-accent mb-5">
                <UdtHookShieldIcon size={24} />
              </div>
              <h3 className="card-title mb-3">Doradztwo techniczne i audyt</h3>
              <p className="text-gray-300 text-sm sm:text-base mb-5">
                Wsparcie eksperckie w zakresie przepisów dozoru:
              </p>
              <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
                {[
                  'Analiza obowiązku rejestracji urządzenia w UDT',
                  'Weryfikacja stanu technicznego przed zakupem maszyny',
                  'Dobór wymaganych uprawnień dla operatorów i konserwatorów',
                  'Stałe umowy serwisowo-konserwacyjne dla zakładów',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckMarkIcon size={16} className="text-industrial-accent shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Comprehensive Service & Diagnostics Section (Section 5.3 from brief) */}
          <div className="mb-16 rounded-2xl border border-gray-800 bg-industrial-900 p-6 sm:p-10">
            <div className="max-w-3xl mb-8">
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-industrial-accent">
                <Wrench size={16} />
                <span>Serwis maszyn i urządzeń technicznych</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-3">
                Kompleksowy serwis, diagnostyka i renowacja urządzeń
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Realizujemy naprawy bieżące i główne wózków widłowych, podestów ruchomych (zwyżek),
                ładowarek teleskopowych, wind samochodowych oraz żurawi HDS.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {diagnosticScopes.map((scope) => (
                <div
                  key={scope.title}
                  className="rounded-xl border border-gray-800 bg-industrial-950/80 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="h-10 w-10 rounded-lg bg-industrial-900 border border-gray-800 flex items-center justify-center text-industrial-accent shrink-0">
                      {scope.icon}
                    </span>
                    <h3 className="card-title">{scope.title}</h3>
                  </div>
                  <ul className="space-y-3 text-sm sm:text-base text-gray-300">
                    {scope.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckMarkIcon size={16} className="text-industrial-accent shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Supported Devices */}
          <div className="mb-16 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-6">
              Obsługiwane grupy urządzeń
            </h2>
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {devices.map((device, idx) => (
                <span
                  key={idx}
                  className="bg-industrial-900 text-gray-200 px-4 py-2.5 rounded-xl border border-gray-800 hover:border-industrial-accent/60 transition-colors text-sm sm:text-base font-medium"
                >
                  {device}
                </span>
              ))}
            </div>
          </div>

          <ServiceInquiryCta
            title="Potrzebujesz przygotowania urządzenia do odbioru UDT, naprawy albo stałej konserwacji?"
            description="Opisz typ urządzenia, problem techniczny lub zakres formalności. Przejmiemy rejestrację, odtworzenie dokumentacji, naprawę i organizację badania UDT."
            contactLabel="Zamów obsługę UDT lub serwis"
            trainingTitle="Szkolenia UDT i IMBiGS dla zespołów"
            trainingDescription="Prowadzimy kursy dla operatorów i konserwatorów wszystkich kategorii urządzeń UDT, odnowienia uprawnień oraz szkolenia na maszyny budowlane."
          />
        </div>
      </section>
    </SiteSettingsProvider>
  );
};
