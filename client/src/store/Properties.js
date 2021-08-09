import { makeAutoObservable } from 'mobx'

export default class Properties {
  values = {}

  constructor() {
    makeAutoObservable(this)
  }

  setValues(capabilities) {
    Object.entries(capabilities).forEach(([capabilityName, properties]) => {
      Object.entries(properties).forEach(([propertyName, { data }]) => {
        const uniqueId = `${capabilityName}.${propertyName}`

        this.values[uniqueId] = {
          value: data?.value || data,
          unit: data?.unit || null,
        }
      })
    })
  }
}
