const path = require('path');
const fs = require('fs');
const webpack = require('webpack')

const srcRoot = './src';
const devPath = './dev';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pageDir = path.resolve(srcRoot, 'page');
console.log(pageDir)
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
        if (fs.existsSync(fileName)) {
            htmlAarray.push(new HtmlWebpackPlugin({
                chunks: [key], // 注意这里的key就是chunk
                filename: key + '.html',
                template: fileName,
                chunksSortMode: 'auto'
            }))
        }
    });
    return htmlAarray;
}
console.log(htmlAarray(entryMap))
module.exports = {
    mode: 'development',
    devServer: {
        "contentBase": devPath, //表示server文件的根目录
        "compress": true,//表示开启gzip
        hot: true // 开启HMR
    },
    entry: entryMap,
    output: {
        path: path.resolve(__dirname, './dev'),
        filename: '[name].min.js'
    },
    // externals: {
    //     'react': 'React'
    // },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                include: path.resolve(srcRoot)
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
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
    plugins: [new webpack.ProvidePlugin({
        "React": "react",
    }), ...htmlAarray(entryMap)],

}