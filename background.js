chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    console.log(tab.tabId);
    u = current_tab_info.url;
    if (u.includes("https://www.instagram.com/p/")) {
      chrome.tabs.sendMessage(tab.tabId, {
        type: "BIG",
        canbe: 1,
      });
    }
  });
});

// event listener on activated ,for everytime user switch tab its get activated
