import React from 'react';
import { Zap, Activity, Cable, CheckCircle2, GraduationCap, ArrowRight } from 'lucide-react';

export const ElectricalSection: React.FC = () => {
  return (
    <section id="elektryka" className="py-24 bg-industrial-800 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-accent/20 rounded-full text-industrial-accent text-base font-bold mb-6">
            <Zap size={20} />
            <span>Energetyka i Automatyka</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">
            Usługi <span className="text-industrial-accent">Elektryczne</span>
          </h2>
          <p className="text-gray-300 max-w-3xl text-xl leading-relaxed">
            Specjalizujemy się w pracach na czynnych obiektach przemysłowych. 
            Oferujemy kompleksowe uruchomienia, prace kontrolno-pomiarowe oraz montaże instalacji nn, SN i WN.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Column 1: Commissioning */}
          <div className="bg-industrial-900 p-10 rounded-2xl border border-gray-800 hover:border-industrial-accent/30 transition-colors">
            <div className="flex items-center gap-6 mb-8">
              <div className="p-4 bg-industrial-800 rounded-xl text-industrial-accent">
                <Activity size={40} />
              </div>
              <h3 className="text-3xl font-display font-bold text-white">Uruchomienia i Rozruch</h3>
            </div>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-white text-xl font-bold mb-4 border-l-4 border-industrial-accent pl-4">Prace kontrolno-pomiarowe</h4>
                <ul className="space-y-3 text-gray-300 text-base md:text-lg">
                   <li className="flex gap-3"><CheckCircle2 size={24} className="text-industrial-accent shrink-0 mt-0.5"/> Parametryzacja urządzeń i nadzory nad montażami</li>
                   <li className="flex gap-3"><CheckCircle2 size={24} className="text-industrial-accent shrink-0 mt-0.5"/> Testy i uruchomienia rozdzielnic nn oraz SN</li>
                   <li className="flex gap-3"><CheckCircle2 size={24} className="text-industrial-accent shrink-0 mt-0.5"/> Pomiary transformatorów, silników, kabli i ochrony p-porażeniowej</li>
                   <li className="flex gap-3"><CheckCircle2 size={24} className="text-industrial-accent shrink-0 mt-0.5"/> Testy UPS-ów, baterii, szynoprzewodów</li>
                   <li className="flex gap-3"><CheckCircle2 size={24} className="text-industrial-accent shrink-0 mt-0.5"/> Analiza jakości energii</li>
                </ul>
              </div>

              <div>
                 <h4 className="text-white text-xl font-bold mb-4 border-l-4 border-industrial-accent pl-4">Integracja i Automatyka</h4>
                 <ul className="space-y-3 text-gray-300 text-base md:text-lg">
                   <li className="flex gap-3"><CheckCircle2 size={24} className="text-industrial-accent shrink-0 mt-0.5"/> Konfiguracja protokołów: Profibus, Profinet, Modbus, IEC 61850</li>
                   <li className="flex gap-3"><CheckCircle2 size={24} className="text-industrial-accent shrink-0 mt-0.5"/> Testy sygnałowe AKPiA</li>
                   <li className="flex gap-3"><CheckCircle2 size={24} className="text-industrial-accent shrink-0 mt-0.5"/> Udział w podaniu napięcia i ruch próbny</li>
                 </ul>
              </div>
            </div>
          </div>

          {/* Column 2: Installation */}
          <div className="bg-industrial-900 p-10 rounded-2xl border border-gray-800 hover:border-industrial-accent/30 transition-colors">
             <div className="flex items-center gap-6 mb-8">
              <div className="p-4 bg-industrial-800 rounded-xl text-industrial-accent">
                <Cable size={40} />
              </div>
              <h3 className="text-3xl font-display font-bold text-white">Prace Elektroinstalacyjne</h3>
            </div>

            <div className="space-y-8">
               <p className="text-gray-300 text-lg md:text-xl mb-6 leading-relaxed">
                 Realizacje na nowych obiektach oraz modernizacje istniejącej infrastruktury (również zagranicą). 
                 Praca w systemie zmianowym w celu zachowania ciągłości produkcji.
               </p>

               <ul className="space-y-4">
                 {[
                   "Montaż tras kablowych (stal nierdzewna, ocynk, tworzywa)",
                   "Systemy kablowe WN, SN i nn",
                   "Instalacje uziemienia, odgromowe i połączeń wyrównawczych",
                   "Kompletne instalacje oświetlenia (użytkowe, awaryjne)",
                   "Instalacje słaboprądowe",
                   "Dokumentacja powykonawcza w bazie danych"
                 ].map((item, i) => (
                   <li key={i} className="flex items-start text-gray-300 text-base md:text-lg">
                      <span className="w-2 h-2 bg-gray-500 rounded-full mt-2.5 mr-4 flex-shrink-0" />
                      {item}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

        </div>

        {/* SEP Training CTA */}
        <div className="mt-12 bg-industrial-900/50 border border-dashed border-gray-700 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className="p-4 bg-industrial-accent/10 rounded-full text-industrial-accent">
                 <GraduationCap size={32} />
              </div>
              <div>
                 <h4 className="text-white font-bold text-2xl">Potrzebujesz uprawnień SEP?</h4>
                 <p className="text-gray-400 text-lg">Organizujemy kursy: G1 (Elektryczne), G2 (Energetyczne), G3 (Gazowe).</p>
              </div>
           </div>
           <a href="#" className="px-8 py-4 bg-industrial-800 hover:bg-industrial-accent hover:text-industrial-900 text-white font-bold rounded-lg text-lg transition-colors flex items-center gap-3 whitespace-nowrap shadow-lg">
              Zobacz szkolenia SEP <ArrowRight size={20} />
           </a>
        </div>

      </div>
    </section>
  );
};