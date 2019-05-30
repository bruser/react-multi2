const path = require('path');
const fs = require('fs');
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const srcRoot = './src';
const devPath = './dev';
const { server: serverConfig, htmlChunk, favicon } = require('./.compile');
const webpackConfig = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pageDir = path.resolve(srcRoot, 'page');
var merge = require('webpack-merge');


module.exports = merge(webpackConfig,{
    mode: 'development',
    devServer: {
        "contentBase": devPath, //表示server文件的根目录
        "compress": true,//表示开启gzip
        hot: true // 开启HMR
    },
    resolve: {
        alias: serverConfig.alias,
    }
})