function listener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);

  filter.ondata = event => {
    filter.write(event.data);
  };

  filter.onstop = event => {
    filter.disconnect();
    expandCollapsedFiles();
  };

  return {};
}

function expandCollapsedFiles() {
  function onExecuted(result) {}
  function onError(error) {
    console.log(`Error: ${error}`);
  }

  browser.tabs
    .executeScript({
      file: 'expand-files.js'
    })
    .then(onExecuted, onError);
}

browser.browserAction.onClicked.addListener(toggleWebRequestListener);

function toggleWebRequestListener() {
  if (browser.webRequest.onBeforeRequest.hasListener(listener)) {
    toggleIcon(false);
    browser.webRequest.onBeforeRequest.removeListener(listener);
  } else {
    toggleIcon(true);
    browser.webRequest.onBeforeRequest.addListener(
      listener,
      { urls: ['*://*/*/*/merge_requests/*/diffs.json'], types: ['xmlhttprequest'] },
      ['blocking']
    );
  }
}

function toggleIcon(active) {
  const icon = active ? 'active.png' : 'inactive.png';
  browser.browserAction.setIcon({ path: `icons/${icon}` });
}
