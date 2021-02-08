import { Plugin } from '@nuxt/types'
import { INuxtMapInstance, NuxtMapInstance } from '~/types/map/nuxtMapInstance'

declare module 'vue/types/vue' {
  interface Vue {
    $maps: INuxtMapInstance
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $maps: INuxtMapInstance
  }
  interface NuxtAppOptions {
    $maps: INuxtMapInstance
  }
}
declare module 'vuex/types/index' {
  interface Store<S> {
    $maps: INuxtMapInstance
  }
}

const mapInit: Plugin = (ctx, inject) => {
  const nuxtMapInstance: INuxtMapInstance = new NuxtMapInstance(ctx.env.GOOGLE_MAP_API)

  nuxtMapInstance.addScript()
  inject('maps', nuxtMapInstance)
}

export default mapInit
