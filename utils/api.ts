import { dateFns } from '@nuxtjs/date-fns/types/date-fns'
import VueI18n, { IVueI18n } from 'vue-i18n'
import VueRouter from 'vue-router'
import { INuxtApiInstance } from '~/types/api/nuxtApiInstance'

// eslint-disable-next-line import/no-mutable-exports
let $api: INuxtApiInstance
// eslint-disable-next-line import/no-mutable-exports
let $datefns: dateFns
// eslint-disable-next-line import/no-mutable-exports
let $i18n: VueI18n & IVueI18n

export function initializeApi(apiInstance: INuxtApiInstance, datefns: dateFns, i18n: VueI18n & IVueI18n) {
  $api = apiInstance
  $datefns = datefns
  $i18n = i18n
}

export { $api, $datefns, $i18n }
