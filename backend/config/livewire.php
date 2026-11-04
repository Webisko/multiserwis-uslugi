<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Class Namespace
    |--------------------------------------------------------------------------
    |
    | This value sets the root class namespace for Livewire component classes in
    | your application. This value will change where component auto-discovery
    | finds components.
    |
    */

    'class_namespace' => 'App\\Livewire',

    /*
    |--------------------------------------------------------------------------
    | View Path
    |--------------------------------------------------------------------------
    |
    | This value is the path where Livewire component views are stored.
    |
    */

    'view_path' => resource_path('views/livewire'),

    /*
    |--------------------------------------------------------------------------
    | Temporary File Uploads
    |--------------------------------------------------------------------------
    |
    | Livewire handles file uploads by storing them in a temporary directory
    | before they are validated and stored permanently.
    |
    */

    'temporary_file_upload' => [
        'disk' => null,
        'rules' => ['file', 'max:51200'], // 50MB limit
        'directory' => null,
        'middleware' => null,
        'preview_mimes' => [
            'png', 'gif', 'bmp', 'svg', 'wav', 'mp4',
            'mov', 'avi', 'wmv', 'mp3', 'm4a',
            'jpg', 'jpeg', 'mpga', 'webp', 'wma', 'pdf',
        ],
        'max_upload_time' => 5,
    ],

];
