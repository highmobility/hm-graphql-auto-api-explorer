import { makeAutoObservable } from 'mobx'

export default class App {
  loading = false
  showPropertiesFilter = false

  constructor() {
    makeAutoObservable(this)
  }

  setLoading(loading) {
    this.loading = !!loading
  }

  setShowPropertiesFilter(value) {
    this.showPropertiesFilter = value
  }
}
