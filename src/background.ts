import browser from 'webextension-polyfill';

browser.tabs.onRemoved.addListener((tabId) => {
  browser.storage.session.remove(`rtl_enabled_${tabId}`);
});
