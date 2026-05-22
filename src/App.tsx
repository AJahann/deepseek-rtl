import { useEffect, useState } from 'react';
import browser from 'webextension-polyfill';

import './app.css';

const STYLE_ID = 'deepseek-rtl-styles';

// These run in page context — must be standalone, no closure references
function applyStyles(styleId: string) {
  if (document.getElementById(styleId)) return;
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    .md-code-block.md-code-block-dark { direction: ltr; }
    .ds-virtual-list-items { direction: rtl; }
  `;
  document.head.appendChild(style);
}

function removeStyles(styleId: string) {
  document.getElementById(styleId)?.remove();
}

const App = () => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadState = async () => {
      const tabs = await browser.tabs.query({
        active: true,
        currentWindow: true,
      });
      const tabId = tabs[0]?.id;
      if (!tabId) return;

      const result = await browser.storage.session.get(`rtl_enabled_${tabId}`);
      setEnabled(!!result[`rtl_enabled_${tabId}`]);
      setLoading(false);
    };

    loadState();
  }, []);

  const toggle = async () => {
    const tabs = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });
    const tabId = tabs[0]?.id;
    if (!tabId) return;

    const next = !enabled;
    setEnabled(next);

    await browser.storage.session.set({ [`rtl_enabled_${tabId}`]: next });

    await browser.scripting.executeScript({
      target: { tabId },
      func: next ? applyStyles : removeStyles,
      args: [STYLE_ID],
    });
  };

  return (
    <div className="popup">
      <div className="header">
        <div className="logo">
          <svg
            height="20"
            width="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M3 5h18M3 12h18M3 19h18" />
          </svg>
        </div>
        <span className="title">DeepSeek RTL</span>
      </div>

      <div className="card">
        <div className="row">
          <div className="info">
            <p className="label">RTL Layout</p>
            <p className="desc">Right-to-left text direction for this tab</p>
          </div>
          <button
            aria-checked={enabled}
            aria-label={enabled ? 'Disable RTL' : 'Enable RTL'}
            className={`toggle ${enabled ? 'on' : 'off'}`}
            disabled={loading}
            type="button"
            onClick={toggle}
            role="switch"
          >
            <span className="thumb" />
          </button>
        </div>

        <div className={`status-pill ${enabled ? 'active' : 'inactive'}`}>
          <span className="dot" />
          {loading ? 'Loading…' : enabled ? 'Active on this tab' : 'Inactive'}
        </div>
      </div>

      <p className="footer">Only affects the current tab</p>
    </div>
  );
};

export default App;
