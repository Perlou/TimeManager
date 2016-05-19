var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		index: './src/index.js'
	},
	output: {
		path: path.join(__dirname,'dist'),
		publicPath: '/dist/',
		filename: 'index.bundle.js'
	},
	plugins: [
	    new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false
	      }
	    })
	],
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader'
			}
		]
	}	
};