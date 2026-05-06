import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Check, Star, Award } from 'lucide-react';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';

type AboutPageProps = {
   companyData?: CompanyData;
};

export const AboutPage: React.FC<AboutPageProps> = ({ companyData }) => {
   const resolvedCompany = companyData ?? company;
  const accreditationScope = [
    'Szkolenia dla operatorów UTB i maszyn budowlanych',
    'Szkolenia spawalnicze i energetyczne (SEP)',
    'Doradztwo w zakresie eksploatacji maszyn',
    'Naprawy i konserwacja urządzeń technicznych',
    'Kompleksowe usługi konstrukcyjne',
    'Pomiary i instalacje elektryczne',
    'Usługi spawalnicze i ślusarskie',
    'Relokacja maszyn',
    'Usługi budowlane dla przemysłu',
    'Usługi i wynajem dźwigowy'
  ];

  return (
      <SiteSettingsProvider value={resolvedCompany}>
      <PageHeader 
        title="O Firmie" 
            subtitle="Doświadczenie, certyfikowana jakość i odpowiedzialność za wynik każdej realizacji."
            backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
      />

         <section className="page-section">
            <div className="page-container">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
             <div>
                <h2 className="text-3xl font-bold text-white mb-6">Partner w Przemyśle</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                   Firma MULTISERWIS to zaufany partner dla sektora przemysłowego, budowlanego i energetycznego. 
                   Łączymy wieloletnie doświadczenie z nowoczesnym podejściem do zarządzania i realizacji usług.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                   Naszą misją jest dostarczanie kompleksowych rozwiązań "pod klucz" – od wynajmu sprzętu, przez usługi techniczne, 
                   aż po szkolenia kadr. Dzięki temu nasi klienci oszczędzają czas i optymalizują koszty.
                </p>
             </div>
             <div className="bg-industrial-900 border border-gray-800 p-8 rounded-xl relative">
                <div className="absolute top-4 right-4 text-industrial-accent">
                   <Star size={40} fill="currentColor" className="opacity-20" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Nasze wartości</h3>
                <ul className="space-y-4">
                   <li className="flex items-start gap-3">
                      <Check className="text-industrial-accent shrink-0 mt-1" />
                      <span className="text-gray-400">Bezpieczeństwo jako priorytet</span>
                   </li>
                   <li className="flex items-start gap-3">
                      <Check className="text-industrial-accent shrink-0 mt-1" />
                      <span className="text-gray-400">Terminowość realizacji zleceń</span>
                   </li>
                   <li className="flex items-start gap-3">
                      <Check className="text-industrial-accent shrink-0 mt-1" />
                      <span className="text-gray-400">Elastyczność i dopasowanie do klienta</span>
                   </li>
                   <li className="flex items-start gap-3">
                      <Check className="text-industrial-accent shrink-0 mt-1" />
                      <span className="text-gray-400">Ciągłe doskonalenie (zgodnie z ISO)</span>
                   </li>
                </ul>
             </div>
          </div>

          <div className="bg-white rounded-2xl p-10 md:p-16 text-industrial-900 mb-20">
             <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="shrink-0 mb-6 md:mb-0">
                   <Award size={100} className="text-industrial-accent" />
                </div>
                <div>
                   <h2 className="text-3xl font-bold mb-4">Certyfikat ISO 9001:2015</h2>
                   <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Posiadamy Certyfikat Polskiego Centrum Akredytacji (PCA) AC 136, potwierdzający zgodność naszego Systemu Zarządzania Jakością z normą PN-EN ISO 9001:2015.
                   </p>
                   <p className="text-gray-600">
                      Standard ten gwarantuje, że nasze procesy są stale monitorowane, a jakość usług jest powtarzalna i na najwyższym poziomie.
                   </p>
                </div>
             </div>
             
             <div className="mt-12 pt-10 border-t border-gray-200">
                <h3 className="text-xl font-bold mb-6">Zakres naszej akredytacji obejmuje:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                   {accreditationScope.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                         <div className="w-1.5 h-1.5 rounded-full bg-industrial-accent mt-1.5 shrink-0"></div>
                         {item}
                      </div>
                   ))}
                </div>
             </div>
          </div>

               <ServiceInquiryCta
                  title="Szukasz partnera, który połączy kilka obszarów usług w jednym projekcie?"
                  description="Jeżeli potrzebujesz wykonawcy do wynajmu sprzętu, relokacji, UDT, elektryki lub prac budowlanych, prześlij krótki opis zadania. Dobierzemy właściwy zespół i zaproponujemy sposób realizacji."
                  contactLabel="Porozmawiajmy o współpracy"
                  trainingTitle="Szkolenia dla zespołów technicznych"
                  trainingDescription="Poza usługami operacyjnymi wspieramy też rozwój kwalifikacji operatorów, konserwatorów, elektryków i spawaczy na osobnej stronie szkoleniowej."
               />

        </div>
      </section>
      </SiteSettingsProvider>
  );
};
