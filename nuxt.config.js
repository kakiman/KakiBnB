export default {
    components: true,
    head: {
        titleTemplate: "Mastering Nuxt: %s",
        htmlAttrs: {
            lang: "en"
        },
        bodyAttrs:{
            class: ["my-style"]
        },
        meta: [{
            charset: "utf-8",
        }]
    },
    router: {
        prefetchLinks: false,
    },
    plugins:[ '~/plugins/maps.client', '~/plugins/dataApi' ],
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
