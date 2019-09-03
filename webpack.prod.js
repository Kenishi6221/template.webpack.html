const merge = require('webpack-merge')
const common = require('./webpack.common')
const TerserPlugin = require('terser-webpack-plugin')
const MediaQueryPlugin = require('media-query-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

const webpackConfiguration = merge(common,
    {
        mode: 'production',
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        MediaQueryPlugin.loader
                    ],
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: './css/[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            }),
            new MediaQueryPlugin(
                {
                    include: [
                        'estilos'
                    ],
                    queries: {
                        'screen and (max-width: 1023px)': 'desktop',
                        'screen and (max-width:767px)': 'tablet',
                        'screen and (max-width:480px)': 'media',
                        'screen and (max-width:320px)': 'small'
                    }
                }
            )
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
    }
)

module.exports = webpackConfiguration