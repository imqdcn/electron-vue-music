'use strict'

import { app, BrowserWindow ,Tray } from 'electron'
import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  // 如果是macOS，是Darwin，如果是window则是：win32
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
// eslint-disable-next-line no-console
// console.log(123);
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

// 创建系统任务栏图标，默认是没有的，可以在缩小窗口时进行
let tray = null
app.whenReady().then(() => {
  tray = new Tray(`${__static}/256x256.png`)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
})
// function createTray () {
  // __static这是一个很有用的系统变量，可以直接读取static文件夹中的资源，图标大小是16px*16px
  // const menubarPic = process.platform === 'darwin' ? `${__static}/menubar.png` : `${__static}/menubar-nodarwin.png`
  // 我这里没有区分是哪种系统用什么图标，统一用一个
  // const menubarPic = `${__static}/256x256.png`;
  // 在用Tray 之前，，需要先导入进来
  // tray = new Tray(menubarPic)
  // const contextMenu = // ...菜单
  // tray.on('right-click', () => { // 右键点击
  //   window.hide() // 隐藏小窗口
  //   tray.popUpContextMenu(contextMenu) // 打开菜单
  // })
  // tray.on('click', () => { // 左键点击
  //   if (process.platform === 'darwin') { // 如果是macOS
  //     toggleWindow() // 打开或关闭小窗口
  //   } else { // 如果是windows
  //     window.hide() // 隐藏小窗口
  //     if (settingWindow === null) { // 如果主窗口不存在就创建一个
  //       createSettingWindow()
  //       settingWindow.show()
  //     } else { // 如果主窗口在，就显示并激活
  //       settingWindow.show()
  //       settingWindow.focus()
  //     }
  //   }
  // })
}
// 如果窗口最小化时
// app.on('minimize', () => {
//   // app.showEmojiPanel();
//   createTray();
// })
/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
