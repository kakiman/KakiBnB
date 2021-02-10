<template>
  <div class="nuxt-error">
    <component :is="errorPage" :error="error" />
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

import error404 from '~/components/Errors/404'
import error500 from '~/components/Errors/500'

@Component({
  name: 'nuxt-error',
  //middleware: ['auth'],
  components: {
    error404,
    error500
  }
})
export default class NuxtError extends Vue {
  layout: 'default'

  @Prop({ type: Object, default: () => {}, required: true })
  error: any

  head() {
    return {
      title: 'erreur ' + this.error.statusCode
    }
  }

  get errorPage(): any {
    if (this.error.statusCode === 404) {
      return error404
    }
    // catch everything else
    return error500
  }
}
</script>
