import { fetchVehicles } from '../requests'
import { deleteVehicle } from '../requests'
import { makeAutoObservable, runInAction } from 'mobx'

export default class Vehicles {
  list = []

  constructor() {
    makeAutoObservable(this)
  }

  remove(vehicleId) {
    this.list = this.list.filter((vehicle) => vehicle.id !== vehicleId)
  }

  async fetch() {
    const vehicles = await fetchVehicles()
    runInAction(() => {
      this.list = [...vehicles]
    })
  }

  async delete(vehicleVin) {
    await deleteVehicle(vehicleVin)
    runInAction(() => {
      this.list = this.list.filter((vehicle) => vehicle.vin !== vehicleVin)
    })
  }
}
