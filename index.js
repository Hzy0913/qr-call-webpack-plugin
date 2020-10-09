'use strict'
const ConcatSource = require('webpack-sources').ConcatSource;
const utils = require('./utils');

class QRCallWebpackPlugin {
  constructor(options) {
    const { name, small, fileNames } = options || {};
    this.fn = name || 'qr';
    this.small = small || false;
    this.fileNames = fileNames;
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
        const fileNames = this.getConcatSourceFiles();
        Object.keys(assets).forEach(fileName => {
          if (/\.js$/.test(fileName)) {
            if (fileNames) {
              const isConcatSourceFile = fileNames.find(itemName => fileName.includes(itemName));
              return isConcatSourceFile && this.concatSource(compiler, compilation, fileName);
            }

            this.concatSource(compiler, compilation, fileName);
          }
        });
      });
    });
  }

  concatSource(compiler, compilation, fileName) {
    const { port } = compiler.options.devServer;

    compilation.assets[fileName] = new ConcatSource(
      utils.injectQrFn({ handle: this.fn, port }), compilation.assets[fileName],
    );
  }

  getConcatSourceFiles() {
    if (!this.fileNames) return;

    const fileNames = Array.isArray(this.fileNames) ? this.fileNames : [this.fileNames];
    return fileNames.map(name => name.split('.js')[0]);
  }
}

module.exports = QRCallWebpackPlugin;

