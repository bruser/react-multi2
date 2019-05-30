const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const srcRoot = './src';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pageDir = path.resolve(srcRoot, 'page');
const { server: serverConfig, htmlChunk, favicon } = require('./.compile');

const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
console.log(webpackConfig)
module.exports = merge(webpackConfig,{
    mode: 'production',
    resolve: {
        alias: serverConfig.alias,
    },
    plugins:[new CleanWebpackPlugin()]
})