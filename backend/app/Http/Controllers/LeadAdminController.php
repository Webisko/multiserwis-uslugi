<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Contracts\View\View;

class LeadAdminController extends Controller
{
    public function __invoke(): View
    {
        $leads = Lead::query()
            ->latest()
            ->paginate(20);

        return view('leads.index', [
            'leads' => $leads,
        ]);
    }
}
