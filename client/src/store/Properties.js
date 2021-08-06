import { makeAutoObservable } from 'mobx'

export default class Properties {
  constructor() {
    makeAutoObservable(this)
  }
}
