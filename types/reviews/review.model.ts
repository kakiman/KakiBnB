import { Reviewer } from './reviewer.model'

export class Review {
  comment: string
  date: Date
  homeId: string
  objectID: string
  rating: number
  reviewer: Reviewer = new Reviewer()

  constructor(init?: Partial<Review>) {
    Object.assign(this, init)
    if (init?.reviewer) {
      this.reviewer = new Reviewer(init?.reviewer)
    }
  }
}
