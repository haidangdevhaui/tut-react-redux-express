import path from 'path';
import webpack from 'webpack';
// import ExtractTextPlugin from 'extract-text-webpack-plugin'; import
import combineLoaders from 'webpack-combine-loaders';

export default {
    devtools : 'eval-sourse-map',
    entry : [
        path.join(__dirname, '/client/index.js'),
        'webpack-hot-middleware/client'
    ],
    output : {
        path: '/',
        publicPath: '/'
    },
    plugins : [
        new webpack.NoErrorsPlugin(),
        new webpack
            .optimize
            .OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        // new ExtractTextPlugin(path.join(__dirname, 'style.css'))
    ],
    module : {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.join(__dirname, 'client'),
                    path.join(__dirname, 'server/shared')
                ],
                loaders: ['babel']
            }, {
                test: /\.css$/,
                loader: combineLoaders([
                    {
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    }
                ])
            }
        ]
    },
    resolve : {
        extentions: ['', '.js']
    },
    node : {
        net: 'empty',
        dns: 'empty'
    }
}