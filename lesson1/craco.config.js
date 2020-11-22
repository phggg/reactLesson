// * 配置完成后记得重启下
/**
 * TODO: 区分环境 —— NODE_ENV
 * - whenDev ☞ process.env.NODE_ENV === 'development'
 * - whenTest ☞ process.env.NODE_ENV === 'test'
 * - whenProd ☞ process.env.NODE_ENV === 'production'
 */
const {
  when,
  whenDev,
  whenProd,
  whenTest,
  ESLINT_MODES,
  POSTCSS_MODES,
} = require('@craco/craco')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const CracoLessPlugin = require('craco-less')
const WebpackBar = require('webpackbar')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const fastRefreshCracoPlugin = require('craco-fast-refresh')
const CracoVtkPlugin = require('craco-vtk')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');
const dashboard = new Dashboard();

const path = require('path')

// 判断编译环境是否为生产
const isBuildAnalyzer = process.env.BUILD_ANALYZER === 'true'

module.exports = {
  webpack: {
    plugins: [
      // webpack构建进度条
      new WebpackBar(),

      // new SimpleProgressWebpackPlugin(),

      ...whenDev(

        () => [
          // console.log(1213123),
          new CircularDependencyPlugin({
            exclude: /node_modules/,
            include: /src/,
            failOnError: true,
            allowAsyncCycles: false,
            cwd: process.cwd(),
          }),
          // webpack-dev-server 强化插件
          // new DashboardPlugin(dashboard.setData),
          // new webpack.HotModuleReplacementPlugin(),
        ], [],
      ),
      /**
       * 编译产物分析
       *  - https://www.npmjs.com/package/webpack-bundle-analyzer
       * 新增打包产物分析插件
       */
      ...when(
        isBuildAnalyzer, () => [
          new BundleAnalyzerPlugin({
            analyzerMode: 'static', // html 文件方式输出编译分析
            openAnalyzer: false,
            reportFilename: path.resolve(__dirname, `analyzer/index.html`),
          }),
        ], [],
      ),
      ...whenProd(
        () => [
          // new TerserPlugin({
          //   // sourceMap: true, // Must be set to true if using source-maps in production
          //   terserOptions: {
          //     ecma: undefined,
          //     parse: {},
          //     compress: {
          //       warnings: false,
          //       drop_console: true, // 生产环境下移除控制台所有的内容
          //       drop_debugger: true, // 移除断点
          //       pure_funcs: ['console.log'] // 生产环境下移除console
          //     }
          //   }
          // }),
          // 打压缩包
          new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
            threshold: 1024,
            minRatio: 0.8,
          }),
        ], [],
      ),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true,
          },
        },
      },
    },

  },
  babel: {
    //用来支持装饰器
    plugins: [['@babel/plugin-proposal-decorators', {legacy: true}]],
  },
  plugins: [
    // {
    //   plugin: fastRefreshCracoPlugin,
    // },
    // ...whenDev(
    //   () => [
    //     {
    //       plugin: fastRefreshCracoPlugin,
    //     },
    //   ],
    //   [],
    // ),
    // {
    //   plugin: CracoLessPlugin,
    //   options: {
    //     lessLoaderOptions: {
    //       lessOptions: {
    //         modifyVars: {
    //           '@primary-color': 'red',
    //           '@border-color-base': 'green',
    //           '@link-color': 'orange',
    //         },
    //         javascriptEnabled: true,
    //       },
    //     },
    //   },
    // },
  ],
}
