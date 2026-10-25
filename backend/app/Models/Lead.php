<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'public_id',
        'full_name',
        'company',
        'phone',
        'email',
        'service',
        'message',
        'consent',
        'source_page',
        'source_context',
        'source_site',
        'source_url',
        'referrer',
        'locale',
        'user_agent',
        'ip_address',
        'status',
        'assigned_user_id',
        'is_spam',
        'spam_reason',
        'notes',
    ];

    protected function casts(): array
    {
        return [
            'consent' => 'boolean',
            'is_spam' => 'boolean',
        ];
    }

    public function assignedUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'assigned_user_id');
    }
}
