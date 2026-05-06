<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateSiteSettingRequest;
use App\Models\SiteSetting;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;

class SiteSettingAdminController extends Controller
{
    public function edit(): View
    {
        return view('settings.edit', [
            'settings' => SiteSetting::current(),
        ]);
    }

    public function update(UpdateSiteSettingRequest $request): RedirectResponse
    {
        $settings = SiteSetting::current();
        $settings->fill($request->validated());
        $settings->save();

        return redirect()
            ->route('admin.settings.edit')
            ->with('status', 'Ustawienia strony zostały zapisane.');
    }
}
