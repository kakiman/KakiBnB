import { Store } from 'vuex'
import { MapWaiting } from './mapWaiting.model'

export interface INuxtMapInstance {
  addScript(): void
  initGoogleMaps(): void
  makeAutoComplete(input: HTMLInputElement): void
  showMap(canvas: any, lat: any, lng: any, markers?: any): void
}

declare global {
  interface Window {
    initGoogleMaps: any
    loaded: boolean
    waiting: MapWaiting[]
  }
}

export class NuxtMapInstance implements INuxtMapInstance {
  googleMapApiKey: string = ''

  constructor(googleMapApiKey: string) {
    this.googleMapApiKey = googleMapApiKey
  }

  addScript(): void {
    const script = document.createElement('script')
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=' +
      this.googleMapApiKey +
      '&libraries=places&callback=initGoogleMaps'
    script.async = true
    window.initGoogleMaps = this.initGoogleMaps
    window.loaded = false
    window.waiting = []
    document.head.appendChild(script)
  }

  initGoogleMaps(): void {
    window.loaded = true
    if (window.waiting) {
      window.waiting.forEach((item: MapWaiting) => {
        if (typeof item.fn === 'function') {
          item.fn(...item.arguments)
        }
      })
    }
    window.waiting = []
  }

  makeAutoComplete(input: HTMLInputElement): void {
    if (!window.loaded) {
      window.waiting.push({ fn: this.makeAutoComplete, arguments })
      return
    }

    const autoComplete = new window.google.maps.places.Autocomplete(input, { types: ['(cities)'] })
    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace()
      input.dispatchEvent(new CustomEvent('changed', { detail: place }))
    })
  }

  showMap(canvas: Element, lat: any, lng: any, markers?: any): void {
    if (!window.loaded) {
      window.waiting.push({
        fn: this.showMap,
        arguments
      })
      return
    }
    const map = new window.google.maps.Map(canvas, {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true,
      styles: [
        {
          featureType: 'poi.business',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }]
        }
      ]
    })
    if (!markers) {
      const position = new window.google.maps.LatLng(lat, lng)
      const marker = new window.google.maps.Marker({
        position,
        clickable: false
      })
      marker.setMap(map)
      return
    }

    const bounds = new window.google.maps.LatLngBounds()
    markers.forEach((home: { lat: number; lng: number; pricePerNight: any; id: string }) => {
      const position = new window.google.maps.LatLng(home.lat, home.lng)
      const marker = new window.google.maps.Marker({
        position,
        label: {
          text: `$${home.pricePerNight}`
          // className: `marker home-${home.id}`
        },
        icon: 'https://maps.gstatic.com/mapfiles/transparent.png',
        clickable: false
      })
      marker.setMap(map)
      bounds.extend(position)
    })

    map.fitBounds(bounds)
  }
}
