import { observer } from 'mobx-react-lite'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  AUTH_CALLBACK_URL,
  fetchAppConfig,
  fetchConfig,
  updateConfig,
} from '../requests'
import '../styles/ConfigPage.scss'
import PrimaryButton from './PrimaryButton'
import { ReactComponent as ArrowSvg } from '../images/arrow.svg'
import Spinner from './Spinner'
import TextInput from './TextInput'
import { useMobx } from '../store/mobx'
import routes, { PAGES } from '../routes'

function ConfigPage() {
  const [mergedConfig, setMergedConfig] = useState({})
  const history = useHistory()
  const { config } = useMobx()
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState(
    config.googleMapsApiKey
  )

  useEffect(() => {
    const fetch = async () => {
      try {
        const [appConfig, config] = await Promise.all([
          fetchAppConfig(),
          fetchConfig(),
        ])
        setMergedConfig({ ...appConfig, config })
      } catch (e) {
        console.log('Failed to fetch configs', e)
      }
    }

    fetch()
  }, [history])

  const onSave = async () => {
    config.setGoogleMapsApiKey(googleMapsApiKey)
    const dashboardPath = routes.find(
      (route) => route.name === PAGES.DASHBOARD
    ).path

    await updateConfig({ googleMapsApiKey })

    if (config.googleMapsApiKey !== googleMapsApiKey) {
      window.location.href = dashboardPath
      return
    }

    history.push(dashboardPath)
  }

  const onBack = () => {
    history.push(routes.find((route) => route.name === PAGES.DASHBOARD).path)
  }

  return (
    <div className="ConfigPage">
      <div className="ConfigPageHeader">
        <div className="ConfigPageBackButton" onClick={() => onBack()}>
          <ArrowSvg />
        </div>
        <h2 className="ConfigPageTitle">App configuration</h2>
        <PrimaryButton className="ConfigPageResetAppButton">
          Reset app
        </PrimaryButton>
      </div>
      <div className="ConfigPageContent">
        {mergedConfig ? (
          <Fragment>
            <h5 className="ConfigPageSubTitle">App configuration</h5>
            <div className="ConfigPageLabel">APP ID</div>
            <p className="ConfigPageValue">
              {mergedConfig?.graph_ql_api_config?.app_id}
            </p>
            <div className="ConfigPageLabel">App URL</div>
            <p className="ConfigPageValue">
              {mergedConfig?.graph_ql_api_config?.app_uri}
            </p>
            <div className="ConfigPageLabel">Client serial number</div>
            <p className="ConfigPageValue">
              {mergedConfig?.graph_ql_api_config?.client_serial_number}
            </p>
            <div className="ConfigPageLabel">API version</div>
            <p className="ConfigPageValue">
              {mergedConfig?.graph_ql_api_config?.version}
            </p>

            <h5 className="ConfigPageSubTitle">OAuth credentials</h5>
            <div className="ConfigPageLabel">Client ID</div>
            <p className="ConfigPageValue">{mergedConfig?.client_id}</p>
            <div className="ConfigPageLabel">Auth URL</div>
            <p className="ConfigPageValue">{mergedConfig?.auth_url}</p>
            <div className="ConfigPageLabel">Token URL</div>
            <p className="ConfigPageValue">{mergedConfig?.token_url}</p>
            <div className="ConfigPageLabel">Redirect URL</div>
            <p className="ConfigPageValue">{AUTH_CALLBACK_URL}</p>

            <h5 className="ConfigPageSubTitle">Google maps API key</h5>
            <TextInput
              name="googleMapsApiKey"
              type="password"
              value={googleMapsApiKey}
              placeholder="Google maps API key"
              onChange={(e) => setGoogleMapsApiKey(e.target.value)}
            />
            <PrimaryButton
              className="ConfigPageSaveButton"
              onClick={() => onSave()}
            >
              Save
            </PrimaryButton>
          </Fragment>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

export default observer(ConfigPage)
