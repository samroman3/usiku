document.getElementById('apply-theme').addEventListener('click', () => {
  const theme = document.getElementById('themes').value;
  browser.storage.sync.set({ theme: theme }, () => {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      browser.tabs.executeScript(tabs[0].id, { code: `applyTheme('${theme}');` });
    });
  });
});

document.getElementById('reader-mode').addEventListener('change', (event) => {
  const readerModeEnabled = event.target.checked;
  browser.storage.sync.set({ readerMode: readerModeEnabled }, () => {
    browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      browser.tabs.executeScript(tabs[0].id, { code: `toggleReaderMode(${readerModeEnabled});` });
    });
  });
});

browser.storage.sync.get(['theme', 'readerMode'], function(result) {
  if (result.theme) {
    document.getElementById('themes').value = result.theme;
  }
  if (result.readerMode) {
    document.getElementById('reader-mode').checked = result.readerMode;
  }
});
