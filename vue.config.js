module.exports={
  publicPath: process.env.NODE_ENV === 'production'
      ? '/'
      : '/',
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是<title><%= htmlWebpackPlugin.options.title %></title>
      title: '选课系统',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/main.js'
  },
  devServer: {
    host: "localhost",
    port: 8080, // 端口号
    https: false,
    open: true, //配置自动启动浏览器
    overlay: {//报错提示
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:80',
        ws: true,//proxy websockets
        changeOrigin: true//跨域
      }
    }
  },
  css: {
    // extract:true,//生成环境默认true,开发模式true不会热更新
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  },
  outputDir:'dist',
  assetsDir:'assets'
}
