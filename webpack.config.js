const webpackMerge = require('webpack-merge');

const env = process.env.NODE_ENV;
const commonConfig = require('./config/base.js');

if(env == 'development'){
    let develop = require('./config/develop.js');
    module.exports = webpackMerge(commonConfig,develop);
}else if(env == 'production'){
    let product = require('./config/product.js');
    module.exports = webpackMerge(commonConfig,product);
}
/**
 * webpack 4 features
 *
 * webpack 4 的默认值（约定）：
 *      entry 的默认值是 ./src
 *      output.path 的默认值是 ./dist
 *      mode 的默认值是 production
 *      UglifyJs 插件默认开启 caches 和 parallizes
 * ------------------------------------------
 * 在 develoment mode 默认
 *      开启 output.pathinfo
 *      关闭 optimization.minimize
 * ------------------------------------------
 * 在 production mode 默认
 *      关闭 in-memory caching
 *      开启 NoEmitOnErrorsPlugin
 *      开启 ModuleConcatenationPlugin
 *      开启 optimization.minimize
 */
