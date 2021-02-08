const path = require('path')
const { merge }= require('webpack-merge')
const config = require('./webpack.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(config,{
    mode:"development",
    output:{
        filename:"main.js",
        path:path.resolve(__dirname,'dev')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./src/index.html"
        })
    ],
    module:{
        rules:[{
            test:/\.scss$/,
            use:['style-loader','css-loader','sass-loader']
        }]
    },
})