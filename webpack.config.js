const path = require('path');

module.exports = {
    entry: './src/main.tsx',
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: __dirname + '/build',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: 'ts-loader'
            }
        ]
    }
}
