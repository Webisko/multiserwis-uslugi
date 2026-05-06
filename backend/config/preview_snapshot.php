<?php

return [
    'enabled' => (bool) env('STATIC_PREVIEW_EXPORT_ENABLED', env('APP_ENV', 'production') === 'local'),

    'paths' => [
        'site_settings' => base_path('../src/generated/site-settings.snapshot.json'),
        'site_content' => base_path('../src/generated/site-content.snapshot.json'),
    ],
];