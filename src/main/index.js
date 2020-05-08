import { app, BrowserWindow, Tray, Menu, ipcMain, nativeImage } from 'electron'
import path from 'path'


/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let appIcon = null
let mainWindow
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
        frame: false,
        minWidth: 800,
        minHeight: 500,
        movable: true,
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })

    ipcMain.on('asynchronous-show', (event, arg) => {
        if (arg === 'show') {
            mainWindow.minimize()
        } else if (arg === 'max') {
            console.log(mainWindow.isMaximized())
            if (mainWindow.isMaximized()) {
                mainWindow.unmaximize()
            } else {
                mainWindow.maximize()
            }

        } else {
            mainWindow.hide()
        }

    })

    const iconPath = path.join(__static, '/imgs/icon.png')
    const trayUrl = nativeImage.createFromPath(iconPath)
    appIcon = new Tray(trayUrl);

    appIcon.on('click', function() {
        mainWindow.show()
    })

    const contextMenu = Menu.buildFromTemplate([{
            label: 'show',
            click: function() {
                mainWindow.show()
            }
        },
        {
            label: 'quit',
            click: function() {
                app.quit()
            }
        }

    ])
    appIcon.setToolTip('我的软件')
    appIcon.setContextMenu(contextMenu)
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */