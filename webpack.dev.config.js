const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')



module.exports = {
    /**
    * ------------------------------------------------------------------------
    *     ENTRY - POINTS
    * ------------------------------------------------------------------------
    **/
  entry: {
    app: path.resolve(__dirname,'src/main.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    // lee desde esta ruta
    // publicPath: 'dist/',
    publicPath: 'http://localhost:5454/',
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  // CONFIG SERVER
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    // open: true,
    port: 5454,
    hot: true,
  },
  resolve: {
    alias: {
      // se usa cuando eventualmente se cambia de ruta
      '@': path.resolve(__dirname, 'src')
    }
  },
    /**
    * ------------------------------------------------------------------------
    *     LOADERS - interpreta tipos de archivos
    * ------------------------------------------------------------------------
    **/
  module: {
    rules: [
      // VUE
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      // JS _ BABEL
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    // CSS _ POSTCSS
    {
      test: /\.css|postcss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },
        'postcss-loader'
      ]
    },
    // SASS
      // {
      //   test: /\.scss$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //     },
      //     'css-loader',
      //     'sass-loader',
      //   ]
      // },
    // URL - LOADER
      {
        test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
        use: {
          /// exporta los archivos
          loader: 'file-loader',
          options: {
            outputPath: 'assets/',
          }
        }
      },
    ]
  },
    /**
    * ------------------------------------------------------------------------
    *     PLUGINS - extienden las funcionalidades de los loader
    * ------------------------------------------------------------------------
    **/
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
    // cuando renderizas archivos react
      template: path.resolve(__dirname, 'public/index.html')
    }),
  ],
}