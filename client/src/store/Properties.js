import { makeAutoObservable } from 'mobx'

export default class Properties {
  values = {}

  constructor() {
    makeAutoObservable(this)
  }

  setValues(capabilities) {
    Object.entries({ ...capabilities }).forEach(
      ([capabilityName, properties]) => {
        if (!properties) return
        Object.entries(properties).forEach(([propertyName, propertyData]) => {
          const uniqueId = `${capabilityName}.${propertyName}`

          if (!propertyData.data) {
            this.values[uniqueId] = propertyData
            return
          }

          this.values[uniqueId] = {
            value: propertyData.data?.value || propertyData.data,
            unit: propertyData.data?.unit || null,
          }
        })
      }
    )
  }
}
