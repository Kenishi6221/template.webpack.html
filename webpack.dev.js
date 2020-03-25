const merge = require('webpack-merge')
const common = require('./webpack.common')

const webpackConfiguration = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        publicPath: '/',
    },
    devServer: {
        host: '0.0.0.0',
        compress: true,
        inline: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            }
        ]
    }
})

module.exports = webpackConfiguration