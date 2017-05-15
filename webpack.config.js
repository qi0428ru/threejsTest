var path = require('path');

module.exports = {
   // entry: '../script/index.js',
   output: {
      // path: __dirname,
      filename: '[name].js'
   },
   module: {
      loaders: [
         { test: /\.css$/, loader: 'style!css' },
         { 
            test: /\.handlebars$/, 
            loader: 'handlebars-loader', 
            query: {
               helperDirs: path.resolve(__dirname, './gulp/handlebarsHelper') 
            }
         }/*,
         {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
               cacheDirectory: true,
               presets: [
                  ['es2015', {
                     'loose': true,
                     'modules': false
                  }],
                  'babel-preset-stage-0'
               ]
            }
         }*/
      ]
   }
};