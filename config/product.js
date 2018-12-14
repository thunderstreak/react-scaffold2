const webpack = require('webpack');
const path = require('path');
const config = require('./config.js');
const root = path.resolve(__dirname, '../');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");//提取css文件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');// NOTE: Disused

module.exports = {
    entry: {
        app     : path.resolve(root, 'src/main.js'),
        vendors : config.vendors
    },
    output: {
        path            : path.resolve(root, 'dist'),
        filename        : 'js/[name].[hash].js',
        publicPath      : '/',// 上线的地址CDN
        chunkFilename   : 'js/[name].[chunkhash].js',
    },
    // 预处理加载器
    module: {
        // devtool: false,
        rules: [
            {
                test: /\.css|less$/,
                use:ExtractTextPlugin.extract({
                    fallback    : "style-loader",
                    use         : ['postcss-loader','css-loader','less-loader'],
                    publicPath  : '/'
                }),
                include:path.join(__dirname,'src'),
                exclude:/node_modules/
            },

            /*{
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader', // 回滚
                    use:['postcss-loader','css-loader'],
                    publicPath:'/'
                }),
                include:path.join(__dirname,'src'),
                exclude:/node_modules/
            },
            {
                test:/\.less$/,
                use:ExtractTextPlugin.extract({ //分离less编译后的css文件
                    fallback:'style-loader',
                    use:['postcss-loader','less-loader'],
                    publicPath:'/'
                }),
                include:path.join(__dirname,'src'),
                exclude:/node_modules/
            },*/


            /* {
                 test:/\.css/,
                 use:[MiniCssExtractPlugin.loader,"css-loader",{
                     loader: "postcss-loader",
                     options: {
                         plugins: () => [require('autoprefixer')],
                     }
                 }]
             },
             {
                 test:/\.less$/,
                 use:[MiniCssExtractPlugin.loader,"css-loader",{
                     loader: "postcss-loader",
                     options: {
                         plugins: () => [require('autoprefixer')],
                     }
                 },"less-loader"]
             },*/
        ]
    },
    // webpack 4 移除 CommonsChunkPlugin，取而代之的是两个新的配置项(optimization.splitChunks 和 optimization.runtimeChunk)
    optimization: {
        splitChunks: {
            chunks: 'initial', // 只对入口文件处理
            cacheGroups: {
                vendors: {//key 为entry中定义的 入口名称
                    test        : chunk => ( chunk.resource && /\.js$/.test(chunk.resource) && /node_modules/.test(chunk.resource) ),
                    chunks      : 'initial',
                    name        : 'vendors',
                },
                'async-vendors': {
                    test        : /[\\/]node_modules[\\/]/,
                    minChunks   : 2,
                    chunks      : 'async',
                    name        : 'async-vendors'
                },
            }
        },
        runtimeChunk: {
            name: 'runtime'
        },
        minimizer: [
            new UglifyJsPlugin({
                cache       : true,
                parallel    : true,
                sourceMap   : true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    //插件
    plugins: [
        //解决react打包构建时提示使用压缩后的React development
        // new webpack.DefinePlugin({
        //     'process.env':{
        //         NODE_ENV:JSON.stringify("production")
        //     }
        // }),

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
        /*new MiniCssExtractPlugin({
            filename        : "css/[name].css",
            chunkFilename   : "[id].css"
        }),*/
        // webpack3 新特性作用域的提升
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
};
