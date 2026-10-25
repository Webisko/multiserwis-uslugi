<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LeadReceivedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly Lead $lead,
    ) {}

    public function envelope(): Envelope
    {
        $replyTo = [];

        if (filled($this->lead->email)) {
            $replyTo[] = new Address(
                (string) $this->lead->email,
                (string) ($this->lead->full_name ?: $this->lead->email),
            );
        }

        return new Envelope(
            subject: sprintf('[Multiserwis] Nowe zapytanie: %s (%s)', $this->lead->service, $this->lead->full_name),
            replyTo: $replyTo,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.lead-received',
            with: [
                'lead' => $this->lead,
                'adminUrl' => rtrim((string) config('app.url'), '/').'/admin/leads',
            ],
        );
    }
}
