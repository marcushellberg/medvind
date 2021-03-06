/**
 * This file contains project specific customizations for the webpack build.
 * It is autogenerated if it didn't exist or if it was made for an older
 * incompatible version.
 *
 * Defaults are provided in an autogenerated webpack.generated.js file and used by this file.
 * The webpack.generated.js file is overwritten on each build and no customization can be done there.
 */
const merge = require('webpack-merge');
const flowDefaults = require('./webpack.generated.js');

// TODO: override properly. This is just copy-pasted from the generated config
const themePartRegex = /(\\|\/)themes\1[\s\S]*?\1/;
const devMode = process.argv.find((v) => v.indexOf('webpack-dev-server') >= 0);

flowDefaults.module.rules = [
  {
    test: /\.ts$/,
    loader: 'ts-loader',
    options: {
      transpileOnly: true,
      experimentalWatchApi: true,
    },
  },
  {
    test: /\.css$/i,
    use: [
      {
        loader: 'lit-css-loader',
      },
      {
        loader: 'extract-loader',
      },
      {
        loader: 'css-loader',
        options: {
          url: (url, resourcePath) => {
            // Only translate files from node_modules
            const resolve = resourcePath.match(/(\\|\/)node_modules\1/);
            const themeResource = resourcePath.match(themePartRegex) && url.match(/^themes\/[\s\S]*?\//);
            return resolve || themeResource;
          },
          // use theme-loader to also handle any imports in css files
          importLoaders: 1,
        },
      },
      {
        loader: 'postcss-loader',
      },
      {
        // theme-loader will change any url starting with './' to start with 'VAADIN/static' instead
        // NOTE! this loader should be here so it's run before css-loader as loaders are applied Right-To-Left
        loader: '@vaadin/theme-loader',
        options: {
          devMode: devMode,
        },
      },
    ],
  },
  {
    // File-loader only copies files used as imports in .js files or handled by css-loader
    test: /\.(png|gif|jpg|jpeg|svg|eot|woff|woff2|otf|ttf)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          outputPath: 'VAADIN/static/',
          name(resourcePath, resourceQuery) {
            if (resourcePath.match(/(\\|\/)node_modules\1/)) {
              return /(\\|\/)node_modules\1(?!.*node_modules)([\S]+)/.exec(resourcePath)[2].replace(/\\/g, '/');
            }
            if (resourcePath.match(/(\\|\/)flow-frontend\1/)) {
              return /(\\|\/)flow-frontend\1(?!.*flow-frontend)([\S]+)/.exec(resourcePath)[2].replace(/\\/g, '/');
            }
            return '[path][name].[ext]';
          },
        },
      },
    ],
  },
];

/**
 * To change the webpack config, add a new configuration object in
 * the merge arguments below:
 */
module.exports = merge(
  flowDefaults
  // Override default configuration
  // {
  //   mode: 'development',
  //   devtool: 'inline-source-map',
  // },

  // Add a custom plugin
  // (install the plugin with `npm install --save-dev webpack-bundle-analyzer`)
  // {
  //   plugins: [
  //     new require('webpack-bundle-analyzer').BundleAnalyzerPlugin({
  //       analyzerMode: 'static'
  //     })
  //   ]
  // },
);
