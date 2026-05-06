<?php

namespace Tests\Feature;

use App\Models\FaqItem;
use App\Services\StaticPreviewSnapshotExporter;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PreviewSnapshotExportTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_exports_static_preview_snapshots_to_json_files(): void
    {
        $tempDirectory = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'multiserwis-preview-' . uniqid();
        $settingsPath = $tempDirectory . DIRECTORY_SEPARATOR . 'site-settings.snapshot.json';
        $contentPath = $tempDirectory . DIRECTORY_SEPARATOR . 'site-content.snapshot.json';

        config()->set('preview_snapshot.enabled', true);
        config()->set('preview_snapshot.paths.site_settings', $settingsPath);
        config()->set('preview_snapshot.paths.site_content', $contentPath);

        FaqItem::query()->create([
            'question' => 'Czy eksport działa?',
            'answer' => 'Tak, snapshot powinien zapisać to pytanie do pliku JSON.',
            'category' => 'Test',
            'sort_order' => 1,
            'is_active' => true,
            'is_featured' => true,
        ]);

        $result = app(StaticPreviewSnapshotExporter::class)->export(force: true);

        $this->assertTrue($result);
        $this->assertFileExists($settingsPath);
        $this->assertFileExists($contentPath);

        $siteSettings = json_decode(file_get_contents($settingsPath), true, 512, JSON_THROW_ON_ERROR);
        $siteContent = json_decode(file_get_contents($contentPath), true, 512, JSON_THROW_ON_ERROR);

        $this->assertSame('Multiserwis Kutno', $siteSettings['company']['name']);
        $this->assertSame('Czy eksport działa?', $siteContent['faqs']['items'][0]['question']);
    }
}