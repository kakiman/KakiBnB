import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  name: 'short-text'
})
export default class ShortText extends Vue {
  @Prop({ type: String, required: true, default: '' })
  text: string

  @Prop({ type: Number, required: true, default: 0 })
  target: number

  isExpanded: boolean = false
  chunks: String[] = []

  created() {
    this.chunks = this.getChunks()
  }

  get isTooLong() {
    return this.chunks.length === 2
  }

  get displayText() {
    return this.isTooLong ? (this.isExpanded ? this.chunks.join(' ') : this.chunks[0] + '...') : this.chunks[0]
  }

  getChunks() {
    const position = this.text.indexOf(' ', this.target)
    if (this.text.length <= this.target || position === -1) return [this.text]
    return [this.text.substring(0, position), this.text.substring(position)]
  }
}
