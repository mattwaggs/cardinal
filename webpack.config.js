var path                = require('path');
var webpack             = require('webpack');
var autoprefixer        = require('autoprefixer');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var extractCSS          = new ExtractTextPlugin('site.css');

var uglifyOptions = {
    mangle: true,
    compress:
    {
        screw_ie8: true,
        unused: true,
        dead_code: true,
        warnings: false,
        evaluate: true,
        drop_debugger: false,
        conditionals: true,
        drop_console: true,
        sequences: true,
        booleans: true,
        join_vars: true,
        if_return: true
    },
    compress: { warnings: false },
    output: {
        comments: false
    },
    exclude: [/\.min\.js$/gi] //skip pre-minified libs
}

module.exports = {
    cache: true,
    devtool: 'source-map',
    entry: { 'main': './src/index.tsx' },
    resolve: { 
        extensions: [ '.js', '.jsx', '.ts', '.tsx' ],
        modules: [
            path.resolve('./src'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, include: /src/, use: 'babel-loader' },
            { test: /\.tsx?$/, include: /src/, use: 'awesome-typescript-loader?silent=true' },
            {
                test: /\.sass$/,
                include: /src/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', { loader: 'postcss-loader', options: { plugins: function () { return [autoprefixer('last 2 versions')] } } }, 'sass-loader']
                })
            },
        ]
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        publicPath: '/dist/' // Webpack-dev-server
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                minified: true,
                postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
            }
        }),
        extractCSS,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(uglifyOptions)
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};