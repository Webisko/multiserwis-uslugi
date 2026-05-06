import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';

type ElectricalPageProps = {
   companyData?: CompanyData;
};

export const ElectricalPage: React.FC<ElectricalPageProps> = ({ companyData }) => {
   const resolvedCompany = companyData ?? company;
  return (
      <SiteSettingsProvider value={resolvedCompany}>
      <PageHeader 
        title="Usługi Elektryczne" 
            subtitle="Uruchomienia, pomiary i modernizacje instalacji elektrycznych na obiektach przemysłowych i energetycznych."
            backgroundImage="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=2000"
      />

         <section className="page-section">
            <div className="page-container">
          
          {/* Section 1: Startup & Commissioning */}
          <div className="mb-20">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-industrial-900 border border-industrial-accent/20 rounded-lg flex items-center justify-center text-industrial-accent">
                   <Zap size={24} />
                </div>
                <h2 className="text-3xl font-bold text-white">Uruchomienia i Rozruch</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="offer-card-soft">
                   <h3 className="text-xl font-bold text-white mb-4">Prace Kontrolno-Pomiarowe</h3>
                   <ul className="space-y-3">
                      {[
                        'Parametryzacja urządzeń i testy produkcyjne',
                        'Pomiary transformatorów, silników i kabli (nn, SN)',
                        'Testy rozdzielnic nn oraz SN',
                        'Pomiary ochrony przeciwporażeniowej',
                        'Testy UPS-ów i baterii kondensatorów',
                        'Analiza jakości energii'
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                           <CheckCircle size={16} className="text-industrial-accent shrink-0 mt-0.5" />
                           <span>{item}</span>
                        </li>
                      ))}
                   </ul>
                </div>
                
                <div className="offer-card-soft">
                   <h3 className="text-xl font-bold text-white mb-4">Koordynacja z Technologią</h3>
                   <p className="text-gray-400 mb-6">
                      Zapewniamy skoordynowane podejście do rozruchu technologicznego, integrując rozdzielnice, stacje transformatorowe i automatykę. 
                      Celem jest minimalizacja czasu dochodzenia do stabilnej pracy instalacji.
                   </p>
                   <p className="text-gray-400">
                      <strong>Dokumentacja:</strong> Dostarczamy kompletne protokoły pomiarowe z każdego testu.
                   </p>
                </div>
             </div>
          </div>

          {/* Section 2: Installation Works */}
          <div className="mb-20">
             <h2 className="text-3xl font-bold text-white mb-8 pl-4 border-l-4 border-industrial-accent">Prace Elektroinstalacyjne</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1 lg:col-span-2">
                   <p className="text-lg text-gray-300 mb-6">
                      Realizujemy montaże na nowych obiektach oraz modernizacje istniejącej infrastruktury – również na obiektach czynnych, z zachowaniem ciągłości zasilania (praca w systemie zmianowym).
                   </p>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        'Trasy kablowe (koryta, drabinki)',
                        'Systemy kablowe WN, SN i nn',
                        'Instalacje uziemienia i odgromowe',
                        'Oświetlenie (użytkowe, awaryjne)',
                        'Instalacje słaboprądowe',
                        'Aparatura kontrolno-pomiarowa'
                      ].map((item, i) => (
                        <div key={i} className="bg-industrial-900 p-4 rounded border border-gray-800 text-gray-300 text-sm font-medium">
                           {item}
                        </div>
                      ))}
                   </div>
                </div>
                <div className="bg-industrial-800/30 p-6 rounded-xl border border-gray-700">
                   <h4 className="font-bold text-white mb-4">Dlaczego my?</h4>
                   <ul className="space-y-4 text-sm text-gray-400">
                      <li>• Uprawnienia SEP D+E (G1, G2, G3)</li>
                      <li>• Doświadczenie na dużych obiektach przemysłowych</li>
                      <li>• Własny sprzęt pomiarowy i montażowy</li>
                      <li>• Praca zgodnie ze standardami BHP</li>
                   </ul>
                </div>
             </div>
          </div>

          {/* Training SEP */}
          <div className="bg-industrial-900 border border-gray-800 rounded-xl p-8 flex flex-col items-center text-center">
             <h3 className="text-2xl font-bold text-white mb-2">Potrzebujesz uprawnień SEP?</h3>
             <p className="text-gray-400 mb-6 max-w-2xl">
                Organizujemy kursy i egzaminy SEP: G1 (elektryczne), G2 (cieplne) i G3 (gazowe).
             </p>
             <a 
                      href={resolvedCompany.links.trainingSiteUrl}
               target="_blank"
               rel="noopener noreferrer" 
               className="inline-flex items-center gap-2 text-industrial-accent font-bold hover:text-white transition-colors uppercase tracking-wider text-sm"
            >
                      Sprawdź szkolenia SEP <ArrowRight size={16} />
             </a>
          </div>

               <div className="mt-10">
                  <ServiceInquiryCta
                     title="Potrzebujesz rozruchu, pomiarów albo wykonawstwa instalacji na obiekcie przemysłowym?"
                     description="Opisz zakres instalacji, rodzaj obiektu i termin realizacji. Przygotujemy wycenę prac kontrolno-pomiarowych, wykonawczych lub rozruchowych dla Twojego zakładu."
                     contactLabel="Poproś o wycenę prac elektrycznych"
                     trainingTitle="Szkolenia SEP"
                     trainingDescription="Jeżeli zespół potrzebuje uprawnień energetycznych G1, G2 lub G3, przejdź do osobnej oferty szkoleniowej."
                  />
               </div>

        </div>
      </section>
      </SiteSettingsProvider>
  );
};
