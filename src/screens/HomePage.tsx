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

type HomePageProps = {
  companyData?: CompanyData;
  faqGroups?: FaqGroupPayload[];
  services?: ServiceOfferingPayload[];
  contactOptions?: string[];
};

export const HomePage: React.FC<HomePageProps> = ({ companyData, faqGroups, services, contactOptions }) => {
  const resolvedCompany = companyData ?? company;

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <Hero />
      
      {/* Why Us Intro */}
      <section className="py-20 bg-industrial-800 border-b border-gray-900">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-2xl md:text-3xl font-light text-gray-300 mb-10">
              Dlaczego warto wybrać <span className="font-bold text-white">jedno źródło</span> usług?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {/* Card 01 */}
              <div className="group p-6 bg-industrial-900/50 rounded-xl border border-gray-800 shadow-xl hover:border-industrial-accent transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="text-5xl font-display font-bold text-industrial-accent mb-4 group-hover:text-white transition-colors duration-300">01</div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-industrial-accent transition-colors duration-300">Synergia Działań</h4>
                  <p className="text-lg text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Łączymy wynajem, relokację, UDT, spawalnictwo i montaż przemysłowy. Oszczędzasz czas na koordynacji kilku wykonawców.</p>
              </div>
              {/* Card 02 */}
              <div className="group p-6 bg-industrial-900/50 rounded-xl border border-gray-800 shadow-xl hover:border-industrial-accent transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="text-5xl font-display font-bold text-industrial-accent mb-4 group-hover:text-white transition-colors duration-300">02</div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-industrial-accent transition-colors duration-300">Optymalizacja Kosztów</h4>
                  <p className="text-lg text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Jeden dostawca to mniejsze koszty logistyczne i lepsze warunki handlowe na pakiet usług.</p>
              </div>
              {/* Card 03 */}
              <div className="group p-6 bg-industrial-900/50 rounded-xl border border-gray-800 shadow-xl hover:border-industrial-accent transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                  <div className="text-5xl font-display font-bold text-industrial-accent mb-4 group-hover:text-white transition-colors duration-300">03</div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-industrial-accent transition-colors duration-300">Jakość i Terminowość</h4>
                  <p className="text-lg text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">Pracujemy według uporządkowanych procesów i standardów jakości, co ułatwia bezpieczną realizację i terminowe oddanie prac.</p>
              </div>
            </div>
        </div>
      </section>

      <ServicesSection services={services} />
      
      <ElectricalSection />

      <UdtSection />
      
      <CertificatesSection />

      <FaqSection faqGroups={faqGroups} />
      
      <ContactSection serviceOptions={contactOptions} />
    </SiteSettingsProvider>
  );
};
