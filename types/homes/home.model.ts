import { Location } from './location.model'
import { GeoLoc } from './geoloc.model'
export class Home {
  objectID: string = ''
  type: string = ''
  title: string = ''
  description: string = ''
  note: string = ''
  reviewCount: number = 0
  reviewValue: number = 0
  features: string[] = []
  pricePerNight: number
  location: Location = new Location()
  guests: number = 0
  bedrooms: number = 0
  beds: number = 0
  bathrooms: number = 0
  images: string[] = []
  _geoloc: GeoLoc = new GeoLoc()

  constructor(init?: Partial<Home>) {
    Object.assign(this, init)
  }
}
