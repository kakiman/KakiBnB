process.env.VUE_APP_VERSION = require('./package.json').version

export default {
  ssr: false,
  telemetry: false, // Nouveau dans Nuxt 2.13 https://github.com/nuxt/telemetry#opting-out
  server: {
    port: 3001 // pour recette
  },
  env: {
    isLocal: process.env.NODE_ENV === 'local',
    appVersion: process.env.VUE_APP_VERSION,
    algoliaAppId: process.env.ALGOLIA_APP_ID,
    algoliaApiKey: process.env.ALGOLIA_API_KEY,
    algoliaWsURL: 'https://' + process.env.ALGOLIA_APP_ID + '-dsn.algolia.net/1/indexes/'
  },
  components: true,
  head: {
    titleTemplate: 'Mastering Nuxt: %s',
    htmlAttrs: {
      lang: 'en'
    },
    bodyAttrs: {
      class: ['my-style']
    },
    meta: [
      {
        charset: 'utf-8'
      }
    ]
  },
  router: {
    prefetchLinks: false
  },
  plugins: ['~/plugins/maps.client', '~/plugins/api-accessor'],
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // Doc: https://github.com/nuxt-community/date-fns-module
    '@nuxtjs/date-fns',
    // Doc: https://github.com/nuxt-community/device-module
    '@nuxtjs/device',
    // Doc: https://nuxt-community.github.io/nuxt-i18n/
    'nuxt-i18n',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss']
}
