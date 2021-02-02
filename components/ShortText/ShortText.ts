import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  name: 'short-text'
})
export default class ShortText extends Vue {
  @Prop({ type: String, required: true })
  text: string

  @Prop({ type: Number, required: true })
  target: number

  isExpanded: boolean = false
  chunks: Array<String> = []

  isTooLong() {
    return this.chunks.length === 2
  }

  displayText() {
    if (!this.isTooLong || this.isExpanded) return this.chunks.join(' ')
    return this.chunks[0] + '...'
  }

  created() {
    this.chunks = this.getChunks()
  }

  getChunks() {
    const position = this.text.indexOf(' ', this.target)
    if (this.text.length <= this.target || position === -1) return [this.text]
    return [this.text.substring(0, position), this.text.substring(position)]
  }
}
