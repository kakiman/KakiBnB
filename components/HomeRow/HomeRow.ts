import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  name: 'home-row'
})
export default class HomeRow extends Vue {
  @Prop({ type: Object, required: true })
  home: Object

  pluralize(number: number, singularWord: any) {
    const text = `${number} ${singularWord}`
    if (number === 1) return text
    return text + 's'
  }
}
