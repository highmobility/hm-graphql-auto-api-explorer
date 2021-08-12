import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AUTH_CALLBACK_URL, fetchAppConfig } from '../requests'
import routes, { PAGES } from '../routes'
import '../styles/ConfigPage.scss'
import GrayCircles from './GrayCircles'
import PrimaryButton from './PrimaryButton'
import { ReactComponent as ArrowSvg } from '../images/arrow.svg'

function ConfigPage() {
  const [appConfig, config] = useState(null)
  const history = useHistory()

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const config = await fetchAppConfig()
  //       setAppConfig(config)

  //       const oAuthUrl = new URL(config.auth_url)
  //       oAuthUrl.searchParams.set('client_id', config.client_id)
  //       oAuthUrl.searchParams.set('app_id', config.graph_ql_api_config.app_id)
  //       oAuthUrl.searchParams.set('redirect_uri', AUTH_CALLBACK_URL)
  //       setUrl(oAuthUrl)
  //     } catch (e) {
  //       history.push(
  //         routes.find((route) => route.name === PAGES.INITIAL_CONFIG).path
  //       )
  //     }
  //   }

  //   fetch()
  // }, [history])

  return (
    <div className="ConfigPage">
      <div className="ConfigPageHeader">
        <ArrowSvg className="ConfigPageBackButton" />
        <h2 className="ConfigPageTitle">App configuration</h2>
        <PrimaryButton className="ConfigPageResetAppButton">
          Reset app
        </PrimaryButton>
      </div>
      <div className="ConfigPageContent">Content</div>
    </div>
  )
}

export default observer(ConfigPage)
