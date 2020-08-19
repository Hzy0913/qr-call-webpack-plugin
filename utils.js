'use strict'
const os = require('os')
const terminal = require('qrcode-terminal')

exports.getIPAdress = () => {
    const interfaces = os.networkInterfaces()
    for (const devName in interfaces) {
        const iface = interfaces[devName]
        for (let i = 0; i < iface.length; i++) {
            const alias = iface[i]
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
}

exports.devService = ({port, host, small}) => {
  return function server(app, server, compiler) {
      app.get('/qr', function (req, res) {
          const { qr, size } = req.query;
          const [path] = qr.split(port);
          let qrCodeSize;
          qrCodeSize = small

          if (size) {
              qrCodeSize = size === 's';
          }

          terminal.generate(`http://${exports.getIPAdress()}:${port}/${path}`, {small: qrCodeSize})
          res.json({custom: ' Please check the QR code output from the console '})
      })
  }
}

exports.injectQrFn = (options) => {
    const { handle = 'qr', host, port } = options || {};
    return `/******/ // 🐳 qrcode-webpack-plugin can only be used in the development environment  
/******/ (window.${handle} = function(size) {
/******/   var _xhr = new XMLHttpRequest();
/******/   _xhr.open("GET", "http://${host}:${port}/qr?qr=" + encodeURIComponent(location.href) + "&size=" + (size || ''), true);
/******/   _xhr.send();
/******/   console.log('%c📱 Please check the QR code output from the terminal ', 'color: #4CAF50; font-weight: bold');
/******/ });\n`
}

