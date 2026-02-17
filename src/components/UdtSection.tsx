import React from 'react';
import { ClipboardCheck, ShieldCheck, FileText, Settings, BookOpen, ArrowRight } from 'lucide-react';

export const UdtSection: React.FC = () => {
  const categories = [
    {
      title: "Obsługiwane Urządzenia",
      items: [
        "Wózki widłowe",
        "Podesty ruchome",
        "Żurawie samojezdne, HDS i leśne",
        "Dźwigniki i podnośniki warsztatowe",
        "Naczepy do transportu pojazdów",
        "Hakowce i bramowce",
        "Suwnice, wciągarki, wciągniki"
      ]
    },
    {
      title: "Zakres Usług UDT",
      items: [
        "Kompleksowa organizacja badań UDT",
        "Rejestracja urządzeń (również bez dokumentacji)",
        "Przygotowanie do badań technicznych",
        "Przeglądy konserwacyjne (wykonywanie i dokumentacja)",
        "Analiza obowiązku rejestracji urządzeń",
        "Doradztwo w zakresie uprawnień"
      ]
    }
  ];

  return (
    <section id="udt" className="py-24 bg-industrial-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="lg:w-1/3 sticky top-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-accent/20 rounded-full text-industrial-accent text-base font-bold mb-6">
              <ShieldCheck size={20} />
              <span>Bezpieczeństwo i Prawo</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">
              Konserwacja i <span className="text-industrial-accent">UDT</span>
            </h2>
            <p className="text-gray-300 mb-10 text-xl leading-relaxed">
              Zapewniamy pełną obsługę formalną i techniczną. Przejmujemy cały proces: od przygotowania dokumentacji, przez rejestrację, aż po regularne przeglądy i asystę podczas badań.
            </p>
            
            <div className="p-8 bg-industrial-800 rounded-xl border-l-4 border-industrial-accent mb-8">
              <h4 className="text-white text-lg font-bold mb-3 flex items-center gap-3">
                <FileText size={24} className="text-industrial-accent"/>
                Brak dokumentacji?
              </h4>
              <p className="text-base text-gray-300 leading-relaxed">
                Odtwarzamy dokumentację i zgłaszamy urządzenie do UDT w Twoim imieniu. Pełna obsługa formalna.
              </p>
            </div>

            {/* Training Link Sidebar */}
            <div className="p-8 border border-gray-700 rounded-xl bg-gradient-to-br from-industrial-800 to-industrial-900">
                <h4 className="text-white text-xl font-bold mb-3 flex items-center gap-3">
                    <BookOpen size={24} className="text-industrial-accent"/>
                    Szkolenia UDT
                </h4>
                <p className="text-base text-gray-400 mb-6 leading-relaxed">
                    Organizujemy szkolenia dla operatorów i konserwatorów: wózki, suwnice, żurawie i inne.
                </p>
                <a href="https://szkolenia-multiserwis.pl" target="_blank" rel="noopener noreferrer" className="text-industrial-accent text-lg font-bold hover:text-white flex items-center gap-2 transition-colors">
                    Pełna oferta szkoleń <ArrowRight size={18}/>
                </a>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, idx) => (
              <div key={idx} className="bg-industrial-800 rounded-xl p-8 md:p-10 border border-gray-700 hover:border-industrial-accent/30 transition-colors">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-8 flex items-center gap-4">
                  {idx === 0 ? <Settings size={32} className="text-industrial-accent" /> : <ClipboardCheck size={32} className="text-industrial-accent" />}
                  {category.title}
                </h3>
                <ul className="space-y-5">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-industrial-900 flex items-center justify-center text-sm font-mono text-gray-500 group-hover:bg-industrial-accent group-hover:text-industrial-900 transition-colors border border-gray-700 group-hover:border-industrial-accent flex-shrink-0">
                        {i + 1}
                      </div>
                      <span className="text-gray-200 text-lg group-hover:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Hydraulics Box */}
            <div className="md:col-span-2 bg-industrial-800 rounded-xl p-10 border border-gray-700 hover:border-industrial-accent/30 transition-colors mt-6">
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                    Hydraulika Siłowa i Maszyny Budowlane
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                    Poza dozorem UDT, oferujemy profesjonalne naprawy hydrauliki siłowej oraz serwis maszyn budowlanych.
                </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};