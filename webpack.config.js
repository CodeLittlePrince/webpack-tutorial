const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const PRODUCTION = process.env.NODE_ENV === 'production',
      DEVELOPMENT = process.env.NODE_ENV === 'development';

let devtool,                // 设置source-map的类型
    filename,               // 设置js和css生成的名字
    outputPath,             // 指定输出的路径
    pathsToClean,           // 删除指定文件夹的路径
    imageUse;               // 设置使用的图片工具

if (DEVELOPMENT) {
    devtool = 'cheap-module-eval-source-map';
    filename = {
        js: 'js/[name].js',
        css: 'css/[name].css',
    };
    outputPath = path.resolve(__dirname, 'dev');
    pathsToClean = [];
    imageUse = [
        'url-loader?limit=20000&name=img/[name]-[hash:12].[ext]'
    ];
}else{
    devtool = 'cheap-module-source-map';
    filename = {
        js: 'js/[name]-[chunkhash].js',
        css: 'css/[name]-[chunkhash].css',
    };
    outputPath = path.resolve(__dirname, 'dist');
    pathsToClean = ['dist'];
    imageUse = [
        'url-loader?limit=20000&name=img/[name]-[hash:12].[ext]',
        'image-webpack-loader?{pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
    ];
}

module.exports = {
    devtool: devtool,
    resolve: {
        alias: {
            js: path.resolve(__dirname, 'src/js/'),
            scss: path.resolve(__dirname, 'src/scss/'),
            img: path.resolve(__dirname, 'src/img/')
        }
    },
	entry: {
        index: './src/js/index',
        page1: './src/js/page1',
        page2: './src/js/page2'
    },
	output: {
		path: outputPath,
		// publicPath: '/dist/',
        publicPath: '/',
		filename: filename.js
    },
    externals: [
        'jQuery'
    ],
    module: {
        rules: [
        	{
    	        test: /\.scss$/,
    	        use: ExtractTextPlugin.extract({
    	            fallback: 'style-loader',
    	            //resolve-url-loader may be chained before sass-loader if necessary
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        }, 
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
    	        }),
                exclude: '/node_modules/'
    	    },
        	{
        		test: /\.js$/,
        		use: [
        			'babel-loader'
        		],
        		exclude: '/node_modules/'
        	},
        	{
        		test: /\.(png|svg|jpg|gif)$/,
        		use: imageUse,
        		exclude: '/node_modules/'
        	}
        ]
    },
    plugins: [
    	new CleanWebpackPlugin(pathsToClean),
    	new ExtractTextPlugin({
            filename: filename.css,
            disable: DEVELOPMENT
        }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/tpl/index.html',
            chunks: ['index'],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            // favicon: './src/img/favicon.ico',
            filename: './page1.html', //生成的html存放路径，相对于path
            template: './src/tpl/page1.html',
            chunks: ['page1'], //需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件  
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new HtmlWebpackPlugin({
            // favicon: './src/img/favicon.ico',
            filename: './page2.html',
            template: './src/tpl/page2.html',
            chunks: ['page2'],
            minify: { //压缩HTML文件  
                removeComments: true,
                collapseWhitespace: false
            }
        }),
    	new BrowserSyncPlugin({
    		host: 'localhost',
    		port: 7777,
    		server: {
    			baseDir: ['./dist', './dev']
    		}
    	}),
        new webpack.optimize.ModuleConcatenationPlugin()
    ]
}