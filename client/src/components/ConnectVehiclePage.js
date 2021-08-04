import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import routes, { PAGES } from '../routes'
import { useMobx } from '../store/mobx'
import '../styles/ConnectVehiclePage.scss'
import GrayCircles from './GrayCircles'
import PrimaryButton from './PrimaryButton'

function ConnectVehiclePage() {
  const { config } = useMobx()
  const oAuthUrl = new URL(config.authUrl)
  oAuthUrl.searchParams.set('client_id', config.clientId)
  oAuthUrl.searchParams.set('app_id', config.appId)
  oAuthUrl.searchParams.set(
    'redirect_uri',
    'http://localhost:8080/auth/callback'
  )

  return (
    <div className="ConnectVehiclePage">
      <div className="ConnectVehiclePageContent">
        <h2 className="Header">Connect your vehicle</h2>
        <GrayCircles />
        {/* <a href={oAuthUrl.toString()}>
          <PrimaryButton>Add my first vehicle</PrimaryButton>
        </a> */}
        <Link to={routes.find((route) => route.name === PAGES.DASHBOARD).path}>
          <PrimaryButton>Dashboard</PrimaryButton>
        </Link>
      </div>
    </div>
  )
}

export default observer(ConnectVehiclePage)
