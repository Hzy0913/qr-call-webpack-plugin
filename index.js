'use strict'
const ConcatSource = require('webpack-sources').ConcatSource;
const utils = require('./utils');

class QrCodeWebpackPlugin {
  fn = 'qr'
  small = false

  constructor(options) {
    const { name, small } = options || {};
    this.fn = name;
    this.small = small || false;
  }

  apply(compiler, callback) {
    compiler.hooks.afterResolvers.tap('QrCodeWebpackPlugin', (compiler2) => {
      const { host, port, after } = compiler.options.devServer;
      const _self = this;

      if (after) {
        compiler.options.devServer.after = function afterServer(...argument) {
          after.call(this, ...argument);
          utils.devService({ host, port, small: _self.small }).call(this, ...argument);
        }
      } else {
        compiler.options.devServer.after = utils.devService({ host, port, small: this.small });
      }
    });

    compiler.hooks.compilation.tap('QrCodeWebpackPlugin', (compilation, compilationParams) => {
      compilation.hooks.optimizeAssets.tap('QrCodeWebpackPlugin', (assets) => {
        Object.keys(compilation.assets).some(fileName => {
          if (/\.js$/.test(fileName)) {
            const { host, port } = compiler.options.devServer;

            compilation.assets[fileName] = new ConcatSource(
              utils.injectQrFn({ handle: this.fn, host, port }), compilation.assets[fileName],
            );
          }
        });
      });
    });
  }
}
module.exports = QrCodeWebpackPlugin;

