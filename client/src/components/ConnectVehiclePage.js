import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AUTH_CALLBACK_URL, fetchConfig } from '../requests'
import routes, { PAGES } from '../routes'
import '../styles/ConnectVehiclePage.scss'
import GrayCircles from './GrayCircles'
import PrimaryButton from './PrimaryButton'

function ConnectVehiclePage() {
  const [url, setUrl] = useState(null)
  const history = useHistory()

  useEffect(() => {
    const fetch = async () => {
      try {
        const config = await fetchConfig()

        const oAuthUrl = new URL(config.auth_url)
        oAuthUrl.searchParams.set('client_id', config.client_id)
        oAuthUrl.searchParams.set('app_id', config.graph_ql_api_config.app_id)
        oAuthUrl.searchParams.set('redirect_uri', AUTH_CALLBACK_URL)
        setUrl(oAuthUrl)
      } catch (e) {
        history.push(
          routes.find((route) => route.name === PAGES.INITIAL_CONFIG).path
        )
      }
    }

    fetch()
  }, [history])

  return (
    <div className="ConnectVehiclePage">
      <div className="ConnectVehiclePageContent">
        <h2 className="ConnectVehiclePageHeader">Connect your vehicle</h2>
        <GrayCircles />
        <a href={url?.toString()}>
          <PrimaryButton>Add a vehicle</PrimaryButton>
        </a>
      </div>
    </div>
  )
}

export default observer(ConnectVehiclePage)
