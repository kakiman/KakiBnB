import { HomesStore } from './../../store/homes'
import { Vue, Component } from 'nuxt-property-decorator'

import { Home } from '~/types'
import ShortText from '~/components/ShortText'

@Component({
  name: 'home-id',
  components: {
    ShortText
  }
})
export default class homeId extends Vue {
  home: Home
  $maps: any

  head() {
    return {
      title: this.home.title
    }
  }

  mounted() {
    this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
  }

  async asyncData() {
    const responses = await Promise.all([
      HomesStore.getHome(this.$route.params.id),
      HomesStore.getReviewsByHomeId(this.$route.params.id),
      HomesStore.getUserByHomeId(this.$route.params.id)
    ])

    const badResponse = responses.find((response) => !response.ok)
    if (badResponse) return new Error(badResponse.statusText) //{ statusCode: badResponse.status, message: badResponse.statusText }

    return {
      home: responses[0].json,
      reviews: responses[1].json.hits,
      user: responses[2].json.hits[0]
    }
  }

  formatDate(dateStr: string | number | Date) {
    const date = new Date(dateStr)
    return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
  }
}
