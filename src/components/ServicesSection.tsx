import React from 'react';
import { Truck, Hammer, Move, HardHat, ExternalLink, ArrowRight } from 'lucide-react';

const services = [
  {
    id: "relokacja",
    title: "Relokacja Maszyn",
    icon: <Move size={40} />,
    description: "Kompleksowe przenoszenie linii produkcyjnych.",
    items: [
      "Demontaż maszyn i urządzeń",
      "Załadunek i transport specjalistyczny",
      "Relokacje na terenie zakładu i zewnętrzne",
      "Ponowny montaż i poziomowanie",
      "Rozruch technologiczny po relokacji"
    ],
    training: null
  },
  {
    id: "wynajem",
    title: "Wynajem Maszyn",
    icon: <Truck size={40} />,
    description: "Profesjonalny sprzęt z możliwością wynajmu z operatorem.",
    items: [
      "Podesty: nożycowe (do 18m), przegubowe, teleskopowe",
      "Żurawie samochodowe (35t, 45t, 60t, 90t)",
      "Ładowarki teleskopowe i wózki widłowe",
      "Specjalistyczny sprzęt (np. VersaLift)",
      "Podnośniki koszowe na pojazdach"
    ],
    training: {
      text: "Potrzebujesz uprawnień UDT na wózki lub żurawie?",
      linkText: "Oferta szkoleń UDT"
    }
  },
  {
    id: "spawanie",
    title: "Usługi Spawalnicze",
    icon: <Hammer size={40} />,
    description: "Naprawy bieżące i konstrukcje stalowe.",
    items: [
      "Naprawy: maszyn, zbiorników, rurociągów",
      "Konstrukcje: hale, antresole, podesty",
      "Spawanie wszystkich gatunków stali",
      "Wszystkie metody (MIG/MAG, TIG, Elektryczne)",
      "Doradztwo przy nietypowych zleceniach"
    ],
    training: {
      text: "Szkolimy spawaczy (MIG/MAG, TIG).",
      linkText: "Kursy spawalnicze"
    }
  },
  {
    id: "budowlane",
    title: "Remonty Budowlane",
    icon: <HardHat size={40} />,
    description: "Usługi remontowo-budowlane dla przemysłu.",
    items: [
      "Adaptacje hal przemysłowych",
      "Fundamenty pod maszyny",
      "Prace wykończeniowe i modernizacyjne",
      "Naprawy posadzek przemysłowych",
      "Infrastruktura techniczna"
    ],
    training: {
        text: "Szkolenia IMBIGS na maszyny budowlane.",
        linkText: "Szkolenia IMBIGS"
    }
  }
];

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 bg-industrial-900 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            NASZE <span className="text-industrial-accent">USŁUGI</span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Dostarczamy rozwiązania dla przemysłu ciężkiego, logistyki i budownictwa.
            Wybierz interesujący Cię obszar, aby dowiedzieć się więcej.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div key={service.id} id={service.id} className="h-full flex flex-col">
              <div className="group relative flex flex-col h-full justify-between p-8 rounded-xl bg-industrial-800 border border-industrial-700 hover:border-industrial-accent transition-all duration-300 hover:shadow-[0_10px_40px_-10px_rgba(245,158,11,0.1)] hover:-translate-y-2 overflow-hidden flex-grow">
                
                {/* Hover Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-industrial-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icon Container */}
                  <div className="w-16 h-16 bg-industrial-900 rounded-xl flex items-center justify-center text-industrial-accent mb-6 border border-gray-800 group-hover:border-industrial-accent/30 group-hover:text-white group-hover:bg-industrial-accent transition-colors duration-300">
                    {service.icon}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 group-hover:text-industrial-accent transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-300 text-base md:text-lg mb-6 pb-6 border-b border-gray-700/50 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-4 mb-8">
                    {service.items.slice(0, 5).map((item, i) => (
                      <li key={i} className="flex items-start text-base text-gray-300">
                        <span className="w-2 h-2 bg-industrial-accent rounded-full mt-2 mr-3 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-auto pt-4 flex justify-between items-center group/btn cursor-pointer">
                  <span className="text-base font-bold text-gray-400 group-hover:text-white transition-colors">Dowiedz się więcej</span>
                  <div className="p-3 rounded-full bg-industrial-900 group-hover:bg-industrial-accent group-hover:text-industrial-900 transition-colors duration-300">
                     <ArrowRight size={20} className="transform group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>

              {/* Training Cross-sell Box */}
              {service.training && (
                <div className="mt-4 p-5 border border-dashed border-gray-700 rounded-lg bg-industrial-900/50">
                    <p className="text-sm text-gray-400 mb-2">{service.training.text}</p>
                    <a href="https://szkolenia-multiserwis.pl" target="_blank" rel="noopener noreferrer" className="text-base font-bold text-industrial-accent hover:text-white flex items-center gap-1 transition-colors">
                        {service.training.linkText} <ExternalLink size={14} />
                    </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};