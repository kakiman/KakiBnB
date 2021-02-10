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
    algoliaWsURL: 'https://APP_ID-dsn.algolia.net/1/indexes/'
  },
  components: [
    {
      path: '~/components/',
      pattern: '**/*.vue'
    },
    {
      path: '~/components/Errors',
      pattern: '**/*.vue',
      prefix: 'err'
    }
  ],
  head: {
    titleTemplate: '%s | KakiBnB',
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
    'nuxt-i18n'
  ],
  buildModules: ['@nuxtjs/dotenv', '@nuxt/typescript-build', '@nuxtjs/tailwindcss'],
  dotenv: {
    path: './env/',
    filename: `.env.${process.env.NODE_ENV}`
  },
  dateFns: {
    locales: ['en-GB', 'fr'],
    defaultLocale: 'fr',
    format: 'MMM yyyy'
  },
  i18n: {
    // langue par défaut
    defaultLocale: 'fr',
    // changement en mode lazy des langues
    lazy: true,
    // dossier contenant les fichiers de langues
    langDir: 'i18n/',
    // liste des locales
    locales: [
      {
        name: 'Français',
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr-FR.js'
      },
      {
        name: 'English',
        code: 'en',
        iso: 'en-GB',
        file: 'en-GB.js'
      }
    ],
    vueI18nLoader: false,
    // seo désactivé pour le moment, potentiel problème avec le module d'authentification, test plus poussé à prévoir
    seo: false,
    // détection de la langue via un cookie
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'tkm_i18n',
      alwaysRedirect: true
    }
  },
  typescript: {
    typeCheck: false
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ['vee-validate/dist/rules']
    /*babel: {
			plugins: [
				['@babel/plugin-transform-typescript', { preserveConstEnums: true }],
				['@babel/plugin-proposal-decorators', { legacy: true }],
				['@babel/plugin-proposal-class-properties', { loose: true }],
			],
		},*/
  }
}
