import { store } from '.'
import { Module, VuexModule, VuexAction, VuexMutation, getModule } from 'nuxt-property-decorator'
import { $api } from '~/utils/api'
import { getErrorResponse, unWrap } from '~/utils/common'

@Module({
  dynamic: true,
  store,
  name: 'homes',
  stateFactory: true,
  namespaced: true
})
export default class HomesModule extends VuexModule {
  @VuexAction
  async getHome(homeId: string) {
    try {
      return unWrap(await $api.read(`homes/${homeId}`))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  @VuexAction
  async getReviewsByHomeId(homeId: string) {
    try {
      return unWrap(
        await $api.create('reviews/query', {
          filters: `homeId:${homeId}`,
          hitsPerPage: 6,
          attributesToHighlight: []
        })
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  @VuexAction
  async getUserByHomeId(homeId: string) {
    try {
      return unWrap(
        await $api.create('users/query', {
          filters: `homeId:${homeId}`,
          attributesToHighlight: []
        })
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  @VuexAction
  async getHomesByLocation(lat: string | (string | null)[], lng: string | (string | null)[], radiusInMeters = 1500) {
    try {
      return unWrap(
        await $api.create('homes/query', {
          aroundLatLng: `${lat},${lng}`,
          aroundRadius: radiusInMeters,
          hitsPerPage: 10,
          attributesToHighlight: []
        })
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }
}
export const HomesStore = getModule(HomesModule, store)
