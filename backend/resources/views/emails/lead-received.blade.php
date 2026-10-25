<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nowe zapytanie ofertowe – Multiserwis</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:32px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #cbd5e1;">
                    <tr>
                        <td style="background-color:#0f172a;padding:24px 32px;border-bottom:4px solid #f59e0b;">
                            <div style="font-size:12px;font-weight:700;letter-spacing:2px;color:#f59e0b;text-transform:uppercase;margin-bottom:4px;">
                                MULTISERWIS KUTNO
                            </div>
                            <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;">
                                Nowe zapytanie z formularza kontaktowego
                            </h1>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:28px 32px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:24px;">
                                <tr>
                                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;width:36%;">Imię i nazwisko</td>
                                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#0f172a;">{{ $lead->full_name }}</td>
                                </tr>
                                @if(filled($lead->company))
                                <tr>
                                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Firma</td>
                                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;">{{ $lead->company }}</td>
                                </tr>
                                @endif
                                <tr>
                                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Telefon</td>
                                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;">
                                        <a href="tel:{{ preg_replace('/\s+/', '', (string) $lead->phone) }}" style="color:#0f172a;text-decoration:none;font-weight:700;">{{ $lead->phone }}</a>
                                    </td>
                                </tr>
                                @if(filled($lead->email))
                                <tr>
                                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">E-mail</td>
                                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;">
                                        <a href="mailto:{{ $lead->email }}" style="color:#b45309;text-decoration:underline;font-weight:600;">{{ $lead->email }}</a>
                                    </td>
                                </tr>
                                @endif
                                <tr>
                                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Obszar usługi</td>
                                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;">
                                        <span style="display:inline-block;background-color:#fef3c7;color:#92400e;font-weight:700;padding:4px 10px;border-radius:6px;font-size:13px;">
                                            {{ $lead->service }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;color:#475569;">Źródło zgłoszenia</td>
                                    <td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;">
                                        {{ $lead->source_page }} ({{ $lead->source_context }})
                                    </td>
                                </tr>
                            </table>

                            <div style="background-color:#f8fafc;border-left:4px solid #f59e0b;padding:16px 20px;border-radius:6px;margin-bottom:28px;">
                                <div style="font-size:12px;font-weight:700;text-transform:uppercase;color:#64748b;margin-bottom:8px;">
                                    Treść wiadomości / parametry zapytania:
                                </div>
                                <div style="white-space:pre-line;font-size:14px;line-height:1.6;color:#1e293b;">{{ $lead->message }}</div>
                            </div>

                            <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
                                <tr>
                                    @if(filled($lead->phone))
                                    <td style="padding-right:12px;">
                                        <a href="tel:{{ preg_replace('/\s+/', '', (string) $lead->phone) }}" style="display:inline-block;background-color:#f59e0b;color:#0f172a;font-weight:700;font-size:14px;text-decoration:none;padding:12px 20px;border-radius:8px;">
                                            Zadzwoń: {{ $lead->phone }}
                                        </a>
                                    </td>
                                    @endif
                                    @if(filled($lead->email))
                                    <td style="padding-right:12px;">
                                        <a href="mailto:{{ $lead->email }}" style="display:inline-block;background-color:#0f172a;color:#ffffff;font-weight:700;font-size:14px;text-decoration:none;padding:12px 20px;border-radius:8px;">
                                            Odpowiedz na e-mail
                                        </a>
                                    </td>
                                    @endif
                                    <td>
                                        <a href="{{ $adminUrl }}" style="display:inline-block;background-color:#e2e8f0;color:#0f172a;font-weight:600;font-size:14px;text-decoration:none;padding:12px 18px;border-radius:8px;">
                                            Otwórz w panelu CMS
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#f8fafc;padding:16px 32px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;">
                            ID zgłoszenia: <strong>{{ $lead->public_id }}</strong> &bull; Wysłano automatycznie z systemu Multiserwis ({{ config('app.url') }})
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
