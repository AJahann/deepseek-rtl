# deepseek-rtl

A lightweight browser extension that enables right-to-left (RTL) layout on [DeepSeek](https://chat.deepseek.com) — useful for Persian, Arabic, Hebrew, and other RTL languages.

Works on **Chrome**, **Brave**, **Edge**, and **Firefox**.

---

## Install & Build

**Requirements:** Node.js, pnpm

```bash
pnpm install
pnpm build
```

The output lands in the `build/` folder.

---

## Load in your browser

### Chrome / Brave / Edge

1. Go to `chrome://extensions`
2. Enable **Developer mode** (top right toggle)
3. Click **Load unpacked**
4. Select the `build/` folder

### Firefox

1. Go to `about:debugging`
2. Click **This Firefox**
3. Click **Load Temporary Add-on**
4. Select any file inside the `build/` folder

---

## Usage

Click the extension icon on any DeepSeek tab to toggle RTL layout on or off. State is per-tab and resets when the tab closes.

---

## Stack

- React + TypeScript
- Vite
- webextension-polyfill (cross-browser support)
- Manifest V3

---

## Development

```bash
pnpm dev
```

Starts Vite in watch mode. After each change, reload the extension from `chrome://extensions` (click the refresh icon on the card).

---

## Credits

Refactored and redesigned with [Claude](https://claude.ai) (Anthropic) — popup UI, cross-browser migration, and project structure.

Bootstrapped from [5tigerjelly/chrome-extension-react-template](https://github.com/5tigerjelly/chrome-extension-react-template).

---

## License

MIT
