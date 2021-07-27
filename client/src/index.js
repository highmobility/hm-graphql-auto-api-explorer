import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'
import App from './components/App'
import store from './store'

ReactDOM.render(<App store={store} />, document.getElementById('root'))
