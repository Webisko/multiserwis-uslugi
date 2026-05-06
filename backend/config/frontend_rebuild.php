<?php

return [
    'enabled' => (bool) env('FRONTEND_REBUILD_ENABLED', false),
    'auto_dispatch' => (bool) env('FRONTEND_REBUILD_AUTO_DISPATCH', true),
    'timeout' => (int) env('FRONTEND_REBUILD_TIMEOUT', 10),

    'github' => [
        'repository' => env('FRONTEND_REBUILD_GITHUB_REPOSITORY', 'Webisko/multiserwis-uslugi'),
        'token' => env('FRONTEND_REBUILD_GITHUB_TOKEN', ''),
        'event_type' => env('FRONTEND_REBUILD_GITHUB_EVENT', 'preview-rebuild'),
    ],
];
