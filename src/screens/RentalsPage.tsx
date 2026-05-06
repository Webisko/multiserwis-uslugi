import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Phone, CheckCircle, ArrowRight } from 'lucide-react';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';

type RentalsPageProps = {
  companyData?: CompanyData;
};

export const RentalsPage: React.FC<RentalsPageProps> = ({ companyData }) => {
  const resolvedCompany = companyData ?? company;
  const basePath = resolvedCompany.links.basePath;
  const categories = [
    {
      id: 'podesty',
      title: 'Podesty i podnośniki',
      items: [
        'Podesty nożycowe do 18 m wysokości roboczej',
        'Podnośniki przegubowe elektryczne i spalinowe',
        'Podesty teleskopowe elektryczne i spalinowe',
        'Podnośniki koszowe (montowane na pojeździe)',
      ],
      description: 'Idealne do prac na wysokościach, montaży i konserwacji.',
    },
    {
      id: 'zurawie',
      title: 'Żurawie (dźwigi samochodowe)',
      items: [
        'Udźwig 35t',
        'Udźwig 45t',
        'Udźwig 60t',
        'Udźwig 90t',
      ],
      description: 'Wszechstronne żurawie do ciężkich zadań budowlanych i przemysłowych.',
    },
    {
      id: 'ladowarki',
      title: 'Ładowarki i wózki',
      items: [
        'Ładowarki teleskopowe',
        'Wózki widłowe',
      ],
      description: 'Niezbędne w logistyce placu budowy i transporcie materiałów.',
    },
    {
      id: 'specjalistyczne',
      title: 'Osprzęt i sprzęt specjalistyczny',
      items: [
        'Osprzęt dźwigowy',
        'Specjalistyczny sprzęt (np. VersaLift)',
      ],
      description: 'Rozwiązania do zadań nietypowych i wymagających precyzji.',
    }
  ];

  return (
    <SiteSettingsProvider value={resolvedCompany}>

      <PageHeader 
        title="Wynajem Maszyn i Sprzętu" 
        subtitle="Niezawodny sprzęt dźwigowy i budowlany, gotowy do pracy dokładnie wtedy, gdy go potrzebujesz."
        backgroundImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="page-section">
        <div className="page-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {categories.map((category) => (
              <div key={category.id} id={category.id} className="offer-card">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-2 h-8 bg-industrial-accent rounded-sm"></span>
                  {category.title}
                </h3>
                <p className="text-gray-400 mb-6">{category.description}</p>
                <ul className="space-y-3">
                  {category.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-industrial-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="offer-cta relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-industrial-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Elastyczny model współpracy</h3>
                <div className="space-y-4 text-gray-300">
                  <p className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-industrial-800 rounded-full flex items-center justify-center text-industrial-accent font-bold shrink-0">1</span>
                    <span><strong>Z operatorem:</strong> Podnośniki koszowe, żurawie, ładowarki teleskopowe. Nasi operatorzy to doświadczeni fachowcy.</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-industrial-800 rounded-full flex items-center justify-center text-industrial-accent font-bold shrink-0">2</span>
                    <span><strong>Bez operatora:</strong> Wózki widłowe i inne urządzenia dostępne również do samodzielnej obsługi (wymagane uprawnienia).</span>
                  </p>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a href={`${basePath}/kontakt`} className="inline-flex items-center justify-center gap-2 bg-industrial-accent text-industrial-900 px-8 py-3 rounded font-bold hover:bg-industrial-accentHover transition-colors">
                    <Phone size={18} />
                    Sprawdź dostępność
                  </a>
                </div>
              </div>

              <div className="bg-industrial-800/50 p-8 rounded-xl border border-dashed border-gray-700">
                <h4 className="text-xl font-bold text-industrial-accent mb-4 flex items-center gap-2">
                  💡 Potrzebujesz uprawnień?
                </h4>
                <p className="text-gray-300 mb-6">
                  Oferujemy kompleksowe szkolenia UDT na wózki widłowe, ładowarki, żurawie i podesty ruchome. 
                  Zdobądź kwalifikacje u nas!
                </p>
                <a 
                  href={resolvedCompany.links.trainingSiteUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-medium hover:text-industrial-accent transition-colors group"
                >
                  Zobacz ofertę szkoleń
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <ServiceInquiryCta
              title="Potrzebujesz szybkiej wyceny wynajmu lub sprzętu z operatorem?"
              description="Przygotujemy dobór sprzętu, termin dostępności i warunki realizacji pod konkretne zadanie. Możemy też od razu wskazać wymagane uprawnienia dla operatora lub zespołu klienta."
              contactLabel="Poproś o wycenę wynajmu"
              trainingTitle="Szkolenia UDT dla operatorów"
              trainingDescription="Jeśli Twój zespół potrzebuje uprawnień na wózki, żurawie, ładowarki lub podesty, przejdź do dedykowanej oferty szkoleniowej."
            />
          </div>
        </div>
      </section>
    </SiteSettingsProvider>
  );
};
