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
    const query = route.query
    const params = {
      label: Array.isArray(query.label) ? (query.label[0] == null ? '' : query.label[0]) : query.label,
      lat: Array.isArray(query.lat) ? (query.lat[0] == null ? '' : query.lat[0]) : query.lat,
      lng: Array.isArray(query.lng) ? (query.lng[0] == null ? '' : query.lng[0]) : query.lng
    }
    const response = await HomesStore.getHomesByLocation(params)
    if (!response.ok) return new Error(response.statusText) //{ statusCode: badResponse.status, message: badResponse.statusText }
    return {
      homes: HomesStore.homeResults,
      label: HomesStore.searchLabel,
      lat: HomesStore.searchLat,
      lng: HomesStore.searchLng,
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
    this.homes = HomesStore.homeResults
    this.label = HomesStore.searchLabel
    this.lat = HomesStore.searchLat
    this.lng = HomesStore.searchLng
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
    const params = {
      label: to.query.label,
      lat: to.query.lat,
      lng: to.query.lng
    }
    const response = await HomesStore.getHomesByLocation(params)
    if (response.ok) {
      this.updateMap()
    }
    next()
  }
}
