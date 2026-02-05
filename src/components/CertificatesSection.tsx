import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

export const CertificatesSection: React.FC = () => {
  return (
    <section id="certyfikaty" className="py-24 bg-industrial-900 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="bg-industrial-800 rounded-2xl p-10 md:p-16 relative overflow-hidden border border-gray-700">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 text-industrial-900 opacity-50 rotate-12">
                <Award size={400} />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="inline-block px-5 py-2 mb-6 border border-industrial-accent text-industrial-accent text-base font-bold uppercase tracking-wider rounded">
                        Jakość Potwierdzona
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">
                        Certyfikat ISO 9001:2015
                    </h2>
                    <p className="text-gray-200 mb-8 text-xl md:text-2xl leading-relaxed font-light">
                        Posiadamy certyfikat systemu zarządzania jakością potwierdzony przez 
                        <span className="text-white font-bold"> Polskie Centrum Akredytacji (PCA) AC 136</span>.
                    </p>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        PN-EN ISO 9001:2015 to międzynarodowy standard, który gwarantuje, że nasze procesy są stale monitorowane i doskonalone, a usługi spełniają najwyższe wymagania.
                    </p>
                </div>
                
                <div className="bg-industrial-900/80 backdrop-blur-sm p-10 rounded-2xl border border-gray-700 shadow-xl">
                    <h3 className="text-white font-bold mb-6 text-xl md:text-2xl">Zakres akredytacji obejmuje:</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-4 text-gray-300 text-base md:text-lg items-center">
                            <CheckCircle className="text-industrial-accent shrink-0" size={24} />
                            <span>Wynajem sprzętu dźwigowego i budowlanego</span>
                        </li>
                        <li className="flex gap-4 text-gray-300 text-base md:text-lg items-center">
                            <CheckCircle className="text-industrial-accent shrink-0" size={24} />
                            <span>Usługi naprawy i konserwacji urządzeń technicznych (UDT)</span>
                        </li>
                        <li className="flex gap-4 text-gray-300 text-base md:text-lg items-center">
                            <CheckCircle className="text-industrial-accent shrink-0" size={24} />
                            <span>Kompleksowe usługi spawalnicze i konstrukcyjne</span>
                        </li>
                         <li className="flex gap-4 text-gray-300 text-base md:text-lg items-center">
                            <CheckCircle className="text-industrial-accent shrink-0" size={24} />
                            <span>Relokacja maszyn i urządzeń</span>
                        </li>
                        <li className="flex gap-4 text-gray-300 text-base md:text-lg items-center">
                            <CheckCircle className="text-industrial-accent shrink-0" size={24} />
                            <span>Pomiary i instalacje elektryczne</span>
                        </li>
                         <li className="flex gap-4 text-gray-300 text-base md:text-lg items-center">
                            <CheckCircle className="text-industrial-accent shrink-0" size={24} />
                            <span>Szkolenia branżowe i doradztwo techniczne</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};