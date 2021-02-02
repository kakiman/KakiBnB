import { Vue, Component } from 'nuxt-property-decorator'
import { HomesStore } from '~/store/homes'

import HomeRow from '~/components/HomeRow/HomeRow'
import { Home } from '~/types'

@Component({
  name: 'search',
  components: {
    HomeRow
  }
})
export default class search extends Vue {
  label: string
  $maps: any
  homes: Home[]

  head() {
    return {
      title: `Homes around ${this.label}`
    }
  }

  mounted() {
    this.updateMap()
  }

  highlightMarker(homeId: any, isHighlighted: boolean | undefined) {
    document.getElementsByClassName(`home-${homeId}`)[0]?.classList?.toggle('marker-highlight', isHighlighted)
  }

  updateMap() {
    this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers())
  }

  lat(map: Vue | Element | Vue[] | Element[], lat: any, lng: any, arg3: any) {
    throw new Error('Method not implemented.')
  }

  lng(map: Vue | Element | Vue[] | Element[], lat: any, lng: any, arg3: any) {
    throw new Error('Method not implemented.')
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
    const data = await HomesStore.getHomesByLocation(to.query.lat, to.query.lng)
    this.homes = data.json.hits
    this.label = to.query.label
    this.lat = to.query.lat
    this.lng = to.query.lng
    this.updateMap()
    next()
  }

  async asyncData() {
    const query = this.$route.query
    const data = await HomesStore.getHomesByLocation(query.lat, query.lng)
    return {
      homes: data.json.hits,
      label: query.label,
      lat: query.lat,
      lng: query.lng
    }
  }
}
