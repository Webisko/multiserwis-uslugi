import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Plus, Minus, Search } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FaqPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Wszystkie');

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqData: FaqItem[] = [
    // General
    {
      id: 'gen-1',
      question: 'Jakimi usługami zajmuje się firma MULTISERWIS?',
      answer: 'Oferujemy kompleksowe usługi dla przemysłu: wynajem maszyn i sprzętu dźwigowego, usługi spawalnicze, relokację maszyn, konserwację urządzeń UDT, usługi elektryczne oraz budowlane. Dodatkowo prowadzimy szkolenia branżowe.',
      category: 'Ogólne'
    },
    {
      id: 'gen-2',
      question: 'Czy firma posiada certyfikaty i uprawnienia?',
      answer: 'Tak, posiadamy certyfikat ISO 9001:2015 wydany przez Polskie Centrum Akredytacji, potwierdzający najwyższe standardy jakości w 13 obszarach naszej działalności.',
      category: 'Ogólne'
    },
    // Rentals
    {
      id: 'rent-1',
      question: 'Czy sprzęt można wynająć z operatorem?',
      answer: 'Tak, podnośniki koszowe, żurawie i ładowarki teleskopowe wynajmujemy z doświadczonym operatorem. Inne urządzenia jak wózki widłowe również mogą być wynajęte z operatorem na życzenie.',
      category: 'Wynajem'
    },
    {
      id: 'rent-2',
      question: 'Jaki jest minimalny okres wynajmu?',
      answer: 'Wynajmujemy na doby, tygodnie i miesiące. W przypadku krótkoterminowych potrzeb, skontaktuj się z nami – postaramy się dostosować ofertę.',
      category: 'Wynajem'
    },
    // UDT
    {
      id: 'udt-1',
      question: 'Czy pomożecie w rejestracji urządzenia w UDT?',
      answer: 'Tak, oferujemy kompleksową obsługę formalną – od przygotowania dokumentacji (w tym odtwarzania), przez zgłoszenie urządzenia, aż po organizację badań UDT.',
      category: 'UDT'
    },
    {
      id: 'udt-2',
      question: 'Jak często należy wykonywać przeglądy UDT?',
      answer: 'Częstotliwość zależy od rodzaju urządzenia. Zazwyczaj jest to raz w roku. Nasz system przypomni Ci o zbliżającym się terminie.',
      category: 'UDT'
    },
    // Welding
    {
      id: 'weld-1',
      question: 'Czy wykonujecie spawanie na miejscu u klienta?',
      answer: 'Tak, dysponujemy mobilnym sprzętem spawalniczym i wykonujemy prace zarówno w naszej hali, jak i bezpośrednio u klienta.',
      category: 'Spawalnictwo'
    },
    // Electrical
    {
      id: 'elec-1',
      question: 'Czy wykonujecie prace elektryczne na czynnych obiektach?',
      answer: 'Tak, specjalizujemy się w pracach na obiektach przemysłowych. Możemy pracować w systemie zmianowym, aby zminimalizować wpływ na produkcję.',
      category: 'Elektryka'
    },
    // Contact
    {
      id: 'cont-1',
      question: 'Jak szybko odpowiadacie na zapytania?',
      answer: 'Odpowiadamy na zapytania w ciągu 24 godzin w dni robocze. W pilnych sprawach prosimy o kontakt telefoniczny.',
      category: 'Kontakt'
    }
  ];

  const categories = ['Wszystkie', 'Ogólne', 'Wynajem', 'UDT', 'Spawalnictwo', 'Elektryka', 'Kontakt'];

  const filteredFaqs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Wszystkie' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
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

        </div>
      </section>
    </>
  );
};
