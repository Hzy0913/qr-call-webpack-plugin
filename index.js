'use strict'
const ConcatSource = require('webpack-sources').ConcatSource;
const utils = require('./utils');

class QRCallWebpackPlugin {
  fn = 'qr'
  small = false

  constructor(options) {
    const { name, small } = options || {};
    this.fn = name;
    this.small = small || false;
  }

  apply(compiler, callback) {
    compiler.hooks.afterResolvers.tap('QRCallWebpackPlugin', () => {
      const { host, port, before } = compiler.options.devServer;
      const _self = this;

      if (before) {
        compiler.options.devServer.before = function afterServer(...argument) {
          before.call(this, ...argument);
          utils.devService({ host, port, small: _self.small }).call(this, ...argument);
        }
      } else {
        compiler.options.devServer.before = utils.devService({ host, port, small: this.small });
      }
    });

    compiler.hooks.compilation.tap('QRCallWebpackPlugin', (compilation, compilationParams) => {
      compilation.hooks.optimizeAssets.tap('QRCallWebpackPlugin', (assets) => {
        Object.keys(compilation.assets).some(fileName => {
          if (/\.js$/.test(fileName)) {
            const { port } = compiler.options.devServer;

            compilation.assets[fileName] = new ConcatSource(
              utils.injectQrFn({ handle: this.fn, port }), compilation.assets[fileName],
            );
          }
        });
      });
    });
  }
}

module.exports = QRCallWebpackPlugin;

