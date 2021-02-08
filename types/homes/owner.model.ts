export class Owner {
  objectID: string = ''
  description: string = ''
  name: string = ''
  joined: Date
  homeId: string[] = []
  image: string = ''
  reviewCount: number

  constructor(init?: Partial<Owner>) {
    Object.assign(this, init)
  }
}
