import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Award } from 'lucide-react';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';
import {
  QualityProcessIcon,
  CheckMarkIcon,
  SynergyHubIcon,
} from '../components/icons/IndustrialIcons';

type AboutPageProps = {
  companyData?: CompanyData;
};

export const AboutPage: React.FC<AboutPageProps> = ({ companyData }) => {
  const resolvedCompany = companyData ?? company;

  const accreditationScope = [
    'Szkolenia dla operatorów i konserwatorów urządzeń transportu bliskiego (UTB)',
    'Szkolenia dla operatorów maszyn budowlanych i roboczych (IMBiGS)',
    'Szkolenia spawalnicze (MIG/MAG, TIG, MMA)',
    'Szkolenia energetyczne: G1 elektryczne, G2 energetyczne, G3 gazowe',
    'Doradztwo w zakresie eksploatacji, obsługi i konserwacji maszyn technicznych',
    'Usługi naprawy i konserwacji urządzeń technicznych (UDT)',
    'Kompleksowe usługi konstrukcyjne dla przemysłu (projektowanie, wykonawstwo, montaż)',
    'Pomiary, projektowanie, budowa, przebudowa i obsługa instalacji elektrycznych',
    'Usługi spawalnicze, ślusarskie i obróbka metali',
    'Relokacja maszyn, urządzeń i linii produkcyjnych',
    'Usługi budowlane i rurociągowe dla przemysłu',
    'Usługi dźwigowe i podnośnikowe',
    'Wynajem sprzętu dźwigowego, podestów ruchomych i maszyn budowlanych',
  ];

  const values = [
    {
      title: 'Bezpieczeństwo na czynnych obiektach',
      desc: 'Przestrzegamy rygorystycznych procedur BHP, LOTO i dozoru technicznego podczas prac na ruchu.',
    },
    {
      title: 'Jedna odpowiedzialność wykonawcza',
      desc: 'Łączymy własny sprzęt dźwigowy z zespołami elektryków, mechaników, spawaczy i konserwatorów UDT.',
    },
    {
      title: 'Terminowość i praca w oknach serwisowych',
      desc: 'Dostosowujemy harmonogram do postojów technologicznych i zmian produkcyjnych zakładu.',
    },
    {
      title: 'Powtarzalna jakość zgodna z ISO 9001:2015',
      desc: 'Nasze procesy są regularnie audytowane w ramach akredytacji Polskiego Centrum Akredytacji.',
    },
  ];

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <PageHeader
        badge="Poznaj Multiserwis Kutno"
        title="O firmie i certyfikaty jakości"
        subtitle="Doświadczenie techniczne, własny park maszynowy i certyfikowany system zarządzania jakością ISO 9001:2015."
      />

      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
            <div className="lg:col-span-6">
              <div className="mb-4">
                <span className="section-badge">
                  <SynergyHubIcon size={15} />
                  <span>Wieloletnie doświadczenie w przemyśle</span>
                </span>
              </div>
              <h2 className="section-title mb-5">
                Sprawdzony partner <span className="text-industrial-accent">dla przemysłu</span>
              </h2>
              <p className="text-gray-200 text-base sm:text-lg leading-relaxed mb-5">
                <strong className="text-white">MULTISERWIS Kutno</strong> to wyspecjalizowany
                partner techniczny dla zakładów produkcyjnych, centrów logistycznych oraz sektora
                energetycznego i budowlanego w całej Polsce oraz w Europie.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-5">
                Naszą misją jest dostarczanie kompleksowych rozwiązań technicznych z jednego
                źródła – od wynajmu żurawi samochodowych i podestów ruchomych, przez relokacje
                maszyn, spawalnictwo, rurociągi przemysłowe i instalacje elektryczne, aż po obsługę
                UDT oraz szkolenia kadr.
              </p>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Dzięki połączeniu własnego zaplecza sprzętowego i wielobranżowych zespołów
                inżynieryjno-wykonawczych nasi klienci eliminują przestoje i oszczędzają czas na
                koordynacji wielu podwykonawców.
              </p>
            </div>

            <div className="lg:col-span-6 offer-card">
              <h3 className="card-title mb-5">Nasze standardy pracy</h3>
              <ul className="space-y-4">
                {values.map((val, i) => (
                  <li key={i} className="flex items-start gap-3.5">
                    <span className="h-7 w-7 rounded-lg bg-industrial-950 border border-gray-800 flex items-center justify-center text-industrial-accent shrink-0 mt-0.5">
                      <CheckMarkIcon size={16} />
                    </span>
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-base">{val.title}</h4>
                      <p className="text-gray-300 text-sm leading-relaxed mt-0.5">{val.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ISO 9001 Certificate Section with anchor #certyfikat-iso */}
          <div
            id="certyfikat-iso"
            className="scroll-mt-28 bg-industrial-900 border border-gray-800 rounded-2xl p-6 sm:p-10 md:p-12 text-gray-100 mb-16"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <div className="h-20 w-20 rounded-2xl bg-industrial-950 border border-industrial-accent/40 flex items-center justify-center text-industrial-accent shrink-0">
                <Award size={44} />
              </div>
              <div>
                <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-industrial-accent">
                  <QualityProcessIcon size={16} />
                  <span>Certyfikat Polskiego Centrum Akredytacji (PCA) AC 136</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-3">
                  System Zarządzania Jakością ISO 9001:2015
                </h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-4xl">
                  Posiadamy certyfikat potwierdzający zgodność naszego Systemu Zarządzania Jakością
                  z międzynarodową normą <strong>PN-EN ISO 9001:2015</strong>. Standard ten
                  gwarantuje stały nadzór nad procesami realizacyjnymi, bezpieczeństwem technicznym
                  oraz wysoką powtarzalność jakości świadczonych usług.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-800">
              <h3 className="card-title mb-5">
                Pełny zakres akredytacji (13 certyfikowanych obszarów):
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {accreditationScope.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3.5 rounded-xl bg-industrial-950/70 border border-gray-800/80 text-sm text-gray-200"
                  >
                    <span className="text-xs font-bold text-industrial-accent shrink-0 mt-0.5">
                      {String(idx + 1).padStart(2, '0')}.
                    </span>
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ServiceInquiryCta
            title="Szukasz wykonawcy, który połączy kilka branż technicznych w jednym zadaniu?"
            description="Prześlij krótki opis projektu – niezależnie czy dotyczy wynajmu dźwigu, relokacji linii, odbioru UDT, spawalnictwa czy instalacji elektrycznych. Dobierzemy odpowiedni zespół i przygotujemy wycenę."
            contactLabel="Porozmawiajmy o współpracy"
            trainingTitle="Akredytowane szkolenia dla przemysłu"
            trainingDescription="Wspieramy rozwój kompetencji technicznych zespołów utrzymania ruchu i produkcji na dedykowanej platformie szkoleniowej."
          />
        </div>
      </section>
    </SiteSettingsProvider>
  );
};
