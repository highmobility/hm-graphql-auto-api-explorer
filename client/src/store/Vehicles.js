import { fetchVehicles } from '../requests'
import { makeAutoObservable } from 'mobx'

export default class Vehicles {
  list = []

  constructor() {
    makeAutoObservable(this)
  }

  async fetch() {
    const vehicles = await fetchVehicles()
    this.list = [...vehicles]
  }
}
