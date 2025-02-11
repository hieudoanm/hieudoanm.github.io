document.getElementById("save").addEventListener("click", () => {
  const blockedSites = document
    .getElementById("blocked-sites")
    .value.split("\n")
    .map((site) => site.trim());
  chrome.storage.sync.set({ blockedSites }, () => {
    alert("Blocked sites updated!");
  });
});

// Load saved blocked sites
chrome.storage.sync.get(["blockedSites"], (result) => {
  if (result.blockedSites) {
    document.getElementById("blocked-sites").value =
      result.blockedSites.join("\n");
  }
});
