const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const fs = require('fs');


const getEntry = {
    entry:function(dirPath,option){
        const fileArr = fs.readdirSync(dirPath);
        const files = fileArr.filter(function(file){
            return option.test(file);
        });

        const entries = {};
        let dirname;
        let basename;
        let extname;
        for(let i = 0;i<files.length;i++){
            dirname = path.dirname(files[i]);
            extname = path.extname(files[i]);
            basename = path.basename(files[i],extname);
            entries[basename] = dirPath + basename +extname;
        }
        return entries;
    }
};


const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = {
    /*entry: path.join(__dirname, "src/index.js"),
    output: {
        path: path.join(__dirname, "public"),
        filename: "xxz.js"
    },*/
    entry:getEntry.entry('./src/',/\^*.js$/),
    output:{
        path:__dirname + '/public',
        filename:'[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use: extractLess.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
        }]
    },
    plugins: [
        extractLess
        //new ExtractTextPlugin('[name].css')
        //if you want to pass in options, you can do so:
        //new ExtractTextPlugin({
        //  filename: 'style.css'
        //})
    ]
}