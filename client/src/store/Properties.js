import { makeAutoObservable } from 'mobx'
import uniq from 'lodash/uniq'

export default class Properties {
  pinned = []
  shown = []

  constructor() {
    makeAutoObservable(this)
  }

  pin(propertyId) {
    this.pinned = uniq([...this.pinned, propertyId])
  }

  unPin(propertyId) {
    this.pinned = this.pinned.filter((id) => id !== propertyId)
  }

  addShownProperty(propertyId) {
    this.shown = uniq([...this.shown, propertyId])
  }

  removeShownProperty(propertyId) {
    this.shown = this.shown.filter((id) => id !== propertyId)
  }
}
