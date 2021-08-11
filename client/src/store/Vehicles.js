import { fetchVehicles } from '../requests'
import { deleteVehicle } from '../requests'
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

  async delete(vehicleVin) {
    await deleteVehicle(vehicleVin)
    this.list = this.list.filter((vehicle) => vehicle.vin !== vehicleVin)
  }
}
