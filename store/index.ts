/*import { Store } from 'vuex'
import { initialiseStores } from '~/utils/store-accessor'
const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]
export * from '~/utils/store-accessor'*/
import Vue from 'vue'
import Vuex, { Store } from 'vuex'
interface StoreType {}
Vue.use(Vuex)

const storeTmp: Store<StoreType> = new Vuex.Store<StoreType>({})

export const store = storeTmp
