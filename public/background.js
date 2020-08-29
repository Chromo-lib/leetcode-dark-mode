let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
chrome = isChrome ? chrome : browser;

function receiver (request) {
  if (request && request.saveConversion && !chrome.runtime.lastError) {

    chrome.storage.local.get(['historyConversions'], function (result) {
      let conversions = [];

      if (result && result.historyConversions) {
        const { historyConversions } = result;
        if (historyConversions.length > 30) { historyConversions.shift(); }
        conversions = historyConversions.slice(0);
      }

      conversions.push(request.saveConversion);
      chrome.storage.local.set({ historyConversions: conversions });
    });
  }
}

chrome.runtime.onMessage.addListener(receiver);
