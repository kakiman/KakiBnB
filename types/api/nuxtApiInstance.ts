import axiosRetry from 'axios-retry'
import axios from 'axios'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK'

export interface INuxtApiInstance {
  create(path: string, payload: any, mapQuery?: Map<string, any>, headers?: {}, retry?: boolean, retries?: number): any
  read(path: string, mapQuery?: Map<string, any>, headers?: {}, retry?: boolean, retries?: number): any
  update(path: string, payload: any, mapQuery?: Map<string, any>, headers?: {}, retry?: boolean, retries?: number): any
  delete(path: string, mapQuery?: Map<string, any>, headers?: {}, retry?: boolean, retries?: number): any
}

export class NuxtApiInstance implements INuxtApiInstance {
  axiosInstance: NuxtAxiosInstance
  isLocal: boolean
  algoliaWsURL: string
  algoliaAppId: string
  algoliaApiKey: string

  constructor(
    axiosInstance: NuxtAxiosInstance,
    isLocal: boolean,
    algoliaWsURL: string,
    algoliaAppId: string,
    algoliaApiKey: string
  ) {
    this.axiosInstance = axiosInstance
    this.isLocal = isLocal
    this.algoliaWsURL = algoliaWsURL
    this.algoliaAppId = algoliaAppId
    this.algoliaApiKey = algoliaApiKey
  }

  private _axiosCall(method: Method, url: string, payload?: any, headers?: {}, retry?: boolean, retries?: number) {
    if (retry) {
      axiosRetry(this.axiosInstance, { retries })
    } else {
      axiosRetry(this.axiosInstance, { retries: 0 })
    }
    return this.axiosInstance({
      method,
      url,
      headers: headers || {
        'X-Algolia-API-Key': this.algoliaApiKey,
        'X-Algolia-Application-Id': this.algoliaAppId
      },
      data: payload
    })
  }

  addApiEndpointOrLocalUrl(path: string, fromS3?: boolean): string {
    /*if (this.isLocal && serviceName && this.localApiEndpoint[serviceName]) {
      return this.localApiEndpoint[serviceName] + `${path}`
    } else if (fromS3) {
      return this.s3Endpoint + `${path}`
    }*/
    return this.algoliaWsURL + path
  }

  createUrl(path: string, mapQuery?: Map<string, any>, fromS3?: boolean): string {
    let url = this.addApiEndpointOrLocalUrl(path, fromS3)
    if (mapQuery) {
      let query: string = ''
      let first: boolean = true
      for (const [cle, val] of mapQuery) {
        if (val !== null) {
          if (first) {
            query = '?'
          }
          if (!first) {
            query = query.concat('&')
          }
          query = query.concat(cle, '=', val)
          first = false
        }
      }
      url += `${query}`
    }
    return url
  }

  create(path: string, payload: any, mapQuery?: Map<string, any>, headers?: {}, retry?: boolean, retries?: number) {
    return this._axiosCall('post', this.createUrl(path, mapQuery), payload, headers, retry, retries)
  }

  read(path: string, mapQuery?: Map<string, any>, headers?: {}, retry?: boolean, retries?: number) {
    return this._axiosCall('get', this.createUrl(path, mapQuery), {}, headers, retry, retries)
  }

  update(path: string, payload: any, mapQuery?: Map<string, any>, headers?: {}, retry?: boolean, retries?: number) {
    return this._axiosCall('put', this.createUrl(path, mapQuery), payload, headers, retry, retries)
  }

  delete(path: string, mapQuery?: Map<string, any>, headers?: {}, retry?: boolean, retries?: number) {
    return this._axiosCall('delete', this.createUrl(path, mapQuery), {}, headers, retry, retries)
  }
}
