import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';
import { useCompanyData } from '../data/company';
import { fetchLiveFaqs, type FaqGroupPayload } from '../lib/siteContent';

const fallbackFaqGroups: FaqGroupPayload[] = [];

interface AccordionItemProps {
  id: string;
  q: string;
  a: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ id, q, a }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-800 last:border-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        className="flex justify-between items-center gap-4 w-full py-4 text-left group cursor-pointer"
      >
        <span
          id={`faq-question-${id}`}
          className={`font-semibold text-base sm:text-lg transition-colors ${
            isOpen ? 'text-industrial-accent' : 'text-gray-200 group-hover:text-white'
          }`}
        >
          {q}
        </span>
        <span
          className={`p-1.5 rounded-lg border shrink-0 transition-colors ${
            isOpen
              ? 'border-industrial-accent bg-industrial-accent/10 text-industrial-accent'
              : 'border-gray-700 text-gray-400 group-hover:border-gray-500 group-hover:text-white'
          }`}
          aria-hidden="true"
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${id}`}
            role="region"
            aria-labelledby={`faq-question-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-gray-300 pb-5 text-sm sm:text-base leading-relaxed border-l-2 border-industrial-accent pl-4 ml-1 mb-2">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

type FaqSectionProps = {
  faqGroups?: FaqGroupPayload[];
};

export const FaqSection: React.FC<FaqSectionProps> = ({ faqGroups = fallbackFaqGroups }) => {
  const company = useCompanyData();
  const basePath = company.links.basePath;
  const [liveGroups, setLiveGroups] = useState<FaqGroupPayload[]>(faqGroups);

  useEffect(() => {
    void fetchLiveFaqs().then((fresh) => {
      if (fresh && fresh.featuredGroups.length > 0) {
        setLiveGroups(fresh.featuredGroups);
      }
    });
  }, []);

  if (liveGroups.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="page-section-alt border-b border-gray-800/80">
      <div className="page-container">
        <div className="text-center mb-12 md:mb-16">
          <div className="mb-4 flex justify-center">
            <span className="section-badge">
              <HelpCircle size={15} />
              <span>Baza wiedzy technicznej</span>
            </span>
          </div>
          <h2 className="section-title mb-4">
            Często zadawane <span className="text-industrial-accent">pytania</span>
          </h2>
          <p className="section-lead mx-auto">
            Sprawdź odpowiedzi na najczęstsze pytania dotyczące wynajmu sprzętu, przeglądów UDT,
            relokacji maszyn oraz realizacji prac na czynnych obiektach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {liveGroups.map((section) => (
            <div
              key={section.category}
              className="bg-industrial-950 rounded-2xl p-6 sm:p-8 border border-gray-800"
            >
              <h3 className="card-title mb-4 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-industrial-accent shrink-0" />
                <span>{section.category}</span>
              </h3>
              <div>
                {section.questions.map((item) => (
                  <AccordionItem key={item.id} id={item.id} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href={`${basePath}/faq`}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-industrial-accent hover:text-white transition-colors group"
          >
            <span>Zobacz wszystkie pytania w Centrum pomocy FAQ</span>
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
