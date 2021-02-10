import { Vue, Component } from 'nuxt-property-decorator'

import SvgIcon from '../SvgIcon'

@Component({
  name: 'color-mode-picker',
  components: {
    SvgIcon
  }
})
export default class ColorModePicker extends Vue {
  colors: string[] = ['system', 'light', 'dark', 'sepia']

  getClasses(color: string) {
    // Does not set classes on ssr when preference is system (because we don't know the preference until client-side)
    if (this.$colorMode.unknown) {
      return {}
    }
    return {
      preferred: color === this.$colorMode.preference,
      selected: color === this.$colorMode.value
    }
  }

  updateColorMode(color: string) {
    this.$colorMode.preference = color
  }
}
