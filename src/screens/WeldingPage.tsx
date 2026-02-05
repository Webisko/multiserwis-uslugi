import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Wrench, Phone, ArrowRight } from 'lucide-react';

export const WeldingPage: React.FC = () => {
  return (
    <>
      <PageHeader 
        title="Usługi Spawalnicze" 
        subtitle="Precyzja, trwałość i technologia. Od napraw bieżących po kompleksowe konstrukcje stalowe."
      />

      <section className="py-20 bg-industrial-950">
        <div className="container mx-auto px-4">
          
          <div className="max-w-5xl mx-auto">
            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-industrial-900/50 p-8 rounded-xl border border-gray-800">
                <div className="w-12 h-12 bg-industrial-800 rounded-lg flex items-center justify-center text-industrial-accent mb-6">
                  <Wrench size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Naprawy Bieżące</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>• Maszyny i urządzenia przemysłowe</li>
                  <li>• Zbiorniki i silosy</li>
                  <li>• Kontenery</li>
                  <li>• Rurociągi technologiczne</li>
                  <li>• Elementy metalowe i części zamienne</li>
                </ul>
              </div>

              <div className="bg-industrial-900/50 p-8 rounded-xl border border-gray-800">
                <div className="w-12 h-12 bg-industrial-800 rounded-lg flex items-center justify-center text-industrial-accent mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4 8 4v14"/><path d="M13 11V7"/><path d="M17 15v-4"/></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Konstrukcje Stalowe</h3>
                <p className="text-gray-400 mb-4">Kompleksowe wykonawstwo od projektu po montaż:</p>
                <ul className="space-y-2 text-gray-400">
                  <li>• Antresole i podesty magazynowe</li>
                  <li>• Podesty serwisowe</li>
                  <li>• Konstrukcje hal i wiat</li>
                  <li>• Konstrukcje wsporcze</li>
                </ul>
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-industrial-900 rounded-2xl p-8 border border-gray-800 mb-16">
               <h3 className="text-2xl font-bold text-white mb-6">Technologie i Materiały</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-300">
                  <div>
                    <h4 className="font-bold text-industrial-accent mb-2">Metody spawania</h4>
                    <p>Specjalizujemy się we wszystkich głównych metodach spawania (MIG/MAG, TIG, MMA), dobierając technikę do specyfiki zlecenia.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-industrial-accent mb-2">Materiały</h4>
                    <p>Pracujemy na wszystkich gatunkach stali: stal czarna konstrukcyjna, stal nierdzewna (kwasoodporna), aluminium.</p>
                  </div>
               </div>
            </div>

            {/* CTA & Training */}
            <div className="flex flex-col md:flex-row gap-6 items-stretch">
               <div className="flex-grow bg-industrial-800 p-8 rounded-xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Masz nietypowe zlecenie?</h3>
                    <p className="text-gray-400">Oferujemy doradztwo technologiczne i wsparcie w realizacji projektów niestandardowych.</p>
                  </div>
                  <a href="/multiserwis-uslugi/kontakt" className="bg-industrial-accent text-industrial-900 px-6 py-3 rounded font-bold hover:bg-industrial-accentHover transition-colors whitespace-nowrap">
                    Skontaktuj się
                  </a>
               </div>

               <div className="md:w-1/3 bg-industrial-900 border border-gray-800 p-8 rounded-xl flex flex-col justify-center">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="text-industrial-accent">💡</span> Szkolenia Spawalnicze
                  </h4>
                  <p className="text-sm text-gray-400 mb-4">Kursy TIG, MIG/MAG, MMA. Zdobądź certyfikat spawacza.</p>
                  <a 
                    href="https://szkolenia-multiserwis.pl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-industrial-accent font-bold hover:underline flex items-center gap-1"
                  >
                    Oferta szkoleń <ArrowRight size={14} />
                  </a>
               </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
