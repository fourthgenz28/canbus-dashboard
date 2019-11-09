const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path'); // eslint-disable-line
const config = require(path.join(__dirname, 'config.json'));
const can = require('socketcan');

const vehicle = require('./Vehicles/honda-civic-gen8');
const Obd2 = require('./OBD2/obd2');

let channel;
let interval = new Array;
let mainWindow = null;

function createChannel() {
  try{
      console.log('Attempting to open channel at can0');
      channel = can.createRawChannel('can0', true);
      if(channel){ return channel; }
  }catch(e){ console.error(e); }

  try{
      console.log('Attempting to open channel at vcan0');
      channel = can.createRawChannel('vcan0', true);
      if(channel){ return channel; }
  }catch(e){
    console.error(e);
    return channel;
  }

  channel.addListener('onMessage', (msg) => {
      const hexValue = msg.id.toString(16);
      if(msg.id === 2024 || //7E8
         msg.id === 417001745){ // 18DAF111
          const obdChannel = 'obd-response-' + msg.data[2];
          const decodedValue = Obd2.service(1).pid(msg.data[2]).decode(msg.data);
          mainWindow.webContents.send(obdChannel, decodedValue);
      }else{
          const targets = vehicle.msgIdMappings[hexValue];
          if(targets){
              targets.forEach(target => {
                  const mapping = vehicle.valueMappings[target];
                  if(mapping){
                      mainWindow.webContents.send(target, mapping(msg.data));
                  }
              });
          }
      }
  });
  channel.start();
}

function launchScanner() {
  vehicle.obdQueries.forEach((q, i) => {
      interval.push(setInterval(() => {
          if(channel){
              channel.send(Obd2.createRequest(q.pid, 1, vehicle.obdConfig.extendedFrames || false))
          }
      }, q.frequency));
  });
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { app.quit(); }
  if(channel){ channel.stop(); }
});

const installExtensions = () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload)));
  }

  return Promise.resolve([]);
};

app.on('ready', () =>
  installExtensions()
  .then(() => {
  mainWindow = new BrowserWindow({
    backgroundColor: '#000',
    frame: true,
    show: false,
    width: config.viewWidth,
    height: config.viewHeight
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  createChannel();
  launchScanner();

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
    if(channel === null){
      mainWindow.webContents.send('canbus-channel-null', null);
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools();
  }
}));
