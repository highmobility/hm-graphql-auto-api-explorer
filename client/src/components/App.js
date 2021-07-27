import React from 'react'
import '../styles/App.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import { createStore, MobxStoreProvider } from '../store/mobx'

export default function App() {
  const store = createStore()

  return (
    <MobxStoreProvider store={store}>
      <Router>
        <div className="App">
          <Routes />
        </div>
      </Router>
    </MobxStoreProvider>
  )
}
