import React from 'react';
import { Activity, Cable, ArrowRight, ExternalLink } from 'lucide-react';
import { useCompanyData } from '../data/company';
import {
  SwitchgearPowerIcon,
  CheckMarkIcon,
  TechnicalCertIcon,
} from './icons/IndustrialIcons';

export const ElectricalSection: React.FC = () => {
  const company = useCompanyData();
  const basePath = company.links.basePath;

  return (
    <section id="elektryka" className="page-section border-b border-gray-800/80">
      <div className="page-container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="mb-4">
              <span className="section-badge">
                <SwitchgearPowerIcon size={15} />
                <span>Energetyka przemysłowa i AKPiA</span>
              </span>
            </div>
            <h2 className="section-title mb-4">
              Usługi <span className="text-industrial-accent">elektryczne i rozruchowe</span>
            </h2>
            <p className="section-lead">
              Specjalizujemy się w pracach na czynnych obiektach przemysłowych. Realizujemy
              kompleksowe uruchomienia, pomiary odbiorcze i okresowe oraz montaże instalacji nn, SN
              i WN bez zatrzymywania produkcji.
            </p>
          </div>

          <a
            href={`${basePath}/elektryka`}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-industrial-accent hover:text-white transition-colors shrink-0 group"
          >
            <span>Pełny zakres usług elektrycznych</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Column 1: Commissioning */}
          <div className="offer-card">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 shrink-0 bg-industrial-800 rounded-xl flex items-center justify-center text-industrial-accent border border-gray-700/80">
                <Activity size={24} />
              </div>
              <h3 className="card-title">Uruchomienia, pomiary i rozruch</h3>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-white text-base sm:text-lg font-bold mb-3 border-l-4 border-industrial-accent pl-3">
                  Prace kontrolno-pomiarowe
                </h4>
                <ul className="space-y-2.5 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <CheckMarkIcon size={17} className="text-industrial-accent shrink-0 mt-1" />
                    <span>Parametryzacja urządzeń i nadzory nad montażem aparatury</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckMarkIcon size={17} className="text-industrial-accent shrink-0 mt-1" />
                    <span>Testy i uruchomienia rozdzielnic nn oraz SN</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckMarkIcon size={17} className="text-industrial-accent shrink-0 mt-1" />
                    <span>
                      Pomiary transformatorów, silników, kabli i ochrony przeciwporażeniowej
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckMarkIcon size={17} className="text-industrial-accent shrink-0 mt-1" />
                    <span>Testy zasilaczy UPS, baterii kondensatorów i szynoprzewodów</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckMarkIcon size={17} className="text-industrial-accent shrink-0 mt-1" />
                    <span>Rejestracja i analiza parametrów jakości energii elektrycznej</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white text-base sm:text-lg font-bold mb-3 border-l-4 border-industrial-accent pl-3">
                  Integracja i automatyka przemysłowa
                </h4>
                <ul className="space-y-2.5 text-gray-300 text-sm sm:text-base">
                  <li className="flex items-start gap-2.5">
                    <CheckMarkIcon size={17} className="text-industrial-accent shrink-0 mt-1" />
                    <span>
                      Konfiguracja protokołów: Profibus, Profinet, Modbus RTU/TCP, IEC 61850
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckMarkIcon size={17} className="text-industrial-accent shrink-0 mt-1" />
                    <span>Testy sygnałowe dla urządzeń elektrycznych i aparatury AKPiA</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckMarkIcon size={17} className="text-industrial-accent shrink-0 mt-1" />
                    <span>Udział w podaniu napięcia, ruch próbny i protokoły odbiorowe</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Column 2: Installation */}
          <div className="offer-card flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 shrink-0 bg-industrial-800 rounded-xl flex items-center justify-center text-industrial-accent border border-gray-700/80">
                  <Cable size={24} />
                </div>
                <h3 className="card-title">Prace elektroinstalacyjne na obiektach</h3>
              </div>

              <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                Realizujemy montaże na nowych obiektach oraz modernizacje istniejącej infrastruktury
                w Polsce i za granicą (w tym w Wielkiej Brytanii). Pracujemy w systemie zmianowym,
                aby zachować pełną ciągłość zasilania i produkcji.
              </p>

              <ul className="space-y-3">
                {[
                  'Montaż tras kablowych (stal nierdzewna, ocynk ogniowy, tworzywa)',
                  'Systemy kablowe WN, SN i nn wraz z mufowaniem i głowicami',
                  'Instalacje uziemienia, odgromowe i połączeń wyrównawczych',
                  'Kompletne instalacje oświetlenia podstawowego i awaryjnego',
                  'Instalacje słaboprądowe, sterownicze i pomiarowe',
                  'Dokumentacja powykonawcza i pomiary odbiorcze',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-gray-300 text-sm sm:text-base">
                    <CheckMarkIcon size={17} className="text-industrial-accent shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SEP Training Box inside column */}
            <div className="mt-8 pt-6 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-lg bg-industrial-accent/15 flex items-center justify-center text-industrial-accent">
                  <TechnicalCertIcon size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm sm:text-base">
                    Potrzebujesz uprawnień SEP?
                  </h4>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    Kursy i egzaminy: G1 (elektryczne), G2 (energetyczne), G3 (gazowe).
                  </p>
                </div>
              </div>
              <a
                href={company.links.trainingSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zobacz ofertę szkoleń SEP dla instalatorów i operatorów"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-industrial-accent hover:text-white transition-colors whitespace-nowrap"
              >
                <span>Szkolenia SEP</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
