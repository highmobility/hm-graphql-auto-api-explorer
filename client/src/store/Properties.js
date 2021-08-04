import { makeAutoObservable } from 'mobx'
import uniq from 'lodash/uniq'
import { getPropertyUniqueId } from '../utils/properties'

export default class Properties {
  pinned = []
  shown = []

  constructor() {
    makeAutoObservable(this)
  }

  pin(property) {
    const uniqueId = getPropertyUniqueId(property)
    this.pinned = uniq([...this.pinned, uniqueId])
  }

  unPin(property) {
    const uniqueId = getPropertyUniqueId(property)
    this.pinned = this.pinned.filter((id) => id !== uniqueId)
  }

  show(property) {
    const uniqueId = getPropertyUniqueId(property)
    this.shown = uniq([...this.shown, uniqueId])
  }

  hide(property) {
    const uniqueId = getPropertyUniqueId(property)
    this.shown = this.shown.filter((id) => id !== uniqueId)
  }

  isPinned(property) {
    const uniqueId = getPropertyUniqueId(property)
    return this.pinned.includes(uniqueId)
  }

  isShown(property) {
    const uniqueId = getPropertyUniqueId(property)
    return this.shown.includes(uniqueId)
  }
}
