import { makeAutoObservable } from 'mobx'

export default class App {
  loading = false

  constructor() {
    makeAutoObservable(this)
  }

  setLoading(loading) {
    this.loading = !!loading
  }
}
