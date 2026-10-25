import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Phone, ArrowRight, ExternalLink } from 'lucide-react';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';
import {
  ScissorLiftIcon,
  CraneTruckIcon,
  ForkliftTelehandlerIcon,
  RiggingGearIcon,
  CheckMarkIcon,
  TechnicalCertIcon,
} from '../components/icons/IndustrialIcons';

type RentalsPageProps = {
  companyData?: CompanyData;
};

export const RentalsPage: React.FC<RentalsPageProps> = ({ companyData }) => {
  const resolvedCompany = companyData ?? company;
  const basePath = resolvedCompany.links.basePath;

  const popularEquipment = [
    { label: 'Podesty nożycowe do 18 m', href: '#podesty', icon: <ScissorLiftIcon size={20} /> },
    { label: 'Podnośniki koszowe na pojeździe', href: '#podesty', icon: <ScissorLiftIcon size={20} /> },
    { label: 'Żurawie 35 t, 45 t, 60 t, 90 t', href: '#zurawie', icon: <CraneTruckIcon size={20} /> },
    { label: 'Ładowarki teleskopowe', href: '#ladowarki', icon: <ForkliftTelehandlerIcon size={20} /> },
    { label: 'Wózki widłowe i VersaLift', href: '#specjalistyczne', icon: <RiggingGearIcon size={20} /> },
  ];

  const categories = [
    {
      id: 'podesty',
      title: 'Podesty ruchome i podnośniki',
      icon: <ScissorLiftIcon size={26} />,
      items: [
        'Podesty nożycowe do 18 m wysokości roboczej',
        'Podnośniki przegubowe elektryczne i spalinowe',
        'Podesty teleskopowe elektryczne i spalinowe',
        'Podnośniki koszowe (podesty montowane na pojeździe)',
      ],
      description:
        'Sprawdzone urządzenia do prac montażowych, instalacyjnych i konserwacyjnych na wysokościach – wewnątrz hal oraz w terenie.',
    },
    {
      id: 'zurawie',
      title: 'Żurawie (dźwigi samochodowe)',
      icon: <CraneTruckIcon size={26} />,
      items: [
        'Żuraw samochodowy o udźwigu 35 t',
        'Żuraw samochodowy o udźwigu 45 t',
        'Żuraw samochodowy o udźwigu 60 t',
        'Żuraw samochodowy o udźwigu 90 t',
      ],
      description:
        'Wszechstronne żurawie samojezdne z doświadczoną obsługą operatorską do ciężkich prac budowlanych, montażowych i przeładunkowych.',
    },
    {
      id: 'ladowarki',
      title: 'Ładowarki teleskopowe i wózki widłowe',
      icon: <ForkliftTelehandlerIcon size={26} />,
      items: [
        'Ładowarki teleskopowe do prac budowlanych i przemysłowych',
        'Wózki jezdniowe podnośnikowe (widłowe) o różnych udźwigach',
      ],
      description:
        'Niezawodny sprzęt do rozładunków, logistyki wewnątrzzakładowej i transportu materiałów na placu budowy.',
    },
    {
      id: 'specjalistyczne',
      title: 'Sprzęt specjalistyczny i osprzęt pomocniczy',
      icon: <RiggingGearIcon size={26} />,
      items: [
        'Specjalistyczny sprzęt do relokacji ciężkich maszyn (m.in. VersaLift)',
        'Trawersy dźwigowe, zawiesia i rolki transportowe',
        'Przedłużki do wideł i osprzęt pomocniczy dobierany do zadania',
      ],
      description:
        'Osprzęt pomocniczy dobieramy indywidualnie do zakresu realizowanej usługi dźwigowej lub relokacyjnej.',
    },
  ];

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <PageHeader
        badge="Własny park maszynowy"
        title="Wynajem maszyn i dźwigów"
        subtitle="Niezawodny sprzęt dźwigowy, podnośnikowy i transportowy – regularnie serwisowany i gotowy do pracy w Twoim zakładzie."
      />

      <section className="page-section">
        <div className="page-container">
          {/* Most popular equipment bar */}
          <div className="mb-14 rounded-2xl border border-gray-800 bg-industrial-900 p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-industrial-accent mb-1">
                  Szybki wybór
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  Najczęściej zamawiany sprzęt
                </h2>
              </div>
              <p className="text-sm text-gray-300 max-w-md">
                Poza najpopularniejszymi jednostkami dobieramy również inne maszyny dopasowane do
                parametrów konkretnego zadania.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {popularEquipment.map((eq) => (
                <a
                  key={eq.label}
                  href={eq.href}
                  className="flex items-center gap-3 rounded-xl border border-gray-800 bg-industrial-950/80 p-3.5 text-sm font-medium text-gray-200 hover:border-industrial-accent/60 hover:text-white transition-colors group"
                >
                  <span className="text-industrial-accent shrink-0 group-hover:scale-110 transition-transform">
                    {eq.icon}
                  </span>
                  <span className="leading-snug">{eq.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* 4 Main Equipment Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            {categories.map((category) => (
              <article key={category.id} id={category.id} className="offer-card flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 shrink-0 rounded-xl bg-industrial-950 border border-gray-800 flex items-center justify-center text-industrial-accent">
                      {category.icon}
                    </div>
                    <h2 className="card-title">{category.title}</h2>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <ul className="space-y-3">
                    {category.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-200 text-sm sm:text-base">
                        <CheckMarkIcon
                          size={17}
                          className="text-industrial-accent shrink-0 mt-1"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {/* Cooperation Model & Training */}
          <div className="offer-cta relative overflow-hidden mb-12">
            <div
              className="absolute top-0 right-0 w-64 h-64 bg-industrial-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              <div className="lg:col-span-7">
                <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-5">
                  Elastyczny model wynajmu
                </h2>
                <div className="space-y-4 text-gray-300 text-sm sm:text-base">
                  <div className="flex items-start gap-3.5">
                    <span className="w-7 h-7 bg-industrial-950 border border-gray-800 rounded-lg flex items-center justify-center text-xs text-industrial-accent font-bold shrink-0 mt-0.5">
                      01
                    </span>
                    <p>
                      <strong className="text-white">Wynajem z operatorem:</strong> Podnośniki
                      koszowe, żurawie samochodowe oraz ładowarki teleskopowe udostępniamy wraz z
                      doświadczonym, uprawnionym operatorem.
                    </p>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <span className="w-7 h-7 bg-industrial-950 border border-gray-800 rounded-lg flex items-center justify-center text-xs text-industrial-accent font-bold shrink-0 mt-0.5">
                      02
                    </span>
                    <p>
                      <strong className="text-white">Wynajem bez operatora lub z obsługą:</strong>{' '}
                      Podesty ruchome nożycowe/przegubowe oraz wózki widłowe wynajmujemy do
                      samodzielnej pracy (na doby, tygodnie i miesiące) lub z operatorem na życzenie
                      klienta.
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4">
                  <a
                    href={`${basePath}/kontakt`}
                    className="inline-flex items-center justify-center gap-2 bg-industrial-accent text-industrial-950 px-7 py-3.5 rounded-lg font-bold hover:bg-industrial-accentHover transition-colors"
                  >
                    <Phone size={18} />
                    <span>Sprawdź dostępność sprzętu</span>
                  </a>
                  <a
                    href={`${basePath}/relokacja`}
                    className="inline-flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-gray-200 hover:text-industrial-accent transition-colors group"
                  >
                    <span>Szukasz pełnej relokacji maszyn?</span>
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 bg-industrial-950/90 p-6 sm:p-8 rounded-2xl border border-gray-800">
                <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-industrial-accent">
                  <TechnicalCertIcon size={18} />
                  <span>Ośrodek szkoleniowy</span>
                </div>
                <h3 className="card-title mb-3">Potrzebujesz uprawnień UDT?</h3>
                <p className="text-gray-300 text-sm sm:text-base mb-5 leading-relaxed">
                  Prowadzimy certyfikowane szkolenia dla operatorów i konserwatorów: wózki widłowe,
                  ładowarki teleskopowe, żurawie (samojezdne, HDS), podesty ruchome oraz suwnice.
                </p>
                <a
                  href={resolvedCompany.links.trainingSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-industrial-accent font-bold hover:text-white transition-colors text-sm sm:text-base"
                >
                  <span>Zobacz pełną ofertę szkoleń</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>

          <ServiceInquiryCta
            title="Potrzebujesz szybkiej wyceny wynajmu lub doboru dźwigu?"
            description="Podaj orientacyjną masę ładunku, wymagany wysięg lub wysokość roboczą oraz lokalizację. Dobierzemy optymalną maszynę, potwierdzimy dostępność i przygotujemy wycenę."
            contactLabel="Poproś o wycenę wynajmu"
            trainingTitle="Szkolenia UDT dla Twojego zespołu"
            trainingDescription="Jeżeli Twoi pracownicy potrzebują kwalifikacji do obsługi wózków, podestów ruchomych lub suwnic, sprawdź harmonogram kursów."
          />
        </div>
      </section>
    </SiteSettingsProvider>
  );
};
