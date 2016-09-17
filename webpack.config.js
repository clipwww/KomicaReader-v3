var path = require('path');

module.exports = {
	entry: ['./src/main.js'],
	output:{
		path: path.join(__dirname, 'dist'),
		publicPath: "/dist/",
		filename: 'bundle.js'
	},
	module:{
		loaders:[
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loaders: ['style', 'css']
			},
			{
				test: /\.scss$/,
				loader: ["style", "css", "sass"]
			},
			{
				test: /\.(png|jpg|svg)$/,
				loader: 'file'
			},
			{
				test: /masonry-layout/,
				loader: 'imports?define=>false&this=>window'
			}
		]
	},
	babel:{
		presets: ['es2015'],
		plugins: ['transform-runtime']
	}
}