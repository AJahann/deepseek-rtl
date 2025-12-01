# Deepseek RTL Extension

A simple Chrome extension that toggles text direction on pages to improve right-to-left reading, with special handling for code blocks.

## Overview

- Injects styles into the active tab when you click the extension button
- Keeps the toggle state per tab until the tab closes
- Targets two elements:
  - `.md-code-block.md-code-block-dark` is set to `direction: ltr` for readable code
  - `.ds-scroll-area` is set to `direction: rtl` for better RTL reading

Core logic lives in `src/background.ts`:

- Click listener: `src/background.ts:4`
- Apply styles: `src/background.ts:41`
- Remove styles: `src/background.ts:63`

## Install

1. Ensure Node.js 18 or 20 is installed
2. Install dependencies:

   ```sh
   npm install
   ```

3. Build the extension:

   ```sh
   npm run build
   ```

4. Load in Chrome:
   - Open `chrome://extensions/`
   - Enable Developer mode
   - Click Load unpacked and select the `build` folder

## Usage

- Click the extension toolbar button to toggle styles on the current tab
- Click again to remove the styles
- The toggle is tracked per tab

## Development

- Start a dev server for the demo page:

  ```sh
  npm run dev
  ```

- Build output is written to `build/`
- Background service worker is built to `background.js` as required by the manifest

## Project Structure

- `public/manifest.json` defines permissions and background worker
- `src/background.ts` runs the toggle and style injection
- `index.html` and `src/App.tsx` are used by the dev preview
- `vite.config.ts` configures build targets and copies the manifest

## Permissions

- Uses `activeTab` and `scripting` to inject styles
- `host_permissions` is set to `<all_urls>` in `public/manifest.json`

## License

MIT
