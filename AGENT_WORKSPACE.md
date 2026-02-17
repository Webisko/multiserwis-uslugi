# Agent Workspace Guide

## Cel
Ten workspace jest zoptymalizowany pod pracę agentową (Copilot/AI), a nie pod ręczne pisanie kodu.

## Stack projektu
- Astro 5
- React 19 (komponenty `.tsx` renderowane z tras Astro)
- Tailwind CSS 3
- TypeScript
- Deploy na GitHub Pages

## Rozszerzenia: policy dla tego repo

### Zostawić
- Astro
- Tailwind CSS IntelliSense
- GitHub Copilot Chat
- GitHub Pull Requests
- GitHub Actions
- GitLens
- Error Lens

### Opcjonalnie (jeśli realnie używasz)
- Git Graph (jeśli wolisz od GitLens)
- Git History (jeśli potrzebujesz prostego logu)
- Live Preview (do szybkiego podglądu)
- CSS Peek / HTML CSS Support
- File Utils / advanced-new-file / Path Intellisense

### Odinstalować (w tym workspace)
- Cały zestaw WordPress/PHP
- Cały zestaw Python
- Cały zestaw SQL/MySQL
- XML Tools
- PPTX/PDF viewery
- Inne rozszerzenia niezwiązane z Astro + React + Tailwind + GitHub

## Standard pracy agentowej
1. Agent wprowadza zmianę.
2. Agent uruchamia `npm.cmd run verify`.
3. Jeśli build przechodzi, dopiero wtedy PR/commit.
4. Dla zmian w routingu i assetach sprawdzać spójność `base` w `astro.config.mjs`.
5. Dla analityki Umami używać checklisty z `UMAMI_SETUP.md`.

## Szybkie komendy
- Dev: `npm.cmd run dev`
- Check: `npm.cmd run check`
- Build: `npm.cmd run build`
- Verify: `npm.cmd run verify`
- Release gate: `npm.cmd run release:gate`
- Smoke routes: `npm.cmd run smoke:routes`
- Perf baseline: `npm.cmd run perf:baseline`
- Preview: `npm.cmd run preview`

## Skills (agent automation)
- Zobacz: `AGENT_SKILLS.md`

## Migracja na nową maszynę
- Używaj Node 20 (zgodnie z CI).
- Instalacja zależności: `npm ci`.
- Jeśli deploy path się zmieni, zaktualizuj `site` i `base` w `astro.config.mjs`.

## Checklista cleanupu rozszerzeń (Twoja aktualna lista)

### Zostaw jako core
- Astro
- Tailwind CSS IntelliSense
- GitHub Copilot Chat
- GitHub Pull Requests
- GitHub Actions
- Error Lens
- GitLens **lub** Git Graph (zostaw jedno główne)

### Zostaw opcjonalnie
- Brak (tryb strict agent-only)

### Usuń (zbędne dla tego repo i trybu agentowego)
- vscode-wordpress-hooks
- WordPress Toolbox
- PHP Intelephense
- PHP Sniffer & Beautifier
- Python
- Python Debugger
- Python Environments
- Pylance
- SQLTools
- SQLTools MySQL/MariaDB/TiDB
- MySQL
- XML Tools
- PPTX Viewer Pro (LibreOffice)
- PDF Viewer
- vscode-pdf
- Project Manager
- Path Intellisense
- Git History
- Git Graph
- Live Server
- PowerShell
- CSS Peek
- HTML CSS Support
- File Utils
- advanced-new-file
- SonarQube for IDE

### Dokładne ID (1:1 z Twojej instalacji)
- `alefragnani.project-manager` → usuń
- `christian-kohler.path-intellisense` → usuń
- `cweijan.vscode-mysql-client2` → usuń
- `donjayamanne.githistory` → usuń
- `dotjoshjohnson.xml` → usuń
- `ecmel.vscode-html-css` → usuń
- `github.copilot-chat` → core
- `github.vscode-github-actions` → core
- `github.vscode-pull-request-github` → core
- `johnbillion.vscode-wordpress-hooks` → usuń
- `mathematic.vscode-pdf` → usuń
- `mhutchie.git-graph` → usuń
- `ms-python.debugpy` → usuń
- `ms-python.python` → usuń
- `ms-python.vscode-pylance` → usuń
- `ms-python.vscode-python-envs` → usuń
- `ms-vscode.live-server` → usuń
- `ms-vscode.powershell` → usuń
- `mtxr.sqltools` → usuń
- `mtxr.sqltools-driver-mysql` → usuń
- `patbenatar.advanced-new-file` → usuń
- `pptxviewerpro.pptx-viewer-pro` → usuń
- `pranaygp.vscode-css-peek` → usuń
- `sleistner.vscode-fileutils` → usuń
- `sonarsource.sonarlint-vscode` → usuń
- `tomoki1207.pdf` → usuń
- `usernamehw.errorlens` → core
- `valeryanm.vscode-phpsab` → usuń
- `wordpresstoolbox.wordpress-toolbox` → usuń

### Brakuje (zainstaluj)
- `astro-build.astro-vscode`
- `bradlc.vscode-tailwindcss`

### Komenda hurtowego odinstalowania
Uruchom w terminalu VS Code (PowerShell):

`$remove = @('alefragnani.project-manager','christian-kohler.path-intellisense','cweijan.vscode-mysql-client2','donjayamanne.githistory','dotjoshjohnson.xml','ecmel.vscode-html-css','johnbillion.vscode-wordpress-hooks','mathematic.vscode-pdf','mhutchie.git-graph','ms-python.debugpy','ms-python.python','ms-python.vscode-pylance','ms-python.vscode-python-envs','ms-vscode.live-server','ms-vscode.powershell','mtxr.sqltools','mtxr.sqltools-driver-mysql','patbenatar.advanced-new-file','pptxviewerpro.pptx-viewer-pro','pranaygp.vscode-css-peek','sleistner.vscode-fileutils','sonarsource.sonarlint-vscode','tomoki1207.pdf','valeryanm.vscode-phpsab','wordpresstoolbox.wordpress-toolbox','bmewburn.vscode-intelephense-client'); foreach ($id in $remove) { code --uninstall-extension $id }`

### Komenda doinstalowania brakujących core
`code --install-extension astro-build.astro-vscode; code --install-extension bradlc.vscode-tailwindcss`

## Jak wykonać cleanup w 3 minuty
1. Otwórz panel Extensions.
2. Na każdym rozszerzeniu z listy „Usuń” kliknij ikonę zębatki i wybierz `Uninstall`.
3. Dla rozszerzeń „opcjonalnych” użyj `Disable (Workspace)`, jeśli chcesz zachować je globalnie, ale nie aktywować w tym projekcie.
4. Zrestartuj okno VS Code (`Developer: Reload Window`).

## Szybka zasada na przyszłość
- Jeśli rozszerzenie nie pomaga w Astro/React/Tailwind/GitHub albo w walidacji builda, nie trzymaj go aktywnego w tym workspace.
- Wyjątek: `Material Icon Theme` może zostać dla lepszej nawigacji po plikach.
