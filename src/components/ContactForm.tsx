import React, { useState } from 'react';

const PREVIEW_SUCCESS_MESSAGE =
  'Formularz działa poprawnie w trybie podglądu. Produkcyjna wysyłka zostanie aktywowana po wdrożeniu backendu Laravel i panelu Filament.';
const API_FALLBACK_ERROR_MESSAGE =
  'Nie udało się wysłać zapytania. Spróbuj ponownie za chwilę lub skontaktuj się telefonicznie.';
const contactApiUrl = import.meta.env.PUBLIC_CONTACT_API_URL?.trim();
const RENTAL_SERVICE_LABEL = 'Wynajem Maszyn';

const fallbackServiceOptions = [
  'Wynajem Maszyn',
  'Usługi Spawalnicze',
  'Relokacja Maszyn',
  'Konserwacja i UDT',
  'Usługi Elektryczne',
  'Hydraulika i Montaż',
  'Szkolenia',
  'Inne',
];

type ContactFormProps = {
  title: string;
  cardClassName: string;
  fieldClassName: string;
  submitButtonClassName: string;
  titleClassName?: string;
  contextLabel: string;
  compact?: boolean;
  serviceOptions?: string[];
};

type FormState = {
  fullName: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  rentalEquipment: string;
  rentalLocation: string;
  rentalStartDate: string;
  rentalDuration: string;
  rentalOperator: string;
  message: string;
  consent: boolean;
  website: string;
};

const initialState: FormState = {
  fullName: '',
  company: '',
  phone: '',
  email: '',
  service: '',
  rentalEquipment: '',
  rentalLocation: '',
  rentalStartDate: '',
  rentalDuration: '',
  rentalOperator: '',
  message: '',
  consent: false,
  website: '',
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type LeadPayload = FormState & {
  source: {
    page: string;
    context: string;
    site: string;
    url: string;
    referrer: string;
  };
  meta: {
    locale: string;
    userAgent: string;
    submittedAt: string;
  };
};

type SubmitResult = {
  ok: boolean;
  message: string;
  fieldErrors?: FormErrors;
};

function isRentalInquiry(state: Pick<FormState, 'service'>) {
  return state.service === RENTAL_SERVICE_LABEL;
}

function validateForm(state: FormState): FormErrors {
  const errors: FormErrors = {};
  const digits = state.phone.replace(/\D/g, '');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (state.website.trim()) errors.website = 'Wykryto nieprawidłowe dane formularza.';
  if (state.fullName.trim().length < 2) errors.fullName = 'Podaj imię i nazwisko.';
  if (digits.length < 9) errors.phone = 'Podaj poprawny numer telefonu.';
  if (!emailPattern.test(state.email.trim())) errors.email = 'Podaj poprawny adres e-mail.';
  if (!state.service) errors.service = 'Wybierz interesującą usługę.';
  if (isRentalInquiry(state) && state.rentalEquipment.trim().length < 2) {
    errors.rentalEquipment = 'Wskaż potrzebny sprzęt lub maszynę.';
  }
  if (state.message.trim().length < 20) errors.message = 'Wiadomość powinna mieć co najmniej 20 znaków.';
  if (!state.consent) errors.consent = 'Zgoda na przetwarzanie danych jest wymagana.';

  return errors;
}

async function submitPreviewLead(): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return PREVIEW_SUCCESS_MESSAGE;
}

function buildMessageContent(formState: FormState) {
  if (!isRentalInquiry(formState)) {
    return formState.message.trim();
  }

  const rentalDetails = [
    `Sprzęt / maszyna: ${formState.rentalEquipment.trim() || 'nie podano'}`,
    formState.rentalLocation.trim() ? `Lokalizacja: ${formState.rentalLocation.trim()}` : null,
    formState.rentalStartDate ? `Planowana data rozpoczęcia: ${formState.rentalStartDate}` : null,
    formState.rentalDuration.trim() ? `Przewidywany czas wynajmu: ${formState.rentalDuration.trim()}` : null,
    formState.rentalOperator ? `Operator: ${formState.rentalOperator}` : null,
  ].filter(Boolean);

  return ['Zapytanie dotyczące wynajmu maszyn.', ...rentalDetails, '', 'Krótki opis prac:', formState.message.trim()].join(
    '\n'
  );
}

function buildLeadPayload(formState: FormState, contextLabel: string): LeadPayload {
  const currentUrl = window.location.href;
  const url = new URL(currentUrl);

  return {
    fullName: formState.fullName,
    company: formState.company,
    phone: formState.phone,
    email: formState.email,
    service: formState.service,
    message: buildMessageContent(formState),
    consent: formState.consent,
    website: formState.website,
    source: {
      page: url.pathname,
      context: contextLabel,
      site: 'multiserwis-uslugi',
      url: currentUrl,
      referrer: document.referrer || '',
    },
    meta: {
      locale: navigator.language || 'pl-PL',
      userAgent: navigator.userAgent,
      submittedAt: new Date().toISOString(),
    },
  };
}

function normalizeErrorKey(fieldName: string): keyof FormState | null {
  const fieldMap: Record<string, keyof FormState> = {
    fullName: 'fullName',
    full_name: 'fullName',
    company: 'company',
    phone: 'phone',
    email: 'email',
    service: 'service',
    message: 'message',
    consent: 'consent',
    website: 'website',
  };

  return fieldMap[fieldName] ?? null;
}

function mapApiFieldErrors(errors?: Record<string, string[]>): FormErrors {
  if (!errors) {
    return {};
  }

  return Object.entries(errors).reduce<FormErrors>((result, [fieldName, messages]) => {
    const normalizedField = normalizeErrorKey(fieldName);
    if (normalizedField && messages[0]) {
      result[normalizedField] = messages[0];
    }
    return result;
  }, {});
}

async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  if (!contactApiUrl) {
    const message = await submitPreviewLead();
    return { ok: true, message };
  }

  const response = await fetch(contactApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseBody = (await response.json().catch(() => null)) as
    | { message?: string; errors?: Record<string, string[]> }
    | null;

  if (response.status === 422) {
    return {
      ok: false,
      message: responseBody?.message || 'Dane formularza są nieprawidłowe.',
      fieldErrors: mapApiFieldErrors(responseBody?.errors),
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      message: responseBody?.message || API_FALLBACK_ERROR_MESSAGE,
    };
  }

  return {
    ok: true,
    message:
      responseBody?.message || 'Zapytanie zostało zapisane. Skontaktujemy się możliwie szybko.',
  };
}

export const ContactForm: React.FC<ContactFormProps> = ({
  title,
  cardClassName,
  fieldClassName,
  submitButtonClassName,
  titleClassName = 'text-3xl font-display font-bold text-white mb-8',
  contextLabel,
  compact = false,
  serviceOptions = fallbackServiceOptions,
}) => {
  const isPreviewMode = !contactApiUrl;
  const resolvedServiceOptions = serviceOptions.length > 0 ? serviceOptions : fallbackServiceOptions;
  const [formState, setFormState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  const isRentalSelected = isRentalInquiry(formState);

  const handleFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const nextValue = type === 'checkbox' ? (event.target as HTMLInputElement).checked : value;

    setFormState((current) => {
      if (name === 'service' && nextValue !== RENTAL_SERVICE_LABEL) {
        return {
          ...current,
          service: nextValue as string,
          rentalEquipment: '',
          rentalLocation: '',
          rentalStartDate: '',
          rentalDuration: '',
          rentalOperator: '',
        };
      }

      return { ...current, [name]: nextValue };
    });

    if (errors[name as keyof FormErrors]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }

    if (status !== 'idle') {
      setStatus('idle');
      setFeedback('');
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm(formState);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('error');
      setFeedback('Popraw oznaczone pola i spróbuj ponownie.');
      return;
    }

    setErrors({});
    setStatus('submitting');
    setFeedback(
      isPreviewMode
        ? `Trwa przygotowanie zapytania z sekcji: ${contextLabel}.`
        : 'Trwa wysyłka zapytania do systemu obsługi leadów.'
    );

    try {
      const payload = buildLeadPayload(formState, contextLabel);
      const result = await submitLead(payload);

      if (!result.ok) {
        setErrors(result.fieldErrors || {});
        setStatus('error');
        setFeedback(result.message);
        return;
      }

      setStatus('success');
      setFeedback(result.message);
      setFormState(initialState);
    } catch {
      setStatus('error');
      setFeedback(API_FALLBACK_ERROR_MESSAGE);
    }
  };

  const fieldClasses = (fieldName: keyof FormState) =>
    `${fieldClassName} ${errors[fieldName] ? 'border-red-400 focus:border-red-400' : 'border-gray-700 focus:border-industrial-accent'}`;

  return (
    <div className={cardClassName}>
      <h3 className={titleClassName}>{title}</h3>
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {isPreviewMode && (
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-amber-100">
            Tryb podglądu: formularz pokazuje pełny przebieg walidacji, ale nie zapisuje jeszcze leada w backendzie.
          </div>
        )}

        <input type="text" name="website" value={formState.website} onChange={handleFieldChange} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div className={`grid grid-cols-1 ${compact ? 'md:grid-cols-2 gap-4' : 'md:grid-cols-2 gap-6'}`}>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">Imię i nazwisko *</label>
            <input name="fullName" value={formState.fullName} onChange={handleFieldChange} type="text" autoComplete="name" className={fieldClasses('fullName')} placeholder="Jan Kowalski" aria-invalid={Boolean(errors.fullName)} />
            {errors.fullName && <p className="mt-2 text-sm text-red-300">{errors.fullName}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">{compact ? 'Telefon *' : 'Firma (opcjonalnie)'}</label>
            {compact ? (
              <>
                <input name="phone" value={formState.phone} onChange={handleFieldChange} type="tel" inputMode="tel" autoComplete="tel" className={fieldClasses('phone')} placeholder="123 456 789" aria-invalid={Boolean(errors.phone)} />
                {errors.phone && <p className="mt-2 text-sm text-red-300">{errors.phone}</p>}
              </>
            ) : (
              <input name="company" value={formState.company} onChange={handleFieldChange} type="text" autoComplete="organization" className={fieldClasses('company')} placeholder="Nazwa firmy" />
            )}
          </div>
        </div>

        {compact ? (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-400">E-mail *</label>
            <input name="email" value={formState.email} onChange={handleFieldChange} type="email" autoComplete="email" className={fieldClasses('email')} placeholder="adres@email.com" aria-invalid={Boolean(errors.email)} />
            {errors.email && <p className="mt-2 text-sm text-red-300">{errors.email}</p>}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-400">Telefon *</label>
              <input name="phone" value={formState.phone} onChange={handleFieldChange} type="tel" inputMode="tel" autoComplete="tel" className={fieldClasses('phone')} placeholder="+48 123 456 789" aria-invalid={Boolean(errors.phone)} />
              {errors.phone && <p className="mt-2 text-sm text-red-300">{errors.phone}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-400">E-mail *</label>
              <input name="email" value={formState.email} onChange={handleFieldChange} type="email" autoComplete="email" className={fieldClasses('email')} placeholder="email@firma.pl" aria-invalid={Boolean(errors.email)} />
              {errors.email && <p className="mt-2 text-sm text-red-300">{errors.email}</p>}
            </div>
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-400">{compact ? 'Temat' : 'Interesująca usługa *'}</label>
          <select name="service" value={formState.service} onChange={handleFieldChange} className={fieldClasses('service')} aria-invalid={Boolean(errors.service)}>
            <option value="">{compact ? 'Wybierz temat...' : 'Wybierz usługę...'}</option>
            {resolvedServiceOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.service && <p className="mt-2 text-sm text-red-300">{errors.service}</p>}
        </div>

        {isRentalSelected && (
          <div className={`grid grid-cols-1 ${compact ? 'gap-4' : 'gap-6 md:grid-cols-2'}`}>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-400">Sprzęt lub maszyna *</label>
              <input
                name="rentalEquipment"
                value={formState.rentalEquipment}
                onChange={handleFieldChange}
                type="text"
                className={fieldClasses('rentalEquipment')}
                placeholder="Np. żuraw 45t, podest nożycowy, wózek widłowy"
                aria-invalid={Boolean(errors.rentalEquipment)}
              />
              {errors.rentalEquipment && <p className="mt-2 text-sm text-red-300">{errors.rentalEquipment}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-400">Lokalizacja realizacji</label>
              <input
                name="rentalLocation"
                value={formState.rentalLocation}
                onChange={handleFieldChange}
                type="text"
                className={fieldClasses('rentalLocation')}
                placeholder="Miasto / zakład / adres"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-400">Planowana data rozpoczęcia</label>
              <input
                name="rentalStartDate"
                value={formState.rentalStartDate}
                onChange={handleFieldChange}
                type="date"
                className={fieldClasses('rentalStartDate')}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-400">Przewidywany czas wynajmu</label>
              <input
                name="rentalDuration"
                value={formState.rentalDuration}
                onChange={handleFieldChange}
                type="text"
                className={fieldClasses('rentalDuration')}
                placeholder="Np. 2 dni, 1 tydzień, 3 miesiące"
              />
            </div>

            <div className={compact ? '' : 'md:col-span-2'}>
              <label className="mb-2 block text-sm font-medium text-gray-400">Czy z operatorem?</label>
              <select
                name="rentalOperator"
                value={formState.rentalOperator}
                onChange={handleFieldChange}
                className={fieldClasses('rentalOperator')}
              >
                <option value="">Do ustalenia</option>
                <option value="Z operatorem">Z operatorem</option>
                <option value="Bez operatora">Bez operatora</option>
              </select>
              <p className="mt-2 text-xs text-gray-500">
                Pole dotyczy wybranych grup sprzętu, np. żurawi i podnośników. Ostateczny model realizacji potwierdzimy po analizie zapytania.
              </p>
            </div>
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-400">
            {isRentalSelected ? 'Krótki opis prac *' : 'Wiadomość *'}
          </label>
          <textarea name="message" value={formState.message} onChange={handleFieldChange} rows={4} className={fieldClasses('message')} placeholder={isRentalSelected ? 'Np. wysokość pracy, waga ładunku, zasięg podania, warunki na obiekcie.' : compact ? 'Opisz, czego potrzebujesz...' : 'Opisz swoje potrzeby, termin i lokalizację.'} aria-invalid={Boolean(errors.message)} />
          {errors.message && <p className="mt-2 text-sm text-red-300">{errors.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-start gap-3 rounded-lg border border-transparent p-1">
            <input id={`consent-${contextLabel}`} name="consent" checked={formState.consent} onChange={handleFieldChange} type="checkbox" className="mt-1.5 h-5 w-5 shrink-0 rounded accent-industrial-accent" />
            <label htmlFor={`consent-${contextLabel}`} className="flex-1 cursor-pointer text-sm leading-snug text-gray-400">Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zapytania. *</label>
          </div>
          {errors.consent && <p className="text-sm text-red-300">{errors.consent}</p>}
        </div>

        {feedback && (
          <div className={`rounded-lg border px-4 py-3 text-sm leading-relaxed ${status === 'success' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100' : status === 'error' ? 'border-red-500/40 bg-red-500/10 text-red-100' : 'border-gray-600 bg-industrial-950/60 text-gray-300'}`}>
            {feedback}
          </div>
        )}

        <button type="submit" disabled={status === 'submitting'} className={`${submitButtonClassName} ${status === 'submitting' ? 'cursor-not-allowed opacity-80' : ''}`}>
          {status === 'submitting' ? 'Wysyłanie...' : 'Wyślij zapytanie'}
        </button>
      </form>
    </div>
  );
};
