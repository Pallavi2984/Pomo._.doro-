const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  loadPage: (page) => {
    try {
      ipcRenderer.send("load-page", page);
    } catch (error) {
      console.error("Failed to load page:", error);
    }
  },
});
