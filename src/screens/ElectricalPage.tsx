import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Activity, Cable } from 'lucide-react';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';
import { SwitchgearPowerIcon, CheckMarkIcon } from '../components/icons/IndustrialIcons';

type ElectricalPageProps = {
  companyData?: CompanyData;
};

export const ElectricalPage: React.FC<ElectricalPageProps> = ({ companyData }) => {
  const resolvedCompany = companyData ?? company;

  const measurementItems = [
    'Parametryzacja urządzeń, falowników i zabezpieczeń zgodnie z wymogami klienta',
    'Nadzory nad montażem rozdzielnic nn, SN, szynoprzewodów i transformatorów',
    'Testy i uruchomienia rozdzielnic nn oraz SN',
    'Pomiary kabli sterowniczych, komunikacyjnych oraz siłowych nn i SN',
    'Pomiary ochrony przeciwporażeniowej (pętle zwarciowe, wyłączniki RCD)',
    'Pomiary transformatorów, silników, zasilaczy UPS i baterii kondensatorów',
    'Konfiguracja protokołów: Profibus, Profinet, Modbus RTU/TCP, IEC 61850',
    'Testy sygnałowe AKPiA, analiza jakości energii i udział w podaniu napięcia',
  ];

  const installationBoxes = [
    'Trasy kablowe (stal nierdzewna, ocynk, tworzywa)',
    'Systemy kablowe WN, SN i nn',
    'Instalacje uziemienia, odgromowe i wyrównawcze',
    'Oświetlenie podstawowe, awaryjne i przemysłowe',
    'Instalacje słaboprądowe i sterownicze',
    'Aparatura kontrolno-pomiarowa (AKPiA)',
  ];

  const strengths = [
    'Uprawnienia energetyczne SEP D+E (G1, G2, G3)',
    'Wieloletnie doświadczenie na czynnych zakładach w Polsce i Wielkiej Brytanii',
    'Własna aparatura pomiarowa i specjalistyczny sprzęt do układania kabli',
    'Pełna dokumentacja powykonawcza i protokoły pomiarowe z każdego testu',
  ];

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <PageHeader
        badge="Energetyka przemysłowa i automatyka"
        title="Usługi elektryczne i rozruchowe"
        subtitle="Uruchomienia, pomiary odbiorcze i okresowe oraz wykonawstwo instalacji elektrycznych nn, SN i WN na obiektach przemysłowych."
      />

      <section className="page-section">
        <div className="page-container">
          {/* Section 1: Startup & Commissioning */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-industrial-900 border border-gray-800 rounded-xl flex items-center justify-center text-industrial-accent shrink-0">
                <SwitchgearPowerIcon size={26} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-industrial-accent">
                  Rozruch i diagnostyka
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  Uruchomienia i prace kontrolno-pomiarowe
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              <div className="lg:col-span-7 offer-card">
                <h3 className="card-title mb-4 flex items-center gap-2.5">
                  <Activity size={20} className="text-industrial-accent" />
                  <span>Zakres pomiarów i uruchomień</span>
                </h3>
                <ul className="space-y-3">
                  {measurementItems.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-gray-200 text-sm sm:text-base"
                    >
                      <CheckMarkIcon size={17} className="text-industrial-accent shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 offer-card flex flex-col justify-between">
                <div>
                  <h3 className="card-title mb-4">Podejście skoordynowane z technologią</h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-5">
                    Ustalamy optymalną sekwencję testów i kolejność podawania napięcia, integrując
                    rozdzielnice nN i SN, stacje transformatorowe, magazyny energii oraz systemy
                    automatyki. Naszym celem jest skrócenie czasu dochodzenia do stabilnej pracy
                    instalacji i eliminacja nieplanowanych przestojów.
                  </p>
                  <div className="p-4 rounded-xl bg-industrial-950 border border-gray-800 text-sm text-gray-300 leading-relaxed">
                    <strong className="text-white block mb-1">
                      Protokoły odbiorowe i szkolenia:
                    </strong>
                    Dostarczamy kompletne protokoły pomiarowe z każdego przeprowadzonego testu oraz
                    szkolimy personel utrzymania ruchu z eksploatacji uruchomionej instalacji.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Installation Works */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-industrial-900 border border-gray-800 rounded-xl flex items-center justify-center text-industrial-accent shrink-0">
                <Cable size={24} />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-industrial-accent">
                  Wykonawstwo i modernizacje
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  Prace elektroinstalacyjne na obiektach
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
              <div className="lg:col-span-7 offer-card">
                <p className="text-sm sm:text-base text-gray-300 mb-6 leading-relaxed">
                  Realizujemy montaże na nowych obiektach przemysłowych i energetycznych oraz
                  modernizacje istniejącej infrastruktury – również na zakładach czynnych, z
                  zachowaniem ciągłości zasilania (praca w oknach serwisowych i systemie zmianowym).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {installationBoxes.map((item, i) => (
                    <div
                      key={i}
                      className="bg-industrial-950 p-4 rounded-xl border border-gray-800 text-gray-200 text-sm font-medium flex items-center gap-2.5"
                    >
                      <CheckMarkIcon size={16} className="text-industrial-accent shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 offer-card">
                <h3 className="card-title mb-4">Standardy realizacji Multiserwis</h3>
                <ul className="space-y-3.5 text-sm sm:text-base text-gray-200">
                  {strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckMarkIcon size={17} className="text-industrial-accent shrink-0 mt-1" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <ServiceInquiryCta
            title="Potrzebujesz rozruchu, pomiarów elektrycznych albo modernizacji instalacji w zakładzie?"
            description="Opisz rodzaj obiektu, poziom napięcia (nn / SN / WN) i planowany zakres prac. Przygotujemy wycenę prac kontrolno-pomiarowych, wykonawczych lub rozruchowych."
            contactLabel="Poproś o wycenę prac elektrycznych"
            trainingTitle="Szkolenia i egzaminy SEP (G1, G2, G3)"
            trainingDescription="Jeżeli Twój zespół potrzebuje zdobyć lub odnowić świadectwa kwalifikacyjne SEP (elektryczne, energetyczne, gazowe), sprawdź ofertę naszego ośrodka."
          />
        </div>
      </section>
    </SiteSettingsProvider>
  );
};
