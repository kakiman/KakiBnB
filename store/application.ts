import { store } from '../store'
import { Module, VuexModule, VuexAction, VuexMutation, getModule } from 'nuxt-property-decorator'

@Module({
  dynamic: true,
  store,
  name: 'application',
  stateFactory: true,
  namespaced: true
})
export default class ApplicationModule extends VuexModule {
  appVersion = process.env.appVersion || '0.0.0'
}
export const applicationStore = getModule(ApplicationModule, store)
