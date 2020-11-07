## qr-call-webpack-plugin

A webpack plugin of Call the terminal to output QR code through the browser console

[中文文档](https://github.com/Hzy0913/qr-call-webpack-plugin/blob/master/README_zh.md "中文文档")

<img src='https://raw.githubusercontent.com/Hzy0913/hanlibrary/master/qrcode-webpack-plugin%20.gif' width=640/  alt="qrcode-webpack-plugin">

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
| fileNames  | string or array  | the file names of the injection qr method.  If you ignore this option, the qr method will be injected into all bundle files    |
| small  | boolean  | output small size qrcode  |
| name  | string  | function name of the browser  |

### Browser function
 Call the **qr()** method in the browser console, and output the qrcode for terminal.
- qr('s')

 When the 's' parameter is passed in **qr('s')** method, terminal will output the small qrcode.
- qr('l')

 When the 'l' parameter is passed in **qr('l')** method, terminal will output the big qrcode.
