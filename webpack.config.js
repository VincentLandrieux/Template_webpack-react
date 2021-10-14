//---IMPORT---//
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

//---VARIABLE---//
// mode
const IS_DEV_MODE = process.env.NODE_ENV === "development";


// default css loaders
const cssLoaders = [
    IS_DEV_MODE ? "style-loader": {
        loader: MiniCssExtractPlugin.loader,
        options: {
            esModule: false,
        },
    },
    {
        loader: "css-loader",
        options: {
            importLoaders: 1,
            sourceMap: true,
        },
    },
];
// production mode loaders
if(!IS_DEV_MODE){
    cssLoaders.push({
        loader: "postcss-loader",
        options: {
            sourceMap: true,
        }
    });
}

const config = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
    },
    entry: {
        app: ["@css/style.scss", "@js/app.jsx"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: IS_DEV_MODE ? "[name].js" : "[name].[contenthash:8].js",
        clean: true,
        publicPath: "/",
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            "@css": path.resolve(__dirname, "src/styles"),
            "@js": path.resolve(__dirname, "src/scripts"),
        },
    },
    module: {
        rules: [
            {
                test: /\.(m?js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    "react-hot-loader/webpack",
                    "babel-loader",
                ],
            },
            {
                test: /\.css$/,
                use: cssLoaders,
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    ...cssLoaders,
                    {
                        loader: "sass-loader", 
                        options: { sourceMap: true } 
                    },
                ],
            },
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 8kb
                    }
                },
                generator: {
                    filename: 'images/[name].[contenthash:8][ext]'
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[contenthash:8][ext]'
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: false,
            template: './src/pages/index.html',
            title: 'Webpack template',
            chunks: ["app"],
        }),

        new MiniCssExtractPlugin({
            filename: IS_DEV_MODE ? "[name].css" : "[name].[contenthash:8].css",
            chunkFilename: "[id].css",
        }),
    ],
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
};

if(IS_DEV_MODE){
    
}else{
    config.mode = 'production';
    config.devtool = 'source-map';
    config.plugins.push(new WebpackManifestPlugin());
}

//---EXPORT---//
module.exports = config;