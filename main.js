const {app, BrowserWindow, ipcMain} = require('electron')
const request = require('request')

let data
let win
let i = 0

function boot() {
    win = new BrowserWindow({
        width:600,
        height:400,
        frame:false,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadURL(`file://${__dirname}/index.html`)
    //win.webContents.openDevTools()
}

ipcMain.on('win:close', _ => {
    app.quit()
})

ipcMain.on('win:max', _ => {
    win.isMaximized() ? win.unmaximize() : win.maximize()
})

ipcMain.on('win:min', _ => {
    win.minimize()
})

ipcMain.on('quote:req', (e) => {
    let random = Math.floor(Math.random() * data.length)
    let quote = data[random]
    i = i+1
    total = data.length
    win.webContents.send('quote:resp', quote, i, total)
})

function quotes() {
    let url = "https://type.fit/api/quotes"
    

    request(url, (error, response, body) => {
        data = JSON.parse(body)
    })
}


app.on('ready', () => {
    quotes()    
    setTimeout(boot, 1000)
})

app.on('quit', () => {
    console.log("Until next time");
    app.quit();
});