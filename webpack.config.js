const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'inline-source-map',
	entry: {
        index: './src/js/index',
        page1: './src/js/page1',
        page2: './src/js/page2'
    },
	output: {
		path: path.resolve(__dirname, 'dist'),
		// publicPath: '/dist/',
        publicPath: '/',
		filename: 'js/[name]-[chunkhash].js'
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
    	          use: ['css-loader', 'sass-loader']
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
        		use: [
        			'url-loader?limit=20000&name=img/[name]-[hash:12].[ext]',
        			'image-webpack-loader?{pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
        		],
        		exclude: '/node_modules/'
        	}
        ]
    },
    plugins: [
    	new CleanWebpackPlugin(['dist']),
    	new ExtractTextPlugin('css/[name]-[chunkhash].css'),
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
    			baseDir: ['./dist']
    		}
    	})
    ]
}