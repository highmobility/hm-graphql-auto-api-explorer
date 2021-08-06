import { observer } from 'mobx-react-lite'
import React from 'react'
import { AUTH_CALLBACK_URL } from '../requests'
import { useMobx } from '../store/mobx'
import '../styles/ConnectVehiclePage.scss'
import GrayCircles from './GrayCircles'
import PrimaryButton from './PrimaryButton'

function ConnectVehiclePage() {
  const { config } = useMobx()
  const oAuthUrl = new URL(config.authUrl)
  oAuthUrl.searchParams.set('client_id', config.clientId)
  oAuthUrl.searchParams.set('app_id', config.appId)
  oAuthUrl.searchParams.set('redirect_uri', AUTH_CALLBACK_URL)

  return (
    <div className="ConnectVehiclePage">
      <div className="ConnectVehiclePageContent">
        <h2 className="Header">Connect your vehicle</h2>
        <GrayCircles />
        <a href={oAuthUrl.toString()}>
          <PrimaryButton>Add my first vehicle</PrimaryButton>
        </a>
      </div>
    </div>
  )
}

export default observer(ConnectVehiclePage)
