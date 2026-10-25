import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';
import {
  WeldingTorchIcon,
  SteelStructureIcon,
  CheckMarkIcon,
} from '../components/icons/IndustrialIcons';

type WeldingPageProps = {
  companyData?: CompanyData;
};

export const WeldingPage: React.FC<WeldingPageProps> = ({ companyData }) => {
  const resolvedCompany = companyData ?? company;

  const repairItems = [
    'Maszyny i urządzenia przemysłowe oraz budowlane',
    'Zbiorniki technologiczne i silosy',
    'Kontenery, muldy i konstrukcje transportowe',
    'Rurociągi technologiczne i przesyłowe',
    'Elementy metalowe, obudowy i części zamienne',
  ];

  const structureItems = [
    'Antresole magazynowe i podesty obsługowo-serwisowe',
    'Konstrukcje stalowe hal, wiat i zadaszeń przemysłowych',
    'Suwnice, belki podsuwnicowe oraz elementy infrastruktury towarzyszącej',
    'Wykonywanie uchwytów, ram oraz wsporników technologicznych',
    'Ramy i podstawy pod wentylatory przemysłowe oraz urządzenia HVAC',
    'Wsporniki i mocowania dla kanałów wentylacyjnych oraz rurociągów',
    'Konstrukcje stalowe specjalnego przeznaczenia i zabudowy akustyczne',
  ];

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <PageHeader
        badge="Spawalnictwo i prefabrykacja"
        title="Usługi spawalnicze i konstrukcje stalowe"
        subtitle="Od mobilnych napraw bieżących na terenie zakładu po kompleksowe wykonawstwo i montaż konstrukcji stalowych."
      />

      <section className="page-section">
        <div className="page-container">
          <div className="max-w-6xl mx-auto">
            {/* Services Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-14">
              <div className="offer-card">
                <div className="w-12 h-12 bg-industrial-950 border border-gray-800 rounded-xl flex items-center justify-center text-industrial-accent mb-5">
                  <WeldingTorchIcon size={26} />
                </div>
                <h2 className="card-title mb-3">Naprawy bieżące i serwis spawalniczy</h2>
                <p className="text-gray-300 text-sm sm:text-base mb-5 leading-relaxed">
                  Dysponujemy mobilnym zapleczem spawalniczym – wykonujemy naprawy w naszej bazie
                  oraz bezpośrednio na hali produkcyjnej klienta:
                </p>
                <ul className="space-y-3 text-gray-200 text-sm sm:text-base">
                  {repairItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckMarkIcon size={17} className="text-industrial-accent shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="offer-card">
                <div className="w-12 h-12 bg-industrial-950 border border-gray-800 rounded-xl flex items-center justify-center text-industrial-accent mb-5">
                  <SteelStructureIcon size={26} />
                </div>
                <h2 className="card-title mb-3">Kompleksowe wykonawstwo konstrukcji stalowych</h2>
                <p className="text-gray-300 text-sm sm:text-base mb-5 leading-relaxed">
                  Realizujemy pełen proces inwestycyjny – od pomiarów i projektu warsztatowego,
                  przez prefabrykację, po montaż dźwigowy na obiekcie:
                </p>
                <ul className="space-y-3 text-gray-200 text-sm sm:text-base">
                  {structureItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckMarkIcon size={17} className="text-industrial-accent shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technologies & Materials */}
            <div className="bg-industrial-900 rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-800 mb-14">
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-6">
                Technologie spawania i zakres materiałowy
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 text-gray-300">
                <div className="p-5 rounded-xl bg-industrial-950/70 border border-gray-800">
                  <h3 className="font-display text-lg font-bold text-industrial-accent uppercase tracking-wide mb-2">
                    Metody spawania
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Spawamy wszystkimi głównymi metodami przemysłowymi: <strong>TIG (141)</strong>,{' '}
                    <strong>MIG/MAG (131/135/136)</strong> oraz <strong>MMA (111)</strong>,
                    dobierając technologię do obciążeń i środowiska pracy.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-industrial-950/70 border border-gray-800">
                  <h3 className="font-display text-lg font-bold text-industrial-accent uppercase tracking-wide mb-2">
                    Gatunki materiałów
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Pracujemy na wszystkich gatunkach stali: stal czarna konstrukcyjna, stal
                    nierdzewna i kwasoodporna, stal kotłowa oraz stopy aluminium.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-industrial-950/70 border border-gray-800">
                  <h3 className="font-display text-lg font-bold text-industrial-accent uppercase tracking-wide mb-2">
                    Doradztwo technologiczne
                  </h3>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Wspieramy działy utrzymania ruchu w doborze technologii napraw oraz realizacji
                    niestandardowych konstrukcji wsporczych i adaptacyjnych.
                  </p>
                </div>
              </div>
            </div>

            <ServiceInquiryCta
              title="Masz projekt konstrukcji stalowej, naprawę awaryjną albo nietypowe zlecenie spawalnicze?"
              description="Prześlij rysunek techniczny, zdjęcia lub krótki opis zakresu prac, materiału i lokalizacji. Przygotujemy wycenę oraz harmonogram prefabrykacji i montażu."
              contactLabel="Wyślij zapytanie spawalnicze"
              trainingTitle="Szkolenia spawalnicze TIG, MIG/MAG, MMA"
              trainingDescription="Chcesz podnieść kwalifikacje swojego zespołu? Prowadzimy praktyczne kursy i certyfikację spawaczy w naszym ośrodku szkoleniowym."
            />
          </div>
        </div>
      </section>
    </SiteSettingsProvider>
  );
};
