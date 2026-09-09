const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: `${process.env.BASENAME ?? ''}/`,
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.module\.scss$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: { localIdentName: '[local]--[hash:base64:5]' }, importLoaders: 1 } },
          { loader: 'sass-loader', options: { api: 'modern' } },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: ['style-loader', 'css-loader', { loader: 'sass-loader', options: { api: 'modern' } }],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [{ loader: '@svgr/webpack', options: { exportType: 'named' } }],
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name][ext]' },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './src/assets/clubs.svg',
    }),
    new webpack.DefinePlugin({
      'process.env.GRAPHQL_URL': JSON.stringify(
        process.env.GRAPHQL_URL ?? 'http://localhost:4000/graphql'
      ),
      'process.env.BASENAME': JSON.stringify(process.env.BASENAME ?? ''),
      'process.env.COGNITO_DOMAIN': JSON.stringify(
        process.env.COGNITO_DOMAIN ?? 'https://cicushik-sanakortit.auth.eu-west-1.amazoncognito.com'
      ),
      'process.env.COGNITO_CLIENT_ID': JSON.stringify(
        process.env.COGNITO_CLIENT_ID ?? '4pcrp9onths1jpkdrkh79ft2ou'
      ),
    }),
  ],
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
};
