import { makeAutoObservable } from 'mobx'
import uniq from 'lodash/uniq'

export default class Properties {
  pinned = []

  constructor() {
    makeAutoObservable(this)
  }

  pin(propertyId) {
    this.pinned = uniq([...this.pinned, propertyId])
  }

  unPin(propertyId) {
    this.pinned = this.pinned.filter((id) => id !== propertyId)
  }
}
