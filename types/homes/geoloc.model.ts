export class GeoLoc {
  lat: number
  lng: number

  constructor(init?: GeoLoc) {
    Object.assign(this, init)
  }
}
