import { HomesStore } from './../../store/homes'
import { Vue, Component, Ref } from 'nuxt-property-decorator'

import ShortText from '~/components/ShortText'
import { Home, Owner, Review } from '~/types'

@Component({
  name: 'home-id',
  components: {
    ShortText
  },
  async asyncData({ route }) {
    const responses = await Promise.all([
      HomesStore.getHome(route.params.id),
      HomesStore.getReviewsByHomeId(route.params.id),
      HomesStore.getUserByHomeId(route.params.id)
    ])

    const badResponse = responses.find((response) => !response.ok)
    if (badResponse) return new Error(badResponse.statusText) //{ statusCode: badResponse.status, message: badResponse.statusText }

    return {
      home: HomesStore.home,
      reviews: HomesStore.reviews,
      user: HomesStore.homeOwner,
      dataLoad: true
    }
  },
  head() {
    return {
      title: this.$data.home.title,
      meta: [
        {
          name: 'description',
          content: 'This is a home detail page!',
          hid: 'description'
        }
      ]
    }
  }
})
export default class homeId extends Vue {
  dataLoad: boolean = false
  home: Home = new Home()
  reviews: Review[] = []
  user: Owner = new Owner()

  @Ref('google-map') readonly map!: HTMLDivElement

  mounted() {
    this.home = HomesStore.home
    this.reviews = HomesStore.reviews
    this.user = HomesStore.homeOwner
    this.$maps.showMap(this.map, this.home._geoloc.lat, this.home._geoloc.lng)
    this.dataLoad = true
  }

  formatDate(dateStr: string | number | Date) {
    const date = new Date(dateStr)
    return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  }
}
