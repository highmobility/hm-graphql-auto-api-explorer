import { makeAutoObservable } from 'mobx'

export default class Properties {
  values = {}

  constructor() {
    makeAutoObservable(this)
  }

  setValues(capabilities) {
    const newValues = this.values
    Object.entries({ ...capabilities }).forEach(
      ([capabilityName, properties]) => {
        if (!properties) return
        Object.entries(properties).forEach(([propertyName, propertyData]) => {
          const uniqueId = `${capabilityName}.${propertyName}`

          if (!propertyData?.data) {
            newValues[uniqueId] = propertyData
            return
          }

          newValues[uniqueId] = {
            value: propertyData?.data?.value || propertyData.data,
            unit: propertyData?.data?.unit || null,
            timestamp: propertyData?.timestamp,
          }
        })
      }
    )

    this.values = { ...newValues }
  }

  resetValues() {
    this.values = {}
  }
}
