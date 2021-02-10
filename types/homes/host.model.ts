export class Host {
  objectID: string = ''
  description: string = ''
  name: string = ''
  joined: Date
  homeId: string[] = []
  image: string = ''
  reviewCount: number

  constructor(init?: Partial<Host>) {
    Object.assign(this, init)
  }
}
