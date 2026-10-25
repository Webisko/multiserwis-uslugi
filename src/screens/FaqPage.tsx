import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Plus, Minus, Search } from 'lucide-react';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';
import { useLiveCompanyData, type CompanyData, SiteSettingsProvider } from '../data/company';
import { fetchLiveFaqs, type FaqItemPayload } from '../lib/siteContent';

const fallbackFaqItems: FaqItemPayload[] = [];
const fallbackCategories = ['Wszystkie'];

type FaqPageProps = {
  companyData?: CompanyData;
  faqItems?: FaqItemPayload[];
  categories?: string[];
};

export const FaqPage: React.FC<FaqPageProps> = ({
  companyData,
  faqItems = fallbackFaqItems,
  categories = fallbackCategories,
}) => {
  const resolvedCompany = useLiveCompanyData(companyData);
  const [liveItems, setLiveItems] = useState<FaqItemPayload[]>(faqItems);
  const [liveCategories, setLiveCategories] = useState<string[]>(categories);
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Wszystkie');

  useEffect(() => {
    void fetchLiveFaqs().then((fresh) => {
      if (fresh && fresh.items.length > 0) {
        setLiveItems(fresh.items);
        setLiveCategories(fresh.categories);
      }
    });
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = liveItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Wszystkie' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const sanitizedCategories = Array.from(
    new Set(['Wszystkie', ...liveCategories.filter((cat) => Boolean(cat) && cat !== 'Wszystkie')])
  );

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <PageHeader
        badge="Baza wiedzy technicznej"
        title="Często zadawane pytania (FAQ)"
        subtitle="Znajdź szybkie odpowiedzi na pytania dotyczące wynajmu sprzętu, badań UDT, relokacji maszyn i pracy na czynnych obiektach."
      />

      <section className="page-section">
        <div className="page-container max-w-4xl">
          {/* Search & Filter */}
          <div className="mb-10">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Wpisz szukane zagadnienie (np. operator, UDT, transport, spawanie)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Szukaj w pytaniach i odpowiedziach"
                className="w-full bg-industrial-900 border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-industrial-accent transition-colors text-base"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {sanitizedCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-industrial-accent text-industrial-950'
                      : 'bg-industrial-900 border border-gray-800 text-gray-300 hover:border-gray-600 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-3.5 mb-14">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item) => {
                const isOpen = Boolean(openItems[item.id]);
                return (
                  <div
                    key={item.id}
                    className="bg-industrial-900 border border-gray-800 rounded-xl overflow-hidden transition-colors hover:border-gray-700"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left focus:outline-none cursor-pointer"
                    >
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-industrial-accent block mb-1">
                          {item.category}
                        </span>
                        <h2 className="font-semibold text-base sm:text-lg text-white">
                          {item.question}
                        </h2>
                      </div>
                      <span
                        className={`p-1.5 rounded-lg border shrink-0 transition-colors ${
                          isOpen
                            ? 'border-industrial-accent bg-industrial-accent/10 text-industrial-accent'
                            : 'border-gray-700 text-gray-400'
                        }`}
                      >
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-gray-800/60">
                        {item.answer}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 bg-industrial-900 rounded-xl border border-gray-800 text-gray-400">
                Nie znaleziono pytań pasujących do wpisanego hasła.
              </div>
            )}
          </div>

          <ServiceInquiryCta
            title="Nie znalazłeś odpowiedzi dopasowanej do swojego zadania?"
            description="Wyślij krótki opis urządzenia, instalacji albo planowanych prac. Skierujemy pytanie bezpośrednio do właściwego specjalisty i wrócimy z konkretną informacją."
            contactLabel="Zadaj pytanie techniczne"
          />
        </div>
      </section>
    </SiteSettingsProvider>
  );
};
