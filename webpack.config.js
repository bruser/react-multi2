const path = require('path');
const fs = require('fs');
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const srcRoot = './src';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pageDir = path.resolve(srcRoot, 'page');
const { server: serverConfig, htmlChunk, favicon } = require('./.compile');
function getEntry() {
    let entryMap = {};
    fs.readdirSync(pageDir).forEach((pathname) => {
        let fullPathName = path.resolve(pageDir, pathname);
        let stat = fs.statSync(fullPathName);
        let fileName = path.resolve(fullPathName, 'index.js');
        if (stat.isDirectory() && fs.existsSync(fileName)) {
            entryMap[pathname] = fileName;
        }
    });
    return entryMap;
}
let entryMap = getEntry();
function htmlAarray(entryMap) {
    let htmlAarray = [];
    Object.keys(entryMap).forEach(function (key) {
        let fullPathName = path.resolve(pageDir, key);
        let fileName = path.resolve(fullPathName, 'index.html');
        let htmlConfig = {
            filename: key + '.html',
            template: fileName,
            title: key,
            headChunk: [],
            scriptChunk: []
        };
        if (htmlChunk) {
            let hc = htmlChunk["$all"] || {};
            if (hc.filename) htmlConfig.filename = hc.filename;
            if (hc.template) htmlConfig.template = hc.template;
            if (hc.title) htmlConfig.title = hc.title;
            if (hc.headChunk) htmlConfig.headChunk = hc.headChunk;
            if (hc.scriptChunk) htmlConfig.scriptChunk = hc.scriptChunk;
            if (htmlChunk[key]) {
                hc = htmlChunk[key];
                if (hc.filename) htmlConfig.filename = hc.filename;
                if (hc.template) htmlConfig.template = hc.template;
                if (hc.title) htmlConfig.title = hc.title;
                if (hc.headChunk) htmlConfig.headChunk = [...htmlConfig.headChunk, ...hc.headChunk];
                if (hc.scriptChunk) htmlConfig.scriptChunk = [...htmlConfig.scriptChunk, ...hc.scriptChunk];
            }
        }

        if (fs.existsSync(fileName)) {
            htmlAarray.push(new HtmlWebpackPlugin({
                // chunks: [key], // 注意这里的key就是chunk
                // filename: key + '.html',
                // template: fileName,
                filename: htmlConfig.filename,
                template: htmlConfig.template,
                title: htmlConfig.title,  //配合html-webpack-plugin的配置,
                chunks: [key],
                favicon,
                headChunk: htmlConfig.headChunk.join('\n'),
                scriptChunk: htmlConfig.scriptChunk.join('\n')
            }))
        }
    });
    return htmlAarray;
}

module.exports = {
    entry: entryMap,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './js/[name].[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    // options: {
                    //     hmr: process.env.NODE_ENV === 'development',
                    // },
                }, 'css-loader'],
                include: path.resolve(srcRoot),
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //     hmr: process.env.NODE_ENV === 'development',
                        // },
                    }, 'css-loader', 'sass-loader'],
                include: path.resolve(srcRoot)
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: 'url-loader?limit=8192&name=images/[name].[hash].[ext]',
                include: path.resolve(srcRoot)
                // limit:表示超过多少就使用base64来代替，单位是byte
                // name:可以设置图片的路径，名称和是否使用hash 具体参考这里
            },
            {
                test: /\.(js|jsx)$/,
                use: [{ loader: 'babel-loader' }],
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        alias: {
        },
        extensions: ['.js', '.jsx', '.tsx', '.css', '.scss']
    },
    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        ...htmlAarray(entryMap),
        new MiniCssExtractPlugin({
            filename: "./css/[name].[hash].css",
        })]
}