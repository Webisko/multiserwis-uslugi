$remove = @(
  'alefragnani.project-manager',
  'christian-kohler.path-intellisense',
  'cweijan.vscode-mysql-client2',
  'donjayamanne.githistory',
  'dotjoshjohnson.xml',
  'ecmel.vscode-html-css',
  'johnbillion.vscode-wordpress-hooks',
  'mathematic.vscode-pdf',
  'mhutchie.git-graph',
  'ms-python.debugpy',
  'ms-python.python',
  'ms-python.vscode-pylance',
  'ms-python.vscode-python-envs',
  'ms-vscode.live-server',
  'ms-vscode.powershell',
  'mtxr.sqltools',
  'mtxr.sqltools-driver-mysql',
  'patbenatar.advanced-new-file',
  'pptxviewerpro.pptx-viewer-pro',
  'pranaygp.vscode-css-peek',
  'sleistner.vscode-fileutils',
  'sonarsource.sonarlint-vscode',
  'tomoki1207.pdf',
  'valeryanm.vscode-phpsab',
  'wordpresstoolbox.wordpress-toolbox',
  'bmewburn.vscode-intelephense-client'
)

$install = @(
  'astro-build.astro-vscode',
  'bradlc.vscode-tailwindcss'
)

foreach ($id in $remove) {
  code --uninstall-extension $id
}

foreach ($id in $install) {
  code --install-extension $id
}

Write-Output 'Extension cleanup completed.'
