import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { HardHat } from 'lucide-react';

export const ConstructionPage: React.FC = () => {
  return (
    <>
      <PageHeader 
        title="Usługi Remontowo-Budowlane" 
        subtitle="Realizujemy prace budowlane w obiektach przemysłowych, magazynowych i użyteczności publicznej."
      />

      <section className="py-20 bg-industrial-950">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-industrial-900/50 p-10 rounded-2xl border border-gray-800">
             <div className="w-16 h-16 bg-industrial-800 rounded-full flex items-center justify-center text-industrial-accent mx-auto mb-6">
                <HardHat size={32} />
             </div>
             <h3 className="text-2xl font-bold text-white mb-4">Sekcja w rozbudowie</h3>
             <p className="text-gray-400 mb-8">
               Przygotowujemy szczegółowy opis naszej oferty budowlanej. 
               Jeśli jesteś zainteresowany remontem hali, fundamentami pod maszyny lub innymi pracami budowlanymi, 
               skontaktuj się z nami bezpośrednio.
             </p>
             <a href="/multiserwis-uslugi/kontakt" className="inline-block bg-industrial-accent text-industrial-900 px-8 py-3 rounded font-bold hover:bg-industrial-accentHover transition-colors">
                Skontaktuj się z nami
             </a>
          </div>
        </div>
      </section>
    </>
  );
};
