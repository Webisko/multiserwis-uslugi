import React from 'react';
import { PageHeader } from '../components/PageHeader';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Polityka Prywatności"
        subtitle="Informacje o przetwarzaniu danych osobowych i zasadach korzystania ze strony."
        backgroundImage="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="page-section">
        <div className="page-container">
          <div className="max-w-4xl mx-auto bg-industrial-900 border border-gray-800 rounded-2xl p-8 md:p-10 space-y-8 text-gray-300 leading-relaxed">
            <div className="bg-industrial-800 border border-gray-700 rounded-lg p-4 text-sm text-gray-300">
              Wersja robocza. Treść wymaga finalnej akceptacji klienta i ewentualnej konsultacji prawnej.
            </div>

            <article>
              <h2 className="text-2xl font-bold text-white mb-3">1. Administrator danych</h2>
              <p>
                Administratorem danych jest MULTISERWIS, ul. Siemieradzkiego 18, 99-300 Kutno,
                e-mail: multiserwis.kutno@gmail.com.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-white mb-3">2. Zakres i cel przetwarzania</h2>
              <p>
                Dane przekazane przez formularz kontaktowy przetwarzamy w celu obsługi zapytania,
                przygotowania oferty oraz kontaktu zwrotnego.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-white mb-3">3. Podstawa prawna</h2>
              <p>
                Podstawą przetwarzania jest zgoda użytkownika i/lub prawnie uzasadniony interes administratora,
                zgodnie z RODO.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-white mb-3">4. Okres przechowywania danych</h2>
              <p>
                Dane przechowujemy przez okres niezbędny do obsługi zapytania oraz przez czas wynikający
                z obowiązujących przepisów prawa.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-white mb-3">5. Prawa użytkownika</h2>
              <p>
                Użytkownik ma prawo do dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania,
                przenoszenia danych oraz wniesienia sprzeciwu.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-white mb-3">6. Kontakt</h2>
              <p>
                W sprawach dotyczących danych osobowych skontaktuj się: multiserwis.kutno@gmail.com.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};
