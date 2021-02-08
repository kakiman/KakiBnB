import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  name: 'error-404'
})
export default class Error404 extends Vue {
  @Prop({ type: Object, default: () => {} })
  error: any
}
