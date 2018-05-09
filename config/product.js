const webpack = require('webpack');
const path = require('path');
const config = require('./config.js');
const root = path.resolve(__dirname, '../');

const ExtractTextPlugin = require("extract-text-webpack-plugin");//提取css文件
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');// NOTE: Disused

module.exports = {
    entry: {
        app     : path.resolve(root, 'src/main.js'),
        vendors : config.vendors
    },
    output: {
        path            : path.resolve(root, 'dist'),
        filename        : 'js/[name].[hash].js',
        publicPath      : '/',
        chunkFilename   : 'js/[name].[chunkhash].js'
    },
    // 预处理加载器
    module: {
        // devtool: false,
        rules: [
            {
                test: /\.css|less$/,
                use:ExtractTextPlugin.extract({
                    fallback    : "style-loader",
                    use         : 'css-loader!postcss-loader!less-loader',
                    /*loaders: [
                        // 通过 loader 参数激活 source maps
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true, importLoaders: 1 }
                        },
                        {
                            loader: 'less-loader',
                            options: { sourceMap: true }
                        }
                    ],*/
                    publicPath  : '/'
                })
            }
        ]
    },
    //插件
    plugins: [
        //解决react打包构建时提示使用压缩后的React development
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:JSON.stringify("production")
            }
        }),

        /**
         * // NOTE: Disused but referenced
         * UglifyJsPlugin
         * 现在webpack4也不需要使用这个plugin了，只需要使用optimization.minimize为true就行，production mode下面自动为true
         * optimization.minimizer可以配置你自己的压缩程序
         * // js 压缩
         * // new webpack.optimize.UglifyJsPlugin(config.uglifyJsConfig),
         */

        // webpack 提取css为单文件
        // Webpack4 以后对 css 模块支持的逐步完善，建议使用 mini-css-extract-plugin 插件代替 extract-text-webpack-plugin 插件
        // NOTE: 2018-5-9 mini-css-extract-plugin 暂时不支持hmr
        new ExtractTextPlugin({
            filename    :'css/[name].[hash].css',
            allChunks   :true,//向所有额外的 chunk 提取（默认只提取初始加载模块）
        }),
        // webpack3 新特性作用域的提升
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};
