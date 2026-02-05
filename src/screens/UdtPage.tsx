import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ShieldCheck, FileText, Settings, ArrowRight } from 'lucide-react';

export const UdtPage: React.FC = () => {
  const devices = [
    'Wózki widłowe', 'Podesty ruchome', 'Żurawie samojezdne', 'Żurawie HDS i leśne',
    'Dźwigniki', 'Podnośniki warsztatowe', 'Naczepy do transportu pojazdów',
    'Hakowce i bramowce', 'Suwnice', 'Wciągarki i wciągniki'
  ];

  return (
    <>
      <PageHeader 
        title="Konserwacja i Naprawa - UDT" 
        subtitle="Zapewniamy bezpieczeństwo i pełną zgodność formalną Twoich urządzeń z wymogami Urzędu Dozoru Technicznego."
      />

      <section className="py-20 bg-industrial-950">
        <div className="container mx-auto px-4">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">
            {/* Service Column 1 */}
            <div className="bg-industrial-900 p-8 rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-industrial-800 rounded-lg flex items-center justify-center text-industrial-accent mb-6">
                 <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Rejestracja i Formalności</h3>
              <p className="text-gray-400 mb-4">Przejmujemy pełną organizację badań UDT:</p>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>• Rejestracja nowych urządzeń</li>
                <li>• Odtwarzanie dokumentacji (resurs)</li>
                <li>• Zgłoszenia i obsługa urzędowa</li>
                <li>• Przygotowanie urządzeń do odbioru</li>
              </ul>
            </div>

            {/* Service Column 2 */}
            <div className="bg-industrial-900 p-8 rounded-xl border border-gray-800 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-industrial-accent/10 rounded-full blur-2xl"></div>
              <div className="w-12 h-12 bg-industrial-800 rounded-lg flex items-center justify-center text-industrial-accent mb-6">
                 <Settings size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Konserwacja i Przeglądy</h3>
              <p className="text-gray-400 mb-4">Regularna opieka techniczna:</p>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>• Przeglądy konserwacyjne (UTB)</li>
                <li>• Dzienniki konserwacji</li>
                <li>• Naprawy hydrauliki siłowej</li>
                <li>• Naprawy maszyn budowlanych</li>
              </ul>
            </div>

            {/* Service Column 3 */}
            <div className="bg-industrial-900 p-8 rounded-xl border border-gray-800">
              <div className="w-12 h-12 bg-industrial-800 rounded-lg flex items-center justify-center text-industrial-accent mb-6">
                 <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Doradztwo Techniczne</h3>
              <p className="text-gray-400 mb-4">Wsparcie eksperckie:</p>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li>• Analiza obowiązku rejestracji</li>
                <li>• Audyt stanu technicznego</li>
                <li>• Weryfikacja uprawnień operatorów</li>
                <li>• Pomoc w zakupie urządzeń</li>
              </ul>
            </div>
          </div>

          {/* Supported Devices */}
          <div className="mb-20">
             <h3 className="text-2xl font-bold text-white text-center mb-10">Obsługiwane Urządzenia</h3>
             <div className="flex flex-wrap justify-center gap-4">
                {devices.map((device, idx) => (
                   <span key={idx} className="bg-industrial-800 text-gray-300 px-4 py-2 rounded-full border border-gray-700 hover:border-industrial-accent transition-colors text-sm">
                      {device}
                   </span>
                ))}
             </div>
          </div>

          {/* Training CTA */}
          <div className="bg-gradient-to-r from-industrial-900 to-industrial-800 rounded-2xl p-8 md:p-12 border border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
               <h3 className="text-2xl font-bold text-white mb-4">Potrzebujesz uprawnień do obsługi tych urządzeń?</h3>
               <p className="text-gray-400">Prowadzimy certyfikowane szkolenia UDT na wózki, suwnice, żurawie i inne. Oferujemy również odnowienie uprawnień oraz szkolenia na maszyny budowlane (IMBIGS).</p>
            </div>
            <a 
               href="https://szkolenia-multiserwis.pl" 
               target="_blank" 
               rel="noopener noreferrer"
               className="bg-white text-industrial-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
               Zobacz ofertę szkoleń
               <ArrowRight size={20} className="text-industrial-accent" />
            </a>
          </div>

        </div>
      </section>
    </>
  );
};
