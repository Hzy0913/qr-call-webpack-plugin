#### qr-call-webpack-plugin

A webpack plugin of Call the terminal to output QR code through the browser console

### Install
    $ npm i qr-call-webpack-plugin
### Usage
    const QRCallWebpackPlugin = require('qr-call-webpack-plugin')

##### in the webpack
```javascript
const webpackConfig = {
    ...,
    plugins: [
        ...,
        new QRCallWebpackPlugin({
            small: true
        }),
    ],
}
```
### Options

|param   |type   |describe   |
| ------------ | ------------ | ------------ |
| small  | boolean  | output small size qrcode  |
| name  | string  | function name of the browser  |

### Browser function
 Call the **qr()** method in the browser console, and output the qrcode for terminal.
- qr('s')

 When the 's' parameter is passed in **qr('s')** method, terminal will output the small qrcode.
- qr('l')
 When the 'l' parameter is passed in **qr('l')** method, terminal will output the big qrcode.
