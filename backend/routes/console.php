<?php

use App\Services\StaticPreviewSnapshotExporter;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('preview:export-snapshots', function () {
    $exported = app(StaticPreviewSnapshotExporter::class)->export(force: true);

    if (! $exported) {
        $this->error('Nie udało się wyeksportować snapshotów preview.');

        return self::FAILURE;
    }

    $this->info('Snapshoty preview zostały wyeksportowane do src/generated/.');

    return self::SUCCESS;
})->purpose('Export static preview snapshots for GitHub Pages builds');
