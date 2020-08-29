const path = require('path')

module.exports = (_, { defaultConfig, nextConfig = {} }) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.resolve.alias['@'] = path.join(__dirname, './')
      config.resolve.alias['src'] = path.join(__dirname, 'src')
      const { isServer } = options
      nextConfig = Object.assign(
        { inlineImageLimit: 8192, assetPrefix: '' },
        nextConfig
      )

      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      config.module.rules.push({
        test: /\.(jpe?g|png|gif|ico|webp|jp2)$/,
        issuer: {
          // Next.js already handles url() in css/sass/scss files
          test: /\.\w+(?<!(s?c|sa)ss)$/i
        },
        exclude: nextConfig.exclude,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: nextConfig.inlineImageLimit,
              fallback: require.resolve('file-loader'),
              publicPath: `${nextConfig.assetPrefix}/_next/static/images/`,
              outputPath: `${isServer ? '../' : ''}static/images/`,
              name: '[name]-[hash].[ext]',
              esModule: nextConfig.esModule || false
            }
          }
        ]
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
