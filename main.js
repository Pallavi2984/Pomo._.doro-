const path = require("path");
const { app, BrowserWindow, ipcMain } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 550,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.removeMenu();
  win.loadFile("index.html");
  //win.webContents.openDevTools(); //Open the console
  ipcMain.on("load-page", (event, page) => {
    const win = BrowserWindow.getAllWindows()[0]; // Get the active window
    if (win) {
      win.loadFile(page).catch((err) => console.error("Error loading page:", err));
    }
  });
  

}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
