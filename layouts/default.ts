import { Vue, Component, Prop, Ref } from 'nuxt-property-decorator'

import ColorModePicker from '~/components/ColorModePicker'

@Component({
  name: 'default',
  components: {
    ColorModePicker
  }
  //middleware: ['auth']
})
export default class Default extends Vue {
  @Ref() readonly citySearch!: HTMLInputElement

  mounted() {
    this.$maps.makeAutoComplete(this.citySearch)
  }

  changed(event: { detail: any }) {
    const place = event.detail
    if (!place.geometry) return

    this.$router.push({
      path: '/search',
      query: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        label: this.citySearch.value
      }
    })
  }
}
