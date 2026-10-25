<?php

namespace App\Filament\Resources\Users\Pages;

use App\Filament\Resources\Users\UserResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    public function getTitle(): string
    {
        if ((int) $this->getRecord()->getKey() === (int) auth()->id()) {
            return 'Mój profil';
        }

        return 'Profil pracownika: '.$this->getRecord()->name;
    }

    protected function getHeaderActions(): array
    {
        if ((int) $this->getRecord()->getKey() === (int) auth()->id()) {
            return [];
        }

        return [
            DeleteAction::make(),
        ];
    }
}
