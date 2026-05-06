import { readJsonSnapshot } from './previewSnapshots';

export type FaqItemPayload = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isFeatured: boolean;
};

export type FaqGroupPayload = {
  category: string;
  questions: Array<{
    id: string;
    q: string;
    a: string;
  }>;
};

export type ServiceOfferingPayload = {
  id: string;
  slug: string;
  title: string;
  description: string;
  items: string[];
  pagePath?: string | null;
  contactLabel: string;
  training: {
    text: string;
    linkText: string;
  } | null;
  isFeatured: boolean;
  sortOrder: number;
};

export type SiteContentData = {
  faqs: {
    items: FaqItemPayload[];
    categories: string[];
    featuredGroups: FaqGroupPayload[];
  };
  services: {
    items: ServiceOfferingPayload[];
    contactOptions: string[];
  };
};

const defaultFaqItems: FaqItemPayload[] = [
  {
    id: 'faq-1',
    question: 'Na jakim obszarze działacie?',
    answer:
      'Realizujemy zlecenia na terenie całej Polski, a w przypadku relokacji maszyn i dużych projektów elektroinstalacyjnych również za granicą.',
    category: 'Ogólne',
    sortOrder: 10,
    isFeatured: true,
  },
  {
    id: 'faq-2',
    question: 'Czy obsługujecie klientów indywidualnych?',
    answer:
      'Tak, obsługujemy zarówno duże zakłady przemysłowe, jak i mniejsze firmy oraz klientów indywidualnych.',
    category: 'Ogólne',
    sortOrder: 20,
    isFeatured: true,
  },
  {
    id: 'faq-3',
    question: 'Czy sprzęt można wynająć z operatorem?',
    answer:
      'Tak, podnośniki koszowe, żurawie i ładowarki teleskopowe wynajmujemy z doświadczonym operatorem. Wózki widłowe również na życzenie klienta.',
    category: 'Wynajem',
    sortOrder: 30,
    isFeatured: true,
  },
  {
    id: 'faq-4',
    question: 'Czy transport sprzętu jest w cenie?',
    answer:
      'Koszt transportu ustalany jest indywidualnie w zależności od odległości i gabarytów maszyny.',
    category: 'Wynajem',
    sortOrder: 40,
    isFeatured: true,
  },
  {
    id: 'faq-5',
    question: 'Czy pomożecie w rejestracji urządzenia w UDT bez dokumentacji?',
    answer:
      'Tak. Oferujemy odtworzenie dokumentacji i pełną obsługę formalną, aż do uzyskania decyzji zezwalającej na eksploatację.',
    category: 'UDT',
    sortOrder: 50,
    isFeatured: true,
  },
  {
    id: 'faq-6',
    question: 'Jak często trzeba robić przeglądy UDT?',
    answer:
      'Zależy to od typu urządzenia. Zazwyczaj konserwacja odbywa się cyklicznie, a badania okresowe raz w roku.',
    category: 'UDT',
    sortOrder: 60,
    isFeatured: true,
  },
  {
    id: 'faq-7',
    question: 'Czy wykonujecie prace na czynnych obiektach?',
    answer:
      'Tak, specjalizujemy się w pracach na ruchu. Możemy pracować zmianowo, aby ograniczyć wpływ na produkcję.',
    category: 'Elektryka i Spawanie',
    sortOrder: 70,
    isFeatured: true,
  },
  {
    id: 'faq-8',
    question: 'Czy spawacie u klienta?',
    answer:
      'Tak, posiadamy mobilny sprzęt spawalniczy i wykonujemy prace bezpośrednio na terenie zakładu klienta.',
    category: 'Elektryka i Spawanie',
    sortOrder: 80,
    isFeatured: true,
  },
  {
    id: 'faq-9',
    question: 'Czy realizujecie relokacje tylko wewnątrz zakładu?',
    answer:
      'Nie. Obsługujemy zarówno przemieszczenia wewnątrzzakładowe, jak i relokacje do nowych lokalizacji, wraz z demontażem, transportem i rozruchem.',
    category: 'Relokacja',
    sortOrder: 90,
    isFeatured: false,
  },
  {
    id: 'faq-10',
    question: 'Czy wykonujecie prace budowlane przy modernizacji hali lub pod nowe maszyny?',
    answer:
      'Tak, obsługujemy zakresy budowlane związane z przygotowaniem przestrzeni pod urządzenia, pracami odtworzeniowymi i modernizacyjnymi.',
    category: 'Budownictwo',
    sortOrder: 100,
    isFeatured: false,
  },
  {
    id: 'faq-11',
    question: 'Jak szybko odpowiadacie na zapytania?',
    answer:
      'Odpowiadamy na zapytania w ciągu 24 godzin w dni robocze. W pilnych sprawach prosimy o kontakt telefoniczny.',
    category: 'Kontakt',
    sortOrder: 110,
    isFeatured: false,
  },
];

const defaultServiceItems: ServiceOfferingPayload[] = [
  {
    id: 'service-1',
    slug: 'relokacja',
    title: 'Relokacja Maszyn',
    description: 'Kompleksowe przenoszenie linii produkcyjnych.',
    items: [
      'Demontaż maszyn i urządzeń',
      'Załadunek i transport specjalistyczny',
      'Relokacje na terenie zakładu i zewnętrzne',
      'Ponowny montaż i poziomowanie',
      'Rozruch technologiczny po relokacji',
    ],
    pagePath: '/relokacja',
    contactLabel: 'Relokacja Maszyn',
    training: null,
    isFeatured: true,
    sortOrder: 10,
  },
  {
    id: 'service-2',
    slug: 'wynajem',
    title: 'Wynajem Maszyn',
    description: 'Profesjonalny sprzęt z możliwością wynajmu z operatorem.',
    items: [
      'Podesty: nożycowe (do 18m), przegubowe, teleskopowe',
      'Żurawie samochodowe (35t, 45t, 60t, 90t)',
      'Ładowarki teleskopowe i wózki widłowe',
      'Specjalistyczny sprzęt (np. VersaLift)',
      'Podnośniki koszowe na pojazdach',
    ],
    pagePath: '/wynajem',
    contactLabel: 'Wynajem Maszyn',
    training: {
      text: 'Potrzebujesz uprawnień UDT na wózki lub żurawie?',
      linkText: 'Oferta szkoleń UDT',
    },
    isFeatured: true,
    sortOrder: 20,
  },
  {
    id: 'service-3',
    slug: 'spawanie',
    title: 'Usługi Spawalnicze',
    description: 'Naprawy bieżące i konstrukcje stalowe.',
    items: [
      'Naprawy: maszyn, zbiorników, rurociągów',
      'Konstrukcje: hale, antresole, podesty',
      'Spawanie wszystkich gatunków stali',
      'Wszystkie metody (MIG/MAG, TIG, Elektryczne)',
      'Doradztwo przy nietypowych zleceniach',
    ],
    pagePath: '/spawanie',
    contactLabel: 'Usługi Spawalnicze',
    training: {
      text: 'Szkolimy spawaczy (MIG/MAG, TIG).',
      linkText: 'Kursy spawalnicze',
    },
    isFeatured: true,
    sortOrder: 30,
  },
  {
    id: 'service-4',
    slug: 'budownictwo',
    title: 'Remonty Budowlane',
    description: 'Usługi remontowo-budowlane dla przemysłu.',
    items: [
      'Adaptacje hal przemysłowych',
      'Fundamenty pod maszyny',
      'Prace wykończeniowe i modernizacyjne',
      'Naprawy posadzek przemysłowych',
      'Infrastruktura techniczna',
    ],
    pagePath: '/budownictwo',
    contactLabel: 'Remonty Budowlane',
    training: {
      text: 'Szkolenia IMBIGS na maszyny budowlane.',
      linkText: 'Szkolenia IMBIGS',
    },
    isFeatured: true,
    sortOrder: 40,
  },
  {
    id: 'service-5',
    slug: 'udt',
    title: 'Konserwacja i UDT',
    description: 'Konserwacja, formalności i przygotowanie urządzeń do badań.',
    items: [
      'Rejestracja urządzeń w UDT',
      'Obsługa formalności i dokumentacji',
      'Konserwacja UTB',
      'Przygotowanie do badań i odbiorów',
      'Doradztwo techniczne',
    ],
    pagePath: '/udt',
    contactLabel: 'Konserwacja i UDT',
    training: null,
    isFeatured: false,
    sortOrder: 50,
  },
  {
    id: 'service-6',
    slug: 'elektryka',
    title: 'Usługi Elektryczne',
    description: 'Uruchomienia, pomiary i wykonawstwo instalacji elektrycznych.',
    items: [
      'Pomiary transformatorów, silników i kabli',
      'Testy rozdzielnic nn oraz SN',
      'Instalacje kablowe i trasy kablowe',
      'Oświetlenie i instalacje słaboprądowe',
      'Wsparcie rozruchowe na obiektach przemysłowych',
    ],
    pagePath: '/elektryka',
    contactLabel: 'Usługi Elektryczne',
    training: null,
    isFeatured: false,
    sortOrder: 60,
  },
];

const siteContentSnapshotPath = 'src/generated/site-content.snapshot.json';

function buildFeaturedGroups(items: FaqItemPayload[]): FaqGroupPayload[] {
  return items
    .filter((item) => item.isFeatured)
    .reduce<FaqGroupPayload[]>((groups, item) => {
      const existingGroup = groups.find((group) => group.category === item.category);

      if (existingGroup) {
        existingGroup.questions.push({
          id: item.id,
          q: item.question,
          a: item.answer,
        });
        return groups;
      }

      groups.push({
        category: item.category,
        questions: [
          {
            id: item.id,
            q: item.question,
            a: item.answer,
          },
        ],
      });

      return groups;
    }, []);
}

function buildDefaultContent(): SiteContentData {
  const categories = ['Wszystkie', ...Array.from(new Set(defaultFaqItems.map((item) => item.category)))];
  const contactOptions = [...defaultServiceItems.map((item) => item.contactLabel), 'Szkolenia', 'Inne'];

  return {
    faqs: {
      items: defaultFaqItems,
      categories,
      featuredGroups: buildFeaturedGroups(defaultFaqItems),
    },
    services: {
      items: defaultServiceItems,
      contactOptions,
    },
  };
}

function getFaqsApiUrl() {
  return import.meta.env.FAQS_API_URL?.trim() || import.meta.env.PUBLIC_FAQS_API_URL?.trim();
}

function getServiceOfferingsApiUrl() {
  return (
    import.meta.env.SERVICE_OFFERINGS_API_URL?.trim() ||
    import.meta.env.PUBLIC_SERVICE_OFFERINGS_API_URL?.trim()
  );
}

function isFaqItemPayload(value: unknown): value is FaqItemPayload {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'id' in value &&
      'question' in value &&
      'answer' in value &&
      'category' in value
  );
}

function isFaqGroupPayload(value: unknown): value is FaqGroupPayload {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'category' in value &&
      'questions' in value &&
      Array.isArray((value as FaqGroupPayload).questions)
  );
}

function isServiceOfferingPayload(value: unknown): value is ServiceOfferingPayload {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'id' in value &&
      'slug' in value &&
      'title' in value &&
      'items' in value &&
      Array.isArray((value as ServiceOfferingPayload).items)
  );
}

async function fetchJson(url: string | undefined): Promise<{ data?: unknown } | null> {
  if (!url) {
    return null;
  }

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as { data?: unknown };
  } catch {
    return null;
  }
}

function normalizeFaqContent(payload: { data?: unknown } | null): SiteContentData['faqs'] | null {
  const data = payload?.data;

  if (!data || typeof data !== 'object') {
    return null;
  }

  const items = 'items' in data && Array.isArray(data.items) ? data.items.filter(isFaqItemPayload) : [];

  if (items.length === 0) {
    return null;
  }

  const categories =
    'categories' in data && Array.isArray(data.categories)
      ? ['Wszystkie', ...data.categories.filter((category): category is string => typeof category === 'string' && category.length > 0)]
      : ['Wszystkie', ...Array.from(new Set(items.map((item) => item.category)))];

  const featuredGroups =
    'featuredGroups' in data && Array.isArray(data.featuredGroups)
      ? data.featuredGroups.filter(isFaqGroupPayload)
      : buildFeaturedGroups(items);

  return {
    items,
    categories,
    featuredGroups,
  };
}

function normalizeServiceContent(payload: { data?: unknown } | null): SiteContentData['services'] | null {
  const data = payload?.data;

  if (!data || typeof data !== 'object') {
    return null;
  }

  const items = 'items' in data && Array.isArray(data.items) ? data.items.filter(isServiceOfferingPayload) : [];

  if (items.length === 0) {
    return null;
  }

  const contactOptions =
    'contactOptions' in data && Array.isArray(data.contactOptions)
      ? data.contactOptions.filter((option): option is string => typeof option === 'string' && option.length > 0)
      : [...items.map((item) => item.contactLabel), 'Szkolenia', 'Inne'];

  return {
    items,
    contactOptions,
  };
}

export async function getSiteContent(): Promise<SiteContentData> {
  const fallback = buildDefaultContent();

  const [faqPayload, servicePayload] = await Promise.all([
    fetchJson(getFaqsApiUrl()),
    fetchJson(getServiceOfferingsApiUrl()),
  ]);

  const snapshot = await readJsonSnapshot<SiteContentData>(siteContentSnapshotPath);
  const snapshotFaqs = normalizeFaqContent(snapshot ? { data: snapshot.faqs } : null);
  const snapshotServices = normalizeServiceContent(snapshot ? { data: snapshot.services } : null);

  return {
    faqs: normalizeFaqContent(faqPayload) ?? snapshotFaqs ?? fallback.faqs,
    services: normalizeServiceContent(servicePayload) ?? snapshotServices ?? fallback.services,
  };
}

export function getDefaultSiteContent(): SiteContentData {
  return buildDefaultContent();
}