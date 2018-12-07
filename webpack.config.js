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
    filename: "/css/[name].css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = {
    entry:getEntry.entry('./src/',/\^*.js$/),
    output:{
        path:__dirname + '/public',
        filename:'[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.less$/,
            use:[{
                loader: "style-loader"
                },{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }]
            /*extractLess.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "less-loader"
                }],
                // use style-loader in development
                fallback: "style-loader"
            })*/
        }]
    },
    plugins: [
        //extractLess
    ]
};
