import React from 'react';
import { PageHeader } from '../components/PageHeader';

export const RelocationPage: React.FC = () => {
  const steps = [
    { title: 'Demontaż', desc: 'Fachowy demontaż maszyn z zachowaniem procedur bezpieczeństwa.' },
    { title: 'Załadunek', desc: 'Wykorzystujemy własny sprzęt dźwigowy i wózki.' },
    { title: 'Transport', desc: 'Bezpieczny przewóz na terenie zakładu lub do nowej lokalizacji.' },
    { title: 'Rozładunek', desc: 'Precyzyjne ustawienie maszyn w miejscu docelowym.' },
    { title: 'Montaż', desc: 'Ponowne złożenie i podłączenie mediów.' },
    { title: 'Rozruch', desc: 'Uruchomienie technologiczne i testy poprawności działania.' },
  ];

  return (
    <>
      <PageHeader 
        title="Relokacja Maszyn" 
            subtitle="Kompleksowa relokacja parku maszynowego — od pojedynczych urządzeń po całe linie produkcyjne."
            backgroundImage="https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?auto=format&fit=crop&q=80&w=2000"
      />

         <section className="page-section">
            <div className="page-container">
          
          <div className="max-w-4xl mx-auto mb-20 text-center">
             <p className="text-xl text-gray-300 leading-relaxed">
               Zapewniamy kompleksową obsługę relokacji – zarówno wewnątrz zakładu, jak i przy zmianie lokalizacji fabryki. 
               Dzięki własnemu zapleczu (dźwigi, podnośniki, elektrycy, mechanicy) działamy sprawnie i terminowo.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
             {steps.map((step, index) => (
                <div key={step.title} className="offer-card p-6">
                   <div className="text-4xl font-display font-bold text-industrial-800 mb-4">{index + 1}</div>
                   <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                   <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
             ))}
          </div>

          <div className="offer-cta flex flex-col md:flex-row items-center gap-8">
             <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-white mb-4">Dlaczego my?</h3>
                <ul className="space-y-4">
                   <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 rounded bg-industrial-800 flex items-center justify-center text-industrial-accent font-bold">✓</div>
                      <span>Własny sprzęt dźwigowy – brak pośredników</span>
                   </li>
                   <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 rounded bg-industrial-800 flex items-center justify-center text-industrial-accent font-bold">✓</div>
                      <span>Zespół elektryków do odłączenia i podłączenia maszyn</span>
                   </li>
                   <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 rounded bg-industrial-800 flex items-center justify-center text-industrial-accent font-bold">✓</div>
                      <span>Uprawnienia UDT do obsługi urządzeń transportowych</span>
                   </li>
                </ul>
             </div>
             <div className="md:w-1/2 flex justify-center">
                <a href="/multiserwis-uslugi/kontakt" className="bg-industrial-accent text-industrial-900 px-8 py-4 rounded-lg font-bold hover:bg-industrial-accentHover transition-colors shadow-lg shadow-industrial-accent/20">
                   Zamów wycenę relokacji
                </a>
             </div>
          </div>

        </div>
      </section>
    </>
  );
};
