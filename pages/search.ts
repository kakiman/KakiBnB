import { Vue, Component, Ref } from 'nuxt-property-decorator'
import { HomesStore } from '~/store/homes'

import HomeRow from '~/components/HomeRow'
import { Home } from '~/types'

@Component({
  name: 'search',
  components: {
    HomeRow
  },
  async asyncData({ route }) {
    const query = this.$route.query
    const response = await HomesStore.getHomesByLocation(query.lat, query.lng)
    if (!response.ok) return new Error(response.statusText) //{ statusCode: badResponse.status, message: badResponse.statusText }
    return {
      homes: HomesStore.homeResults,
      label: query.label,
      lat: query.lat,
      lng: query.lng,
      dataLoad: true
    }
  },
  head() {
    return {
      title: `Homes around ${this.$data.label}`,
      meta: [
        {
          name: 'description',
          content: 'This is a search home page!',
          hid: 'description'
        }
      ]
    }
  }
})
export default class search extends Vue {
  @Ref('google-map') readonly map!: HTMLDivElement
  dataLoad: boolean = false
  homes: Home[] = []
  label: string = ''
  lat: string = ''
  lng: string = ''

  mounted() {
    this.updateMap()
  }

  highlightMarker(homeId: any, isHighlighted: boolean | undefined) {
    document.getElementsByClassName(`home-${homeId}`)[0]?.classList?.toggle('marker-highlight', isHighlighted)
  }

  updateMap() {
    this.$maps.showMap(this.map, this.lat, this.lng, this.getHomeMarkers())
    this.dataLoad = true
  }

  getHomeMarkers() {
    return this.homes.map((home: { _geoloc: any; pricePerNight: any; objectID: any }) => {
      return {
        ...home._geoloc,
        pricePerNight: home.pricePerNight,
        id: home.objectID
      }
    })
  }

  async beforeRouteUpdate(to: any, from: any, next: () => void) {
    const response = await HomesStore.getHomesByLocation(to.query.lat, to.query.lng)
    if (response.ok) {
      this.homes = HomesStore.homeResults
      this.label = to.query.label
      this.lat = to.query.lat
      this.lng = to.query.lng
      this.updateMap()
    }
    next()
  }
}
