function toggleDarkMode() {
  browser.storage.sync.get(['theme'], function(result) {
    if (result.theme) {
      applyTheme(result.theme);
    }
  });
}

toggleDarkMode();
