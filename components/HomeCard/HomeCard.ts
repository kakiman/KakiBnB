import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  name: 'home-card'
})
export default class HomeCard extends Vue {
  @Prop({ type: Object, required: true })
  home: Object
}
