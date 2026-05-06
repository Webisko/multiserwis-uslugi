<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreLeadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'fullName' => ['required', 'string', 'min:2', 'max:120'],
            'company' => ['nullable', 'string', 'max:160'],
            'phone' => [
                'required',
                'string',
                'max:40',
                function (string $attribute, mixed $value, \Closure $fail): void {
                    $digits = preg_replace('/\D+/', '', (string) $value) ?? '';

                    if (strlen($digits) < 9) {
                        $fail('Podaj poprawny numer telefonu.');
                    }
                },
            ],
            'email' => ['required', 'email', 'max:160'],
            'service' => [
                'required',
                'string',
                Rule::in([
                    'Wynajem Maszyn',
                    'Usługi Spawalnicze',
                    'Relokacja Maszyn',
                    'Konserwacja i UDT',
                    'Usługi Elektryczne',
                    'Remonty Budowlane',
                    'Szkolenia',
                    'Inne',
                ]),
            ],
            'message' => ['required', 'string', 'min:20', 'max:5000'],
            'consent' => ['accepted'],
            'website' => ['nullable', 'string', 'max:255'],
            'source' => ['required', 'array'],
            'source.page' => ['required', 'string', 'max:255'],
            'source.context' => ['required', 'string', 'max:120'],
            'source.site' => ['nullable', 'string', 'max:120'],
            'source.url' => ['nullable', 'string', 'max:2048'],
            'source.referrer' => ['nullable', 'string', 'max:2048'],
            'meta' => ['nullable', 'array'],
            'meta.locale' => ['nullable', 'string', 'max:20'],
            'meta.userAgent' => ['nullable', 'string', 'max:2048'],
            'meta.submittedAt' => ['nullable', 'date'],
        ];
    }

    public function messages(): array
    {
        return [
            'fullName.required' => 'Podaj imię i nazwisko.',
            'fullName.min' => 'Podaj imię i nazwisko.',
            'email.required' => 'Podaj poprawny adres e-mail.',
            'email.email' => 'Podaj poprawny adres e-mail.',
            'service.required' => 'Wybierz interesującą usługę.',
            'service.in' => 'Wybierz interesującą usługę.',
            'message.required' => 'Wiadomość musi zawierać co najmniej 20 znaków.',
            'message.min' => 'Wiadomość musi zawierać co najmniej 20 znaków.',
            'consent.accepted' => 'Zgoda na przetwarzanie danych jest wymagana.',
            'source.page.required' => 'Brakuje informacji o stronie źródłowej.',
            'source.context.required' => 'Brakuje informacji o kontekście formularza.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $source = is_array($this->input('source')) ? $this->input('source') : [];
        $meta = is_array($this->input('meta')) ? $this->input('meta') : [];

        $this->merge([
            'fullName' => trim((string) $this->input('fullName', '')),
            'company' => trim((string) $this->input('company', '')),
            'phone' => trim((string) $this->input('phone', '')),
            'email' => trim((string) $this->input('email', '')),
            'service' => trim((string) $this->input('service', '')),
            'message' => trim((string) $this->input('message', '')),
            'website' => trim((string) $this->input('website', '')),
            'source' => [
                'page' => trim((string) ($source['page'] ?? '')),
                'context' => trim((string) ($source['context'] ?? '')),
                'site' => trim((string) ($source['site'] ?? '')),
                'url' => trim((string) ($source['url'] ?? '')),
                'referrer' => trim((string) ($source['referrer'] ?? '')),
            ],
            'meta' => [
                'locale' => trim((string) ($meta['locale'] ?? '')),
                'userAgent' => trim((string) ($meta['userAgent'] ?? '')),
                'submittedAt' => trim((string) ($meta['submittedAt'] ?? '')),
            ],
        ]);
    }
}
