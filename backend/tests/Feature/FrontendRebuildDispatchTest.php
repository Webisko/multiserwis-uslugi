<?php

namespace Tests\Feature;

use App\Models\FaqItem;
use App\Services\FrontendRebuildDispatcher;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class FrontendRebuildDispatchTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_dispatches_a_preview_rebuild_when_content_changes(): void
    {
        config()->set('frontend_rebuild.enabled', true);
        config()->set('frontend_rebuild.auto_dispatch', true);
        config()->set('frontend_rebuild.github.repository', 'Webisko/multiserwis-uslugi');
        config()->set('frontend_rebuild.github.token', 'test-token');
        config()->set('frontend_rebuild.github.event_type', 'preview-rebuild');
        config()->set('preview_snapshot.enabled', false);

        Http::fake([
            'https://api.github.com/repos/Webisko/multiserwis-uslugi/dispatches' => Http::response([], 204),
        ]);

        FaqItem::query()->create([
            'question' => 'Czy pracujecie nocą?',
            'answer' => 'Tak, dla prac na ruchu możemy pracować zmianowo.',
            'category' => 'Organizacja',
            'sort_order' => 1,
            'is_active' => true,
            'is_featured' => false,
        ]);

        Http::assertSent(function (Request $request): bool {
            return $request->url() === 'https://api.github.com/repos/Webisko/multiserwis-uslugi/dispatches'
                && $request['event_type'] === 'preview-rebuild'
                && $request['client_payload']['reason'] === 'FaqItem saved'
                && $request['client_payload']['action'] === 'saved';
        });
    }

    public function test_it_does_not_dispatch_when_default_materialization_is_suppressed(): void
    {
        config()->set('frontend_rebuild.enabled', true);
        config()->set('frontend_rebuild.auto_dispatch', true);
        config()->set('frontend_rebuild.github.repository', 'Webisko/multiserwis-uslugi');
        config()->set('frontend_rebuild.github.token', 'test-token');
        config()->set('frontend_rebuild.github.event_type', 'preview-rebuild');
        config()->set('preview_snapshot.enabled', false);

        Http::fake();

        app(FrontendRebuildDispatcher::class)->runWithoutDispatching(function (): void {
            FaqItem::ensureDefaultsExist();
        });

        Http::assertNothingSent();
    }
}
