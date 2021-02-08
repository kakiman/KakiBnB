export class Reviewer {
  image: string = ''
  name: string = ''

  constructor(init?: Partial<Reviewer>) {
    Object.assign(this, init)
  }
}
