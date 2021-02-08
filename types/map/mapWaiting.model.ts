export class MapWaiting {
  fn: (...args: any) => void
  arguments: any

  constructor(init?: MapWaiting) {
    Object.assign(this, init)
  }
}
