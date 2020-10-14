### qr-call-webpack-plugin

一个通过浏览器控制台调用命令行打印二维码的webpack插件

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

|参数   |类型   |描述   |
| ------------ | ------------ | ------------ |
| fileNames  | string or array  | 注入qr方法的文件名，如果忽略此选项，则qr方法将注入所有的打包文件中。    |
| small  | boolean  | 输出小尺寸的二维码  |
| name  | string  | 浏览器的函数方法名称  |

### Browser function
 Call the **qr()** method in the browser console, and output the qrcode for terminal.
- qr('s')

 When the 's' parameter is passed in **qr('s')** method, terminal will output the small qrcode.
- qr('l')
 When the 'l' parameter is passed in **qr('l')** method, terminal will output the big qrcode.
