import React from 'react';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/ServicesSection';
import { ElectricalSection } from '../components/ElectricalSection';
import { UdtSection } from '../components/UdtSection';
import { CertificatesSection } from '../components/CertificatesSection';
import { FaqSection } from '../components/FaqSection';
import { ContactSection } from '../components/ContactSection';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';
import type { FaqGroupPayload, ServiceOfferingPayload } from '../lib/siteContent';
import {
  SynergyHubIcon,
  CostOptimizationIcon,
  QualityProcessIcon,
} from '../components/icons/IndustrialIcons';

type HomePageProps = {
  companyData?: CompanyData;
  faqGroups?: FaqGroupPayload[];
  services?: ServiceOfferingPayload[];
  contactOptions?: string[];
};

export const WhyUsSection: React.FC = () => (
  <section className="page-section border-b border-gray-800/80">
    <div className="page-container">
      <div className="text-center mb-12 md:mb-14">
        <div className="mb-4 flex justify-center">
          <span className="section-badge">
            <SynergyHubIcon size={15} />
            <span>Model współpracy B2B</span>
          </span>
        </div>
        <h2 className="section-title mb-4">
          Dlaczego warto wybrać <span className="text-industrial-accent">jedno źródło usług</span>?
        </h2>
        <p className="section-lead mx-auto">
          Zamiast koordynować kilku podwykonawców, powierzasz nam całość zadania – od podstawienia
          żurawia i demontażu, przez spawalnictwo i elektrykę, aż po odbiór UDT.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {/* Card 01 */}
        <div className="group offer-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="h-12 w-12 rounded-xl bg-industrial-950 border border-gray-800 flex items-center justify-center text-industrial-accent group-hover:bg-industrial-accent group-hover:text-industrial-950 transition-colors">
                <SynergyHubIcon size={24} />
              </div>
              <span className="font-display text-3xl font-bold text-industrial-accent/80 group-hover:text-industrial-accent transition-colors">
                01
              </span>
            </div>
            <h3 className="card-title mb-3 group-hover:text-industrial-accent transition-colors">
              Synergia działań technicznych
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Łączymy wynajem sprzętu dźwigowego, relokację maszyn, obsługę UDT, spawalnictwo,
              rurociągi i elektrykę. Oszczędzasz czas na koordynacji kilku osobnych ekip.
            </p>
          </div>
        </div>

        {/* Card 02 */}
        <div className="group offer-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="h-12 w-12 rounded-xl bg-industrial-950 border border-gray-800 flex items-center justify-center text-industrial-accent group-hover:bg-industrial-accent group-hover:text-industrial-950 transition-colors">
                <CostOptimizationIcon size={24} />
              </div>
              <span className="font-display text-3xl font-bold text-industrial-accent/80 group-hover:text-industrial-accent transition-colors">
                02
              </span>
            </div>
            <h3 className="card-title mb-3 group-hover:text-industrial-accent transition-colors">
              Optymalizacja kosztów i logistyki
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Własny park maszynowy bez pośredników oznacza niższe koszty mobilizacji sprzętu,
              krótsze okna serwisowe i korzystniejsze warunki handlowe na pakiet prac.
            </p>
          </div>
        </div>

        {/* Card 03 */}
        <div className="group offer-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="h-12 w-12 rounded-xl bg-industrial-950 border border-gray-800 flex items-center justify-center text-industrial-accent group-hover:bg-industrial-accent group-hover:text-industrial-950 transition-colors">
                <QualityProcessIcon size={24} />
              </div>
              <span className="font-display text-3xl font-bold text-industrial-accent/80 group-hover:text-industrial-accent transition-colors">
                03
              </span>
            </div>
            <h3 className="card-title mb-3 group-hover:text-industrial-accent transition-colors">
              Jakość ISO 9001 i terminowość
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Pracujemy według certyfikowanych procedur jakości PCA AC 136 oraz standardów BHP, co
              gwarantuje bezpieczną realizację na czynnych zakładach i terminowy odbiór.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const HomePage: React.FC<HomePageProps> = ({
  companyData,
  faqGroups,
  services,
  contactOptions,
}) => {
  const resolvedCompany = companyData ?? company;

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <Hero />
      <WhyUsSection />
      <ServicesSection services={services} />
      <ElectricalSection />
      <UdtSection />
      <CertificatesSection />
      <FaqSection faqGroups={faqGroups} />
      <ContactSection serviceOptions={contactOptions} />
    </SiteSettingsProvider>
  );
};
