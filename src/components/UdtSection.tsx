import React from 'react';
import { ClipboardCheck, FileText, Settings, ArrowRight, ExternalLink } from 'lucide-react';
import { useCompanyData } from '../data/company';
import { UdtHookShieldIcon, TechnicalCertIcon } from './icons/IndustrialIcons';

export const UdtSection: React.FC = () => {
  const company = useCompanyData();
  const basePath = company.links.basePath;

  const categories = [
    {
      title: 'Obsługiwane urządzenia UTB',
      items: [
        'Wózki jezdniowe podnośnikowe (widłowe)',
        'Podesty ruchome przejezdne (zwyżki nożycowe i koszowe)',
        'Żurawie samojezdne, przenośne HDS i leśne',
        'Windy załadowcze (burty samowyładowcze / windy samochodowe)',
        'Dźwigniki i podnośniki warsztatowe',
        'Hakowce, bramowce i naczepy do transportu pojazdów',
        'Suwnice, wciągniki i wciągarki ogólnego oraz specjalnego przeznaczenia',
      ],
    },
    {
      title: 'Zakres obsługi UDT i serwisu',
      items: [
        'Kompleksowa organizacja badań odbiorczych, okresowych i doraźnych',
        'Rejestracja urządzeń w UDT – również w przypadku braku dokumentacji',
        'Wykonywanie resursu i odtwarzanie dokumentacji techniczno-ruchowej',
        'Cykliczne przeglądy konserwacyjne z wpisem do dziennika konserwacji',
        'Diagnostyka i naprawa hydrauliki siłowej, elektryki oraz automatyki',
        'Analiza obowiązku dozoru technicznego i doradztwo przepisowe',
      ],
    },
  ];

  return (
    <section id="udt" className="page-section-alt border-b border-gray-800/80">
      <div className="page-container">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left Sticky Column */}
          <div className="lg:w-5/12 lg:sticky lg:top-28">
            <div className="mb-4">
              <span className="section-badge">
                <UdtHookShieldIcon size={15} />
                <span>Bezpieczeństwo i dozór techniczny</span>
              </span>
            </div>
            <h2 className="section-title mb-4">
              Konserwacja, serwis <span className="text-industrial-accent">i obsługa UDT</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
              Przejmujemy pełną odpowiedzialność formalną i techniczną za Twój park urządzeń
              transportu bliskiego: od odtworzenia dokumentacji i rejestracji, przez przeglądy
              konserwatorskie, aż po usuwanie awarii i udział w odbiorach z inspektorem UDT.
            </p>

            <div className="p-6 bg-industrial-950 rounded-xl border-l-4 border-industrial-accent border border-gray-800 mb-5">
              <h3 className="text-white text-base sm:text-lg font-bold mb-2 flex items-center gap-2.5">
                <FileText size={20} className="text-industrial-accent shrink-0" />
                <span>Brak dokumentacji urządzenia?</span>
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Odtwarzamy duplikaty DTR, wykonujemy obliczenia stopnia wykorzystania resursu i
                przeprowadzamy pełną procedurę rejestracyjną w UDT w Twoim imieniu.
              </p>
            </div>

            <div className="p-6 border border-gray-800 rounded-xl bg-industrial-950/70 mb-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-industrial-accent/15 flex items-center justify-center text-industrial-accent mt-0.5">
                    <TechnicalCertIcon size={20} />
                  </div>
                  <div>
                    <h3 className="text-white text-base font-bold">
                      Szkolenia UDT dla operatorów i konserwatorów
                    </h3>
                    <p className="text-sm text-gray-400 mt-0.5">
                      Wózki widłowe, podesty, suwnice, żurawie HDS oraz odnowienia uprawnień.
                    </p>
                  </div>
                </div>
                <a
                  href={company.links.trainingSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-industrial-accent text-sm font-bold hover:text-white inline-flex items-center gap-1.5 transition-colors shrink-0"
                >
                  <span>Kursy UDT</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>

            <a
              href={`${basePath}/udt`}
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-industrial-accent hover:text-white transition-colors group"
            >
              <span>Zobacz pełną ofertę serwisu i UDT</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right Cards Grid */}
          <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category, idx) => (
              <div
                key={idx}
                className="bg-industrial-950 rounded-2xl p-6 sm:p-8 border border-gray-800 hover:border-industrial-accent/40 transition-colors"
              >
                <h3 className="card-title mb-6 flex items-center gap-3">
                  <span className="h-10 w-10 shrink-0 rounded-lg bg-industrial-900 border border-gray-800 flex items-center justify-center text-industrial-accent">
                    {idx === 0 ? <Settings size={22} /> : <ClipboardCheck size={22} />}
                  </span>
                  <span>{category.title}</span>
                </h3>
                <ul className="space-y-3.5">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <span className="w-7 h-7 rounded-lg bg-industrial-900 flex items-center justify-center text-xs font-bold text-industrial-accent border border-gray-800 group-hover:bg-industrial-accent group-hover:text-industrial-950 transition-colors shrink-0 mt-0.5">
                        0{i + 1}
                      </span>
                      <span className="text-gray-300 text-sm sm:text-base leading-snug group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Hydraulics & Diagnostics Box */}
            <div className="md:col-span-2 bg-industrial-950 rounded-2xl p-6 sm:p-8 border border-gray-800 hover:border-industrial-accent/40 transition-colors">
              <h3 className="card-title mb-2">
                Kompleksowy serwis mechaniczny, hydrauliki siłowej i elektroniki
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Poza formalnościami i przeglądami UDT realizujemy bieżące naprawy maszyn:
                regenerację siłowników hydraulicznych, wymianę przewodów i uszczelnień, usuwanie
                wycieków, diagnostykę sterowania i czujników oraz renowację powłok antykorozyjnych.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
