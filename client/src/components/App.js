import React from 'react'
import '../styles/App.scss'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './Routes'
import { MobxStoreProvider } from '../store/mobx'

export default function App({ store }) {
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
