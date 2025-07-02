const { app, BrowserWindow, Menu, ipcMain } = require("electron");

process.env.NODE_ENV = "development";

const isDev = process.env.NODE_ENV !== "production";
const isMac = process.platform === "darwin";

let mainWindow;

let aboutWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "ImageCompressor",
    x: 0,
    y: 400,
    width: isDev ? 800 : 500,
    height: 600,
    icon: "./assets/icons/Icon_256x256.png",
    resizable: isDev,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true, // ✅ allows require in renderer
      contextIsolation: false, // ✅ allows direct access to Node APIs
      webSecurity: false, // ✅ allows access to file path
      enableRemoteModule: true, // optional if you use remote
      sandbox: false,
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile("./app/index.html");
}
function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: "About ImageCompressor",
    x: 0,
    y: 400,
    width: 300,
    height: 300,
    icon: "./assets/icons/Icon_256x256.png",
    resizable: false,
    backgroundColor: "white",
  });

  aboutWindow.loadFile("./app/about.html");
}

app.on("ready", () => {
  createMainWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
  //example of global shortcuts (menu options in menu bar)
  //   globalShortcut.register("CmdOrCtrl+R", () => mainWindow.reload());
  //   globalShortcut.register(isMac ? "Cmd+I" : "Ctrl+I", () =>
  //     mainWindow.toggleDevTools()
  //   );
  //garbage collection
  mainWindow.on("ready", () => (mainWindow = null));
});

ipcMain.on("image:minimize", (e, options) => {
  console.log(options);
});

const menu = [
  //to make file menu on mac
  ...(isMac
    ? [
        {
          //put somewhere else for windows, for example under help menu options
          label: app.name,
          submenu: [{ label: "About", click: createAboutWindow }],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
  ...(!isMac
    ? [
        {
          label: "Help",
          submenu: [
            {
              label: app.name,
              submenu: [{ label: "About", click: createAboutWindow }],
            },
          ],
        },
      ]
    : []),
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            { role: "reload" },
            { role: "forcereload" },
            { type: "separator" },
            { role: "toggledevtools" },
          ],
        },
      ]
    : []),
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
