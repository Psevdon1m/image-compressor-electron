const { app, BrowserWindow, Menu } = require("electron");

process.env.NODE_ENV = "development";

const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "ImageCompressor",
    x: 0,
    y: 400,
    width: 500,
    height: 600,
    icon: "./assets/icons/Icon_256x256.png",
    resizable: isDev,
  });

  mainWindow.loadFile("./app/index.html");
}

app.on("ready", () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  //garbage collection
  mainWindow.on("ready", () => (mainWindow = null));
});

const menu = [
  //to make file menu on mac
  ...(isMac ? [{ role: "appMenu" }] : []),
  {
    label: "File",
    submenu: [{ label: "Quit", click: () => app.quit() }],
  },
];

app.allowRendererProcessReuse = true;

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
