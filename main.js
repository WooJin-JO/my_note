var express = require('express');
var noteapp = express();
var bodyParser = require('body-parser');
var rest_api = require('./routes/rest_api')

noteapp.use(bodyParser.json()); // for parsing noteapplication/json
//noteapp.use(/^((?!.*abc).*)/, express.static(__dirname + '/'));
noteapp.use('/', express.static(__dirname + '/'));
noteapp.use('/memories', express.static(__dirname + '/'));
noteapp.use('/monthly', express.static(__dirname + '/'));
noteapp.use('/write', express.static(__dirname + '/'));
noteapp.use('/timer', express.static(__dirname + '/'));
noteapp.use('/weather', express.static(__dirname + '/'));

noteapp.all('/api/add', function (req, res, next) {
  console.log('Add API is called...');
  api = new rest_api();
  result = api.write(req);
  if (result) {
    res.json({success: true})
  }
});

noteapp.all('/api/list', function (req, res, next) {
  console.log('List API is called...');
  api = new rest_api();
  api.list(req, res);
});

noteapp.listen(3000, function () {
  console.log('Example noteapp listening on port 3000!');
});


const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow () {
  win = new BrowserWindow({width: 1500, height: 800})

  win.loadURL(url.format({
    pathname: 'localhost:3000',
    protocol: 'http:',
    slashes: true
  }))

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
