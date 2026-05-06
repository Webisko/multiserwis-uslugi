import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Plus, Minus, Search } from 'lucide-react';
import { ServiceInquiryCta } from '../components/ServiceInquiryCta';
import { company, type CompanyData, SiteSettingsProvider } from '../data/company';
import type { FaqItemPayload } from '../lib/siteContent';

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
  const resolvedCompany = companyData ?? company;
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Wszystkie');

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFaqs = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Wszystkie' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <PageHeader 
        title="Centrum Pomocy" 
        subtitle="Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące naszych usług."
      />

      <section className="py-20 bg-industrial-950">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Search & Filter */}
          <div className="mb-12">
             <div className="relative mb-8">
                <input 
                  type="text" 
                  placeholder="Szukaj pytań..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-industrial-900 border border-gray-800 rounded-lg py-4 px-12 text-white placeholder-gray-500 focus:outline-none focus:border-industrial-accent transition-colors"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
             </div>

             <div className="flex flex-wrap gap-2 justify-center">
                {categories.map(cat => (
                   <button
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                       activeCategory === cat 
                         ? 'bg-industrial-accent text-industrial-900' 
                         : 'bg-industrial-900 text-gray-400 hover:text-white'
                     }`}
                   >
                      {cat}
                   </button>
                ))}
             </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
             {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item) => (
                   <div key={item.id} className="bg-industrial-900 border border-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-gray-700">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                      >
                         <span className="font-bold text-lg text-white pr-4">{item.question}</span>
                         <div className={`shrink-0 text-industrial-accent transition-transform duration-300 ${openItems[item.id] ? 'rotate-180' : ''}`}>
                            {openItems[item.id] ? <Minus size={20} /> : <Plus size={20} />}
                         </div>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openItems[item.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                         <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-gray-800/50 pt-4">
                            {item.answer}
                         </div>
                      </div>
                   </div>
                ))
             ) : (
                <div className="text-center py-12 text-gray-500">
                   Nie znaleziono pytań pasujących do wyszukiwania.
                </div>
             )}
          </div>

          <div className="mt-12">
            <ServiceInquiryCta
              title="Nie znalazłeś odpowiedzi dopasowanej do swojego przypadku?"
              description="Wyślij krótki opis sytuacji, urządzenia albo zakresu prac. Skierujemy zapytanie do właściwej osoby i wrócimy z konkretną odpowiedzią lub wyceną."
              contactLabel="Zadaj pytanie o usługę"
            />
          </div>

        </div>
      </section>
    </SiteSettingsProvider>
  );
};
