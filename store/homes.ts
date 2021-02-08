import { store } from '.'
import { Module, VuexModule, VuexAction, VuexMutation, getModule } from 'nuxt-property-decorator'
import { $api } from '~/utils/api'
import { getErrorResponse, getOkResponse, unWrap } from '~/utils/common'
import { Home, Owner, Review } from '~/types'

@Module({
  dynamic: true,
  store,
  name: 'homes',
  stateFactory: true,
  namespaced: true
})
export default class HomesModule extends VuexModule {
  home: Home = new Home()
  reviews: Review[] = []
  homeOwner: Owner = new Owner()
  homeResults: Home[] = []

  @VuexMutation
  setCurrentHome(data: any) {
    this.home = new Home(data)
  }

  @VuexMutation
  setCurrentReviews(hits: any) {
    this.reviews = hits ? hits.map((h: Partial<Review> | undefined) => new Review(h)) : []
  }

  @VuexMutation
  setCurrentOwner(hits: any) {
    this.homeOwner = hits ? new Owner(hits[0]) : new Owner()
  }

  @VuexMutation
  setCurrentHomeResults(hits: any) {
    this.homeResults = hits ? hits.map((h: Partial<Home> | undefined) => new Home(h)) : []
  }

  @VuexAction
  async getHome(homeId: string) {
    return unWrap(
      await $api
        .read(`homes/${homeId}`)
        .then((resp: any) => {
          this.setCurrentHome(resp.data)
          return getOkResponse(resp)
        })
        .catch((error: any) => {
          return getErrorResponse(error)
        })
    )
  }

  @VuexAction
  async getReviewsByHomeId(homeId: string) {
    return unWrap(
      await $api
        .create('reviews/query', {
          filters: `homeId:${homeId}`,
          hitsPerPage: 6,
          attributesToHighlight: []
        })
        .then((resp: any) => {
          this.setCurrentReviews(resp.data.hits)
          return getOkResponse(resp)
        })
        .catch((error: any) => {
          return getErrorResponse(error)
        })
    )
  }

  @VuexAction
  async getUserByHomeId(homeId: string) {
    return unWrap(
      await $api
        .create('users/query', {
          filters: `homeId:${homeId}`,
          attributesToHighlight: []
        })
        .then((resp: any) => {
          this.setCurrentOwner(resp.data.hits)
          return getOkResponse(resp)
        })
        .catch((error: any) => {
          return getErrorResponse(error)
        })
    )
  }

  @VuexAction
  async getHomesByLocation(lat: string | (string | null)[], lng: string | (string | null)[], radiusInMeters = 1500) {
    return unWrap(
      await $api
        .create('homes/query', {
          aroundLatLng: `${lat},${lng}`,
          aroundRadius: radiusInMeters,
          hitsPerPage: 10,
          attributesToHighlight: []
        })
        .then((resp: any) => {
          this.setCurrentHomeResults(resp.data.hits)
          return getOkResponse(resp)
        })
        .catch((error: any) => {
          return getErrorResponse(error)
        })
    )
  }
}
export const HomesStore = getModule(HomesModule, store)
