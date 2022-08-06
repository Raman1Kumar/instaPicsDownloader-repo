Profilepic = document.getElementsByClassName("profilepic")[0];

Profilepic.addEventListener("click", () => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      type: "profilepic",
      download: "yes",
    });
  });
});
