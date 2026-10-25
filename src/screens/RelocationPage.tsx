import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ArrowRight } from 'lucide-react';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';
import {
  MachineRelocationIcon,
  CraneTruckIcon,
  CheckMarkIcon,
} from '../components/icons/IndustrialIcons';

type RelocationPageProps = {
  companyData?: CompanyData;
};

export const RelocationPage: React.FC<RelocationPageProps> = ({ companyData }) => {
  const resolvedCompany = companyData ?? company;
  const basePath = resolvedCompany.links.basePath;

  const steps = [
    {
      title: 'Demontaż i odłączenie',
      desc: 'Bezpieczny demontaż mechaniczny, odłączenie instalacji elektrycznych, hydrauliki i mediów technologicznych.',
    },
    {
      title: 'Wyprowadzenie i załadunek',
      desc: 'Przemieszczanie gabarytów na hali z użyciem systemu VersaLift, rolek transportowych, trawersów i własnych żurawi.',
    },
    {
      title: 'Transport specjalistyczny',
      desc: 'Bezpieczny przewóz maszyn wewnątrz zakładu lub transport drogowy do nowej lokalizacji w Polsce i Europie.',
    },
    {
      title: 'Rozładunek i wprowadzenie',
      desc: 'Precyzyjne operacje dźwigowe i ustawienie urządzeń na stanowiskach docelowych zgodnie z layoutem technologicznym.',
    },
    {
      title: 'Montaż i poziomowanie',
      desc: 'Kotwienie, precyzyjne wypoziomowanie linii, ponowny montaż podzespołów oraz podłączenie instalacji zasilających.',
    },
    {
      title: 'Rozruch technologiczny',
      desc: 'Pomiary elektryczne, weryfikacja układów sterowania i bezpieczeństwa oraz udział w uruchomieniu produkcyjnym.',
    },
  ];

  const advantages = [
    'Własny park maszynowy (żurawie do 90 t, VersaLift, podesty, wózki) – brak pośredników',
    'Własny zespół elektryków, automatyków, spawaczy i monterów rurociągów',
    'Pełne uprawnienia UDT i SEP oraz certyfikowany system jakości ISO 9001:2015',
    'Realizacja prac w oknach serwisowych, weekendy i w systemie zmianowym',
  ];

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <PageHeader
        badge="Kompleksowa logistyka technologiczna"
        title="Relokacja maszyn i linii produkcyjnych"
        subtitle="Bezpieczne przenoszenie parku maszynowego – od pojedynczych centrów obróbczych i pras po kompletne linie technologiczne."
      />

      <section className="page-section">
        <div className="page-container">
          <div className="max-w-3xl mx-auto mb-14 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-industrial-900 border border-gray-800 text-industrial-accent">
              <MachineRelocationIcon size={28} />
            </div>
            <h2 className="section-title mb-4">
              Pełny proces relokacji <span className="text-industrial-accent">w 6 etapach</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Realizujemy przemieszczenia wewnątrzzakładowe oraz relokacje fabryk w Polsce i w
              Europie (w tym w Wielkiej Brytanii). Dzięki połączeniu własnego sprzętu ciężkiego i
              wielobranżowych brygad technicznych bierzemy odpowiedzialność za cały proces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {steps.map((step, index) => (
              <div
                key={index}
                className="offer-card group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-industrial-950 border border-gray-800 font-display text-xl font-bold text-industrial-accent group-hover:bg-industrial-accent group-hover:text-industrial-950 transition-colors">
                      0{index + 1}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Etap {index + 1}
                    </span>
                  </div>
                  <h3 className="card-title mb-2.5 group-hover:text-industrial-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Why Us + Rentals Cross-link */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-7 offer-card flex flex-col justify-between">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-5">
                  Dlaczego warto powierzyć relokację nam?
                </h2>
                <ul className="space-y-3.5">
                  {advantages.map((adv, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-200 text-sm sm:text-base"
                    >
                      <span className="h-6 w-6 rounded-md bg-industrial-950 border border-gray-800 flex items-center justify-center text-industrial-accent shrink-0 mt-0.5">
                        <CheckMarkIcon size={15} />
                      </span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 pt-6 border-t border-gray-800 flex flex-wrap items-center justify-between gap-4">
                <p className="text-sm text-gray-400">
                  Przygotowujemy harmonogram minimalizujący przestoje produkcyjne.
                </p>
                <a
                  href={`${basePath}/kontakt`}
                  className="bg-industrial-accent text-industrial-950 px-6 py-3 rounded-lg font-bold text-sm sm:text-base hover:bg-industrial-accentHover transition-colors"
                >
                  Wyceń relokację
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-gray-800 bg-industrial-900/70 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-industrial-accent">
                  <CraneTruckIcon size={18} />
                  <span>Zaplecze sprzętowe</span>
                </div>
                <h3 className="card-title mb-3">Potrzebujesz samego sprzętu dźwigowego?</h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                  Dysponujemy własnym parkiem maszynowym: żurawiami samochodowymi do 90 t,
                  specjalistycznym wózkiem VersaLift, podestami ruchomymi, ładowarkami i wózkami
                  widłowymi. Możesz wynająć u nas sprzęt również jako osobną usługę.
                </p>
              </div>
              <a
                href={`${basePath}/wynajem`}
                className="inline-flex items-center justify-center gap-2 bg-industrial-950 hover:bg-industrial-800 text-white font-bold px-6 py-3.5 rounded-lg transition-colors group border border-gray-700 hover:border-industrial-accent text-sm sm:text-base w-full sm:w-fit"
              >
                <span>Zobacz ofertę wynajmu maszyn</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          <ServiceInquiryCta
            title="Planujesz relokację maszyny, prasy albo całej linii produkcyjnej?"
            description="Prześlij wykaz urządzeń, orientacyjne gabaryty, lokalizację oraz planowany termin. Przygotujemy technologię przemieszczenia, dobór sprzętu i kompleksową wycenę."
            contactLabel="Poproś o wycenę relokacji"
          />
        </div>
      </section>
    </SiteSettingsProvider>
  );
};
