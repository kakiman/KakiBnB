import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  name: 'error-500'
})
export default class Error500 extends Vue {
  @Prop({ type: Object, default: () => {} })
  error: any
}
