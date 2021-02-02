export class Location {
  address: string = ''
  city: string = ''
  state: string = ''
  country: string = ''

  constructor(init?: Partial<Location>) {
    Object.assign(this, init)
  }
}
