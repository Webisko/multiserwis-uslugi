<?php

namespace App\Observers;

use App\Services\FrontendRebuildDispatcher;
use App\Services\StaticPreviewSnapshotExporter;
use Illuminate\Database\Eloquent\Model;

class ContentSyncObserver
{
    public function __construct(
        protected FrontendRebuildDispatcher $dispatcher,
        protected StaticPreviewSnapshotExporter $snapshotExporter,
    ) {
    }

    public function saved(Model $model): void
    {
        $this->snapshotExporter->export();

        $this->dispatcher->dispatch(
            reason: sprintf('%s saved', class_basename($model)),
            context: [
                'action' => 'saved',
                'model' => $model::class,
                'record_id' => $model->getKey(),
            ],
        );
    }

    public function deleted(Model $model): void
    {
        $this->snapshotExporter->export();

        $this->dispatcher->dispatch(
            reason: sprintf('%s deleted', class_basename($model)),
            context: [
                'action' => 'deleted',
                'model' => $model::class,
                'record_id' => $model->getKey(),
            ],
        );
    }
}
