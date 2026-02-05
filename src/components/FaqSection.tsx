import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqData = [
  {
    category: "Ogólne",
    questions: [
      {
        q: "Na jakim obszarze działacie?",
        a: "Realizujemy zlecenia na terenie całej Polski, a w przypadku relokacji maszyn i dużych projektów elektroinstalacyjnych również za granicą (UE, Wielka Brytania)."
      },
      {
        q: "Czy obsługujecie klientów indywidualnych?",
        a: "Tak, obsługujemy zarówno duże zakłady przemysłowe, jak i mniejsze firmy oraz klientów indywidualnych."
      }
    ]
  },
  {
    category: "Wynajem Maszyn",
    questions: [
      {
        q: "Czy sprzęt można wynająć z operatorem?",
        a: "Tak, podnośniki koszowe, żurawie i ładowarki teleskopowe wynajmujemy z doświadczonym operatorem. Wózki widłowe również - na życzenie klienta."
      },
      {
        q: "Czy transport sprzętu jest w cenie?",
        a: "Koszt transportu ustalany jest indywidualnie w zależności od odległości i gabarytów maszyny. Skontaktuj się z nami po wycenę."
      }
    ]
  },
  {
    category: "Usługi UDT",
    questions: [
      {
        q: "Czy pomożecie w rejestracji urządzenia w UDT bez dokumentacji?",
        a: "Tak. Oferujemy odtworzenie dokumentacji i pełną obsługę formalną, aż do uzyskania decyzji zezwalającej na eksploatację."
      },
      {
        q: "Jak często trzeba robić przeglądy?",
        a: "Zależy to od typu urządzenia (zazwyczaj co 30, 60 lub 90 dni dla konserwacji i rok dla badań okresowych). Przypominamy naszym klientom o terminach."
      }
    ]
  },
  {
    category: "Elektryka i Spawanie",
    questions: [
      {
        q: "Czy wykonujecie prace na czynnych obiektach?",
        a: "Tak, specjalizujemy się w pracach na ruchu. Pracujemy w systemie zmianowym (również nocnym/weekendowym), aby nie zakłócać produkcji."
      },
      {
        q: "Czy spawacie u klienta?",
        a: "Tak, posiadamy mobilny sprzęt spawalniczy. Wykonujemy naprawy bezpośrednio na terenie zakładu klienta."
      }
    ]
  }
];

interface AccordionItemProps {
  q: string;
  a: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left group"
      >
        <span className={`font-medium text-lg md:text-xl transition-colors ${isOpen ? 'text-industrial-accent' : 'text-gray-200 group-hover:text-white'}`}>
          {q}
        </span>
        <span className={`p-1.5 rounded-full border transition-colors ${isOpen ? 'border-industrial-accent text-industrial-accent' : 'border-gray-600 text-gray-400 group-hover:border-white'}`}>
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-300 pb-6 text-base md:text-lg leading-relaxed border-l-2 border-industrial-accent pl-5 ml-1.5 mb-2 max-w-2xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-24 bg-industrial-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-industrial-800 rounded-full text-gray-300 text-base font-bold mb-6">
              <HelpCircle size={20} />
              <span>Baza Wiedzy</span>
            </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            Często Zadawane <span className="text-industrial-accent">Pytania</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {faqData.map((section, idx) => (
            <div key={idx} className="bg-industrial-800 rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-industrial-accent"></span>
                {section.category}
              </h3>
              <div>
                {section.questions.map((item, i) => (
                  <AccordionItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};