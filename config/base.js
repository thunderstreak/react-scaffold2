const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const CleanPlugin = require("clean-webpack-plugin");//清空文件夹
const HtmlWebpackPlugin = require('html-webpack-plugin');// 引入html-webpack-plugin
// const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');//长效缓存

// const ManifestPlugin = require('webpack-manifest-plugin');
// const WebpackChunkHash = require('webpack-chunk-hash');

const config = require('./config.js');
const root = path.resolve(__dirname, '../');

module.exports = {
    /**
     * [mode description] for wwebpack 4
     * @type {String}
     * 新增了mode/--mode参数来表示是开发还是生产，
     * mode有两个可选值：development和production，production不支持监听，production侧重于打包后的文件大小，development侧重于构建的速度。
     */
    mode: process.env.NODE_ENV,
    context : path.resolve(root, 'src'),//基础目录，绝对路径，用于从配置中解析入口起点(entry point)和加载器(loader)
    //入口文件配置解析类型
    resolve: {
        alias:{
            'SRC'         :path.resolve(root,'src/'),
            'COMPONENTS'  :path.resolve(root,'src/components'),
            'IMAGES'      :path.resolve(root,'src/images'),
            'JAVASCRIPT'  :path.resolve(root,'src/javascript'),
            'STORES'      :path.resolve(root,'src/stores'),
            'STYLES'      :path.resolve(root,'src/styles'),
            'TOOLS'       :path.resolve(root,'src/tools')
        },//路径优化
        extensions  : ['.js', '.jsx', '.json'],//自动扩展文件后缀名
        modules     : [ 'node_modules' ],
    },
    // 预处理加载器
    module: {
        rules: [
            /**
             * type: "javascript/auto"
             * webpack4支持多种形式的模块类型，但是有时候可能需要加上type进行配合
             * 如果是CommonJS, AMD, ESM三种类型的模块，使用javascript/auto；
             * 如果是EcmaScript modules(.mjs)，使用javascript/esm，其他的模块类型将不生效；
             * 如果只有CommonJS和EcmaScript modules不可用，使用javascript/dynamic；
             * 如果是json类型的文件，允许使用require和import来导入json，使用json；
             *      支持ES6的方式导入JSON文件，并且可以过滤无用的代码,下面是三种导入json文件的方法：
             *          ***
             *          let jsonData = require('./data.json');
             *          import jsonData from './data.json';
             *          import { first } from './data.json'
             *          其中使用import { first } from './data.json'引入的json文件会忽略没导入的代码，打包时只会将first的打进去
             *          ***
             * 如果是Webassembly，使用webassembly/experimental —— 官方说是一个实验性的功能。
             * */

            {
                test: /\.json$/,
                type: "javascript/auto"
            },
            {
                test: /\.js|.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
                loader: 'url-loader?limit=8192&name=images/[name].[hash].[ext]'
            }
        ]
    },
    // webpack 4 移除 CommonsChunkPlugin，取而代之的是两个新的配置项(optimization.splitChunks 和 optimization.runtimeChunk)
    optimization: {
        splitChunks: {
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
                }
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    //插件
    plugins: [
        // 清空指定文件夹
        new CleanPlugin(['dist']),

        // autoprefixer 是 postcss-loader 的 插件，需要在这里进行 autoprefixer 插件的配置
        new webpack.LoaderOptionsPlugin({
            options: {
                context: '/',
                minimize: true,
                postcss: [autoprefixer(config.autoConfig)]
            }
        }),

        /*// NOTE: Disused but referenced
        // 提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            names: [
                'vendors', 'manifest' // manifest 用于分离 webpack runtime
            ],
            filename    : 'js/[name].[hash].js', // 公共模块文件名
            minChunks   : Infinity,     // Infinity 表示仅仅创建公共组件块，不会把任何modules打包进去。
            // children    : true,//将公共模块打包进父 chunk
        }),*/

        /**
         * [SplitChunksPlugin description]
         *      chunks: 表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
         *      minSize: 表示在压缩前的最小模块大小，默认为0(kb)；
         *      minChunks: 表示被引用次数，默认为1；
         *      maxAsyncRequests: 最大的按需(异步)加载次数，默认为5；
         *      maxInitialRequests: 最大的初始化加载次数，默认为3；
         *      name: 拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
         *      cacheGroups: 缓存组。
         * ----------------------
         * 如果不在缓存组中重新赋值，缓存组默认继承上面的选项，但是还有一些参数是必须在缓存组进行配置的。
         *      priority: 表示缓存的优先级；
         *      test: 缓存组的规则，表示符合条件的的放入当前缓存组，值可以是function、boolean、string、RegExp，默认为空；
         *      reuseExistingChunk: 表示可以使用已经存在的块，即如果满足条件的块已经存在就使用已有的，不再创建一个新的块。
         * ----------------------
         * 下面的代码就表示，在所有代码中，引用模块大小最小为20kb，引用次数最少为1次，按需加载最大请求次数为5，初始化加载最大请求次数为3的所有模块就行拆分到一个单独的代码块中，name表示代码的名字，设置为true则表示根据模块和缓存组秘钥自动生成。
         * new webpack.optimize.SplitChunksPlugin({
         *      chunks              : "all",
         *      minSize             : 20000,
         *      minChunks           : 1,
         *      maxAsyncRequests    : 5,
         *      maxInitialRequests  : 3,
         *      name                : true
         * }),
         */

        /*new webpack.optimize.SplitChunksPlugin({
            chunks              : "all",
            minSize             : 30000,
            minChunks           : 1,
            maxAsyncRequests    : 5,
            maxInitialRequests  : 3,
            name                : true,
            cacheGroups: {
                default: {
                    minChunks           : 2,
                    priority            : -20,
                    reuseExistingChunk  : true,
                },
                vendors: {
                    test                : /[\\/]node_modules[\\/]/,
                    priority            : -10
                }
            }
        }),*/

        //添加任何新的本地依赖，对于每次构建，vendor hash 都应该保持一致：
        new webpack.HashedModuleIdsPlugin(),
        // new ManifestPlugin(),//生成manifest.json
        // new WebpackChunkHash(),

        // 将 manifest 提取到一个单独的 JSON 文件中
        /*new ChunkManifestPlugin({
            filename            : 'chunk-manifest.json',
            manifestVariable    : 'webpackManifest' // 全局变量的名称，webpack 将利用它查找 manifest JSON 对象
        }),*/

        new HtmlWebpackPlugin({
            title    : 'React SPA应用',//标题名称
            // favicon  : 'asset/favicon.ico', //favicon路径
            hash     : true, //开启hash值验证
            filename : 'index.html', //输出入口文件
            template : path.resolve('src/template', 'index.html'), //模板文件路径
            // chunks   : ['app', 'vendors', 'manifest'],//需要注入的文件块
            inject   : true, //注入资源到template中(true|'head'|'body'|false)
            cache    : false,
            minify   : { //压缩HTML文件
            	removeComments      : true, //移除HTML中的注释
            	collapseWhitespace  : true //删除空白符与换行符
            },
            chunksSortMode: 'none', //如果使用webpack4将该配置项设置为'none'
            // showErrors:true,//显示错误警告到页面上？？？
            // chunksSortMode: 'dependency',//必须通过上面的 CommonsChunkPlugin 的依赖关系自动添加 js，css 等
        }),
    ]
};
