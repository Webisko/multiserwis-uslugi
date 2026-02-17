import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { HardHat, ArrowRight } from 'lucide-react';

export const ConstructionPage: React.FC = () => {
  const scope = [
    'Adaptacje i modernizacje hal przemysłowych',
    'Fundamenty pod maszyny oraz przygotowanie pod montaż urządzeń',
    'Prace wykończeniowe i remontowe na obiektach przemysłowych',
    'Naprawy posadzek przemysłowych i elementów infrastruktury',
    'Wsparcie realizacji technicznych we współpracy z działem elektrycznym i UDT',
  ];

  const executionModel = [
    {
      title: 'Analiza zakresu',
      description: 'Wspólnie z klientem określamy zakres prac, harmonogram oraz wymagania obiektu.',
    },
    {
      title: 'Organizacja robót',
      description: 'Planujemy etapy i organizację prac tak, aby zminimalizować wpływ na ciągłość działania zakładu.',
    },
    {
      title: 'Realizacja i odbiór',
      description: 'Prowadzimy prace wykonawcze, raportujemy postęp i przygotowujemy obiekt do odbioru.',
    },
  ];

  return (
    <>
      <PageHeader 
        title="Usługi Remontowo-Budowlane" 
        subtitle="Prace remontowo-budowlane dla przemysłu i obiektów technicznych, realizowane sprawnie i bezpiecznie."
        backgroundImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="page-section">
        <div className="page-container">
          <div className="max-w-5xl mx-auto text-center mb-14">
            <p className="text-xl text-gray-300 leading-relaxed">
              Sekcja budownictwa została przygotowana w wersji roboczej na podstawie obecnych ustaleń.
              Finalny zakres i opisy realizacji uzupełnimy po doprecyzowaniu informacji od klienta.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <article className="offer-card rounded-2xl">
              <div className="w-14 h-14 bg-industrial-800 rounded-xl flex items-center justify-center text-industrial-accent mb-6">
                <HardHat size={30} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Zakres usług</h2>
              <ul className="space-y-4 text-gray-300">
                {scope.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-industrial-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="offer-card rounded-2xl">
              <h2 className="text-3xl font-bold text-white mb-6">Model realizacji</h2>
              <div className="space-y-6">
                {executionModel.map((step, index) => (
                  <div key={step.title} className="border-l-2 border-industrial-accent/60 pl-5">
                    <p className="text-industrial-accent font-display font-bold text-lg mb-2">0{index + 1}. {step.title}</p>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          <div className="offer-cta mb-10">
            <h3 className="text-2xl font-bold text-white mb-4">Do potwierdzenia z klientem</h3>
            <ul className="space-y-3 text-gray-300">
              <li>• Szczegółowe specjalizacje remontowo-budowlane i priorytetowe typy zleceń</li>
              <li>• Przykładowe realizacje (zdjęcia, zakres, efekty, terminy)</li>
              <li>• Informacja o obszarze działania (lokalnie / Polska / zagranica)</li>
            </ul>
          </div>

          <div className="bg-industrial-900/60 border border-dashed border-gray-700 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div>
              <h4 className="text-2xl font-bold text-white mb-2">Potrzebujesz uprawnień na maszyny budowlane?</h4>
              <p className="text-gray-400">Prowadzimy szkolenia IMBIGS dla operatorów maszyn i urządzeń.</p>
            </div>
            <a
              href="https://szkolenia-multiserwis.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-industrial-800 text-white rounded-lg font-bold hover:bg-industrial-accent hover:text-industrial-900 transition-colors"
            >
              Zobacz szkolenia IMBIGS <ArrowRight size={18} />
            </a>
          </div>

          <div className="text-center">
            <a href="/multiserwis-uslugi/kontakt" className="inline-block bg-industrial-accent text-industrial-900 px-8 py-3 rounded font-bold hover:bg-industrial-accentHover transition-colors">
              Zamów wycenę prac budowlanych
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
