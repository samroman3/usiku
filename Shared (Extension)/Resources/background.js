browser.browserAction.onClicked.addListener(function(tab) {
  browser.tabs.executeScript(tab.id, { file: 'toggleDarkMode.js' });
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: "welcome.html" });
  }
});
