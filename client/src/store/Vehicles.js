import { fetchVehicles } from '../requests'
import { deleteVehicle } from '../requests'
import { makeAutoObservable, runInAction } from 'mobx'

export default class Vehicles {
  list = []
  state = 'pending'

  constructor() {
    makeAutoObservable(this)
  }

  async fetch() {
    this.state = 'loading'
    const vehicles = await fetchVehicles()
    runInAction(() => {
      this.list = [...vehicles]
      this.state = 'done'
    })
  }

  async delete(vehicleVin) {
    this.state = 'loading'
    await deleteVehicle(vehicleVin)
    runInAction(() => {
      this.list = this.list.filter((vehicle) => vehicle.vin !== vehicleVin)
      this.state = 'done'
    })
  }
}
