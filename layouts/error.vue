<template>
  <div style="text-align: center;">
    <img src="https://media1.tenor.com/images/99f00b32545bf5b5db8bf8ecbb7f0aec/tenor.gif?itemid=7971019" />
    <br />
    <br />
    <h1>Error!</h1>
    {{ error.message }} {{ error.statusCode }}
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

  get errorPage(): any {
    if (this.error.statusCode === 404) {
      return error404
    }
    // catch everything else
    return error500
  }

  head() {
    return {
      title: 'BIG PROBLEMS'
    }
  }
}
</script>
