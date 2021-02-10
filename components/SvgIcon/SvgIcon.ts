import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component({
  name: 'svg-icon'
})
export default class SvgIcon extends Vue {
  @Prop({ type: String, required: true })
  name: string

  get src() {
    console.log('name : ' + this.name)
    const src = require(`~/assets/icons/${this.name}.svg?raw`)
    return src
  }
}
