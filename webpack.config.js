// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = MiniCssExtractPlugin.loader;



const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean:true,
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'pablick' ,'index.html'),
        }),

        new MiniCssExtractPlugin(),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, {
                    loader:'css-loader',
                    options:{
                        importLoaders: 1,
                        modules:{
                            localIdentName:'[name]__[local]--[hash:base64:5]',
                        },
                }
                },
                 'postcss-loader'],
                include: /\.module\.css$/,
            },
            {
                test: /\.css$/,
                use: [stylesHandler, "css-loader",'postcss-loader'],
                exclude: /\.module\.css$/,
              },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
     
    },
    optimization:{
        minimizer:[new CssMinimizerPlugin()]
    }
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        config.target = 'browserslist'
        
        
        
    } else {
        config.mode = 'development';
        config.devtool = 'source-map'
    }
    return config;
};
