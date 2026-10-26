import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { company } from '../data/company';

export const TermsPage: React.FC = () => {
  return (
    <>
      <PageHeader
        badge="Dokumenty formalne"
        title="Regulamin serwisu"
        subtitle="Zasady korzystania ze strony internetowej i formularza zapytań ofertowych."
      />

      <section className="page-section">
        <div className="page-container">
          <div className="max-w-4xl mx-auto bg-industrial-900 border border-gray-800 rounded-2xl p-8 md:p-10 space-y-8 text-gray-300 leading-relaxed">
            <article>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">1. Postanowienia ogólne</h2>
              <p>
                Strona internetowa ma charakter informacyjno-ofertowy i służy prezentacji usług przemysłowych świadczonych przez firmę <strong>MULTISERWIS KUTNO SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ</strong> z siedzibą pod adresem: ul. Przemysłowa 2, 99-300 Kutno, wpisaną do rejestru przedsiębiorców KRS pod numerem: 0001160280, NIP: 7752676330, REGON: 541108550.
              </p>
            </article>

            <article>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">2. Zakres informacji handlowych</h2>
              <p>
                Informacje oraz parametry techniczne publikowane na stronie nie stanowią oferty handlowej w rozumieniu art. 66 § 1 Kodeksu cywilnego,
                lecz zaproszenie do zawarcia umowy. Szczegółowe warunki współpracy, stawki wynajmu oraz harmonogramy prac ustalane są indywidualnie w oparciu o wycenę.
              </p>
            </article>

            <article>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">3. Formularz zapytania ofertowego</h2>
              <p>
                Użytkownik korzystający z formularza kontaktowego zobowiązuje się do podawania prawdziwych danych kontaktowych oraz niewysyłania treści o charakterze bezprawnym.
                Odpowiedź na zapytanie ofertowe następuje w dni robocze, zazwyczaj w ciągu 24 godzin.
              </p>
            </article>

            <article>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">4. Prawa własności intelektualnej</h2>
              <p>
                Treści techniczne, zdjęcia realizacji, logotypy oraz elementy graficzne umieszczone w serwisie podlegają ochronie prawnej i nie mogą być
                kopiowane ani rozpowszechniane bez pisemnej zgody właściciela serwisu, poza przypadkami dozwolonego użytku.
              </p>
            </article>

            <article>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">5. Odpowiedzialność techniczna</h2>
              <p>
                Dokładamy należytej staranności, aby opisy usług i specyfikacje sprzętowe były aktualne, jednak zastrzegamy prawo do modyfikacji parku maszynowego
                oraz zakresu oferty bez wcześniejszego powiadomienia.
              </p>
            </article>

            <article>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">6. Dane kontaktowe</h2>
              <p>
                W sprawach formalnych i technicznych prosimy o kontakt pod adresem e-mail:{' '}
                <a href={`mailto:${company.email}`} className="text-industrial-accent hover:underline">{company.email}</a>.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};
