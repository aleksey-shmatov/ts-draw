module.exports = {  
  entry: "./app/main.tsx",
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts(x?)$/, loader: 'ts-loader'}
    ]
  }
}
