import React from 'react';
import { PageHeader } from '../components/PageHeader';

export const PortfolioPage: React.FC = () => {
  const categories = [
    {
      title: 'Wynajem maszyn i sprzętu',
      items: [
        'Projekty wsparcia prac na wysokości i transportu ciężkiego',
        'Wynajem żurawi i podestów z operatorem',
      ],
    },
    {
      title: 'Relokacje maszyn',
      items: [
        'Demontaż, transport i ponowny montaż urządzeń',
        'Uruchomienia po relokacji i wsparcie techniczne',
      ],
    },
    {
      title: 'UDT i serwis',
      items: [
        'Obsługa formalna rejestracji urządzeń',
        'Przeglądy konserwacyjne i przygotowanie do badań',
      ],
    },
    {
      title: 'Spawalnictwo i konstrukcje',
      items: [
        'Naprawy bieżące elementów stalowych',
        'Wykonawstwo konstrukcji od projektu po montaż',
      ],
    },
  ];

  return (
    <>
      <PageHeader
        title="Realizacje"
        subtitle="Przykładowe realizacje pokazujące nasz zakres kompetencji dla przemysłu i budownictwa."
        backgroundImage="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="page-section">
        <div className="page-container">
          <div className="max-w-4xl mx-auto text-center mb-14">
            <p className="text-xl text-gray-300 leading-relaxed">
              Rozbudowujemy sekcję portfolio o pełne case studies. Poniżej prezentujemy zakres typowych realizacji,
              które wykonujemy dla naszych klientów.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {categories.map((category) => (
              <article key={category.title} className="offer-card">
                <h2 className="text-2xl font-bold text-white mb-4">{category.title}</h2>
                <ul className="space-y-3 text-gray-300">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-industrial-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="offer-cta mb-10">
            <h3 className="text-2xl font-bold text-white mb-4">Sekcja do uzupełnienia z klientem</h3>
            <ul className="space-y-3 text-gray-300">
              <li>• Zdjęcia i galerie realizacji dla każdej kategorii usług</li>
              <li>• Krótkie case studies: zakres, rezultat, czas realizacji</li>
              <li>• Informacja o zasięgu realizacji (lokalnie/PL/zagranica)</li>
            </ul>
          </div>

          <div className="text-center">
            <a
              href="/multiserwis-uslugi/kontakt"
              className="inline-flex items-center justify-center bg-industrial-accent text-industrial-900 px-8 py-4 rounded-lg font-bold hover:bg-industrial-accentHover transition-colors"
            >
              Zapytaj o podobną realizację
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
