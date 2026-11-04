import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { MapPin, X, ZoomIn } from 'lucide-react';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';
import {
  fetchLivePortfolioItems,
  getDefaultSiteContent,
  type PortfolioItemPayload,
} from '../lib/siteContent';
import { CheckMarkIcon } from '../components/icons/IndustrialIcons';

type PortfolioPageProps = {
  companyData?: CompanyData;
  portfolioItems?: PortfolioItemPayload[];
};

type GalleryCategory = 'wszystkie' | 'wynajem' | 'konserwacja-utb' | 'instalacje-montaz' | 'spawalnictwo';

type GalleryImageItem = {
  src: string;
  category: 'wynajem' | 'konserwacja-utb' | 'instalacje-montaz' | 'spawalnictwo';
  title: string;
};

const galleryImages: GalleryImageItem[] = [
  // Wynajem i dźwigi (16)
  { src: '/images/realizacje/wynajem/20190802_184815.webp', category: 'wynajem', title: 'Praca żurawia samojezdnego przy montażu konstrukcji' },
  { src: '/images/realizacje/wynajem/20190419_081857.webp', category: 'wynajem', title: 'Operacja podnośnikiem koszowym na wysokości' },
  { src: '/images/realizacje/wynajem/20190601_125936.webp', category: 'wynajem', title: 'Podnośnik przegubowy w trakcie prac instalacyjnych' },
  { src: '/images/realizacje/wynajem/20190604_192601.webp', category: 'wynajem', title: 'Załadunek i transport osprzętu dźwigowego' },
  { src: '/images/realizacje/wynajem/20190703_195929.webp', category: 'wynajem', title: 'Wsparcie prac wysokościowych na obiekcie przemysłowym' },
  { src: '/images/realizacje/wynajem/20190731_173348.webp', category: 'wynajem', title: 'Prace montażowe z użyciem podestu nożycowego' },
  { src: '/images/realizacje/wynajem/20190805_190543.webp', category: 'wynajem', title: 'Manewrowanie sprzętem dźwigowym na placu budowy' },
  { src: '/images/realizacje/wynajem/20190806_062735.webp', category: 'wynajem', title: 'Podnoszenie i precyzyjne pozycjonowanie gabarytów' },
  { src: '/images/realizacje/wynajem/20190813_083236.webp', category: 'wynajem', title: 'Prace serwisowe żurawiem kołowym' },
  { src: '/images/realizacje/wynajem/20190918_160253.webp', category: 'wynajem', title: 'Obsługa logistyczna relokacji maszyn' },
  { src: '/images/realizacje/wynajem/20190919_162645.webp', category: 'wynajem', title: 'Rozładunek elementów konstrukcyjnych' },
  { src: '/images/realizacje/wynajem/20190919_163938.webp', category: 'wynajem', title: 'Podejmowanie ciężkich elementów stalowych' },
  { src: '/images/realizacje/wynajem/20200225_123839.webp', category: 'wynajem', title: 'Praca żurawia samochodowego w ciasnej zabudowie' },
  { src: '/images/realizacje/wynajem/20200225_123923.webp', category: 'wynajem', title: 'Ustawianie urządzeń na dachu hali' },
  { src: '/images/realizacje/wynajem/20200225_123945.webp', category: 'wynajem', title: 'Montaż instalacji dachowych z kosza podnośnika' },
  { src: '/images/realizacje/wynajem/20200225_124446.webp', category: 'wynajem', title: 'Bezpieczny transport elementów na wysokość' },

  // Dozór i konserwacja UTB (8)
  { src: '/images/realizacje/konserwacja-utb/20200516_093813.webp', category: 'konserwacja-utb', title: 'Przegląd techniczny wózka widłowego przed odbiorem UDT' },
  { src: '/images/realizacje/konserwacja-utb/20190907_102251.webp', category: 'konserwacja-utb', title: 'Weryfikacja układów hydraulicznych i układu jezdnego' },
  { src: '/images/realizacje/konserwacja-utb/20200516_093828.webp', category: 'konserwacja-utb', title: 'Konserwacja wideł i łańcuchów masztu UTB' },
  { src: '/images/realizacje/konserwacja-utb/20200709_144538.webp', category: 'konserwacja-utb', title: 'Asysta konserwatorska podczas badania okresowego' },
  { src: '/images/realizacje/konserwacja-utb/20200910_163129.webp', category: 'konserwacja-utb', title: 'Przygotowanie dokumentacji i rewizja techniczna' },
  { src: '/images/realizacje/konserwacja-utb/20200910_163548.webp', category: 'konserwacja-utb', title: 'Pomiary rezystancji i stanu zabezpieczeń elektrycznych' },
  { src: '/images/realizacje/konserwacja-utb/20201130_090323.webp', category: 'konserwacja-utb', title: 'Przegląd okresowy floty podestów roboczych' },
  { src: '/images/realizacje/konserwacja-utb/20201130_095237.webp', category: 'konserwacja-utb', title: 'Wpis do księgi rewizyjnej po pozytywnej decyzji UDT' },

  // Montaż przemysłowy i instalacje (6)
  { src: '/images/realizacje/instalacje-montaz/20190612_133513.webp', category: 'instalacje-montaz', title: 'Montaż rurociągów technologicznych ze stali nierdzewnej' },
  { src: '/images/realizacje/instalacje-montaz/20190612_113056.webp', category: 'instalacje-montaz', title: 'Prowadzenie magistrali instalacyjnej pod stropem hali' },
  { src: '/images/realizacje/instalacje-montaz/20190612_124935.webp', category: 'instalacje-montaz', title: 'Połączenia kołnierzowe i zawory przemysłowe' },
  { src: '/images/realizacje/instalacje-montaz/20200501_112012.webp', category: 'instalacje-montaz', title: 'Montaż podestów technologicznych i dróg transportowych' },
  { src: '/images/realizacje/instalacje-montaz/20200501_195315.webp', category: 'instalacje-montaz', title: 'Podłączenie mediów technologicznych do maszyn' },
  { src: '/images/realizacje/instalacje-montaz/20200704_110726.webp', category: 'instalacje-montaz', title: 'Integracja mechaniczna linii produkcyjnej' },

  // Spawalnictwo i konstrukcje (2)
  { src: '/images/realizacje/spawalnictwo/20190608_123445.webp', category: 'spawalnictwo', title: 'Spawanie konstrukcji wsporczej metodą TIG' },
  { src: '/images/realizacje/spawalnictwo/20200501_193257.webp', category: 'spawalnictwo', title: 'Prefabrykacja i łączenie elementów stalowych MIG/MAG' },
];

const categoryTabs: { key: GalleryCategory; label: string; count: number }[] = [
  { key: 'wszystkie', label: 'Wszystkie', count: 32 },
  { key: 'wynajem', label: 'Dźwigi i wynajem', count: 16 },
  { key: 'konserwacja-utb', label: 'Dozór i konserwacja UDT', count: 8 },
  { key: 'instalacje-montaz', label: 'Montaż i instalacje', count: 6 },
  { key: 'spawalnictwo', label: 'Konstrukcje i spawalnictwo', count: 2 },
];

const defaultPortfolioItems = getDefaultSiteContent().portfolio.items;

const PortfolioContent: React.FC<{ initialItems: PortfolioItemPayload[] }> = ({ initialItems }) => {
  const [items, setItems] = useState<PortfolioItemPayload[]>(initialItems);
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('wszystkie');
  const [selectedImage, setSelectedImage] = useState<GalleryImageItem | null>(null);

  useEffect(() => {
    void fetchLivePortfolioItems().then((fresh) => {
      if (fresh) {
        setItems(fresh.items);
      }
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  const filteredImages =
    activeCategory === 'wszystkie'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <>
      <PageHeader
        badge="Doświadczenie w praktyce"
        title="Przykładowe realizacje"
        subtitle="Przekrój realizowanych przez nas prac dźwigowych, relokacyjnych, spawalniczych, instalacyjnych oraz serwisowych UDT."
      />

      <section className="page-section">
        <div className="page-container">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
            <h2 className="section-title mb-4">
              Kompetencje potwierdzone <span className="text-industrial-accent">na obiektach</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Realizujemy zadania dla zakładów produkcyjnych, centrów logistycznych oraz generalnych
              wykonawców w całej Polsce i w Europie.
            </p>
          </div>

          {/* 4 Featured Case Studies Cards */}
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="offer-card flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {item.imageUrl ? (
                      <div className="-mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 h-60 sm:h-64 overflow-hidden border-b border-gray-800 bg-industrial-950">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    ) : null}

                    <div className="mb-3.5 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
                      <span className="rounded-lg bg-industrial-accent/15 border border-industrial-accent/30 px-3 py-1 text-industrial-accent">
                        {item.category}
                      </span>
                      {item.location ? (
                        <span className="inline-flex items-center gap-1 rounded-lg border border-gray-800 bg-industrial-950/80 px-3 py-1 text-gray-300">
                          <MapPin size={12} className="text-industrial-accent" />
                          <span>{item.location}</span>
                        </span>
                      ) : null}
                    </div>

                    <h3 className="card-title mb-3">{item.title}</h3>
                    {item.description ? (
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-5">
                        {item.description}
                      </p>
                    ) : null}

                    <ul className="space-y-2.5 text-sm sm:text-base text-gray-200">
                      {item.items.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <CheckMarkIcon
                            size={16}
                            className="text-industrial-accent shrink-0 mt-1"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {/* Interactive Photo Gallery Section */}
          <div className="border-t border-gray-800 pt-16 mb-16">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="badge-industrial mb-3 inline-block">Dokumentacja fotograficzna</span>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight mb-3">
                Galeria zdjęć z realizacji
              </h2>
              <p className="text-sm sm:text-base text-gray-300">
                Prawdziwe ujęcia z prac w halach przemysłowych, rozładunków żurawiem, montaży rurociągów oraz przeglądów technicznych UDT.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
              {categoryTabs.map((tab) => {
                const isActive = activeCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveCategory(tab.key)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-industrial-accent text-industrial-950 shadow-lg shadow-industrial-accent/20'
                        : 'bg-industrial-900 border border-gray-800 text-gray-300 hover:border-gray-700 hover:text-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-md ${
                        isActive ? 'bg-industrial-950/20 text-industrial-950' : 'bg-industrial-950 text-gray-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredImages.map((img) => (
                <div
                  key={img.src}
                  onClick={() => setSelectedImage(img)}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-800 bg-industrial-950 aspect-[4/3] transition-all duration-300 hover:border-industrial-accent/50 hover:shadow-xl hover:shadow-industrial-accent/5"
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-industrial-950/90 via-industrial-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <p className="text-xs font-semibold text-white line-clamp-2 leading-snug">
                      {img.title}
                    </p>
                    <div className="mt-1 flex items-center gap-1 text-[11px] text-industrial-accent font-semibold">
                      <ZoomIn size={12} />
                      <span>Powiększ zdjęcie</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ServiceInquiryCta
            title="Planujesz podobne zadanie w swoim zakładzie?"
            description="Opisz swój projekt, wymagany sprzęt lub zakres prac instalacyjno-relokacyjnych. Przedstawimy referencyjne podejście i przygotujemy dopasowaną wycenę."
            contactLabel="Zapytaj o wycenę realizacji"
          />
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-industrial-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-800 px-5 py-3.5 bg-industrial-950">
              <span className="text-xs sm:text-sm font-semibold text-gray-200 truncate pr-4">
                {selectedImage.title}
              </span>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="text-gray-400 hover:text-white rounded-lg p-1 hover:bg-industrial-800 transition-colors shrink-0"
                aria-label="Zamknij podgląd"
              >
                <X size={20} />
              </button>
            </div>
            <div className="max-h-[75vh] flex items-center justify-center bg-black">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  companyData,
  portfolioItems = defaultPortfolioItems,
}) => {
  const resolvedCompany = companyData ?? company;

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <PortfolioContent initialItems={portfolioItems} />
    </SiteSettingsProvider>
  );
};
