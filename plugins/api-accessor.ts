import { Plugin } from '@nuxt/types'
import { initializeApi } from '~/utils/api'
import { NuxtApiInstance } from '~/types'
import { INuxtApiInstance } from '~/types/api/nuxtApiInstance'

declare module 'vue/types/vue' {
  interface Vue {
    $api: INuxtApiInstance
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $api: INuxtApiInstance
  }
  interface NuxtAppOptions {
    $api: INuxtApiInstance
  }
}
declare module 'vuex/types/index' {
  interface Store<S> {
    $api: INuxtApiInstance
  }
}

const accessor: Plugin = (ctx, inject) => {
  ctx.env.algoliaWsURL = ctx.env.algoliaWsURL.replace(/([APP_ID])\w+/g, ctx.env.ALGOLIA_APP_ID)
  const nuxtApiInstance: INuxtApiInstance = new NuxtApiInstance(
    ctx.app.$axios,
    ctx.env.isLocal,
    ctx.env.algoliaWsURL,
    ctx.env.ALGOLIA_APP_ID,
    ctx.env.ALGOLIA_API_KEY
  )
  inject('api', nuxtApiInstance)
  initializeApi(nuxtApiInstance, ctx.$dateFns, ctx.app.i18n)
}

export default accessor
