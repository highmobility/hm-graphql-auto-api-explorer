import { makeAutoObservable } from 'mobx'

export default class Properties {
  values = []

  constructor() {
    makeAutoObservable(this)
  }

  setValues(newValues) {
    this.values = newValues.map((property) => {
      return {
        ...property,
        id: property.property_unique_id,
      }
    })
  }

  resetValues() {
    this.values = []
  }
}
