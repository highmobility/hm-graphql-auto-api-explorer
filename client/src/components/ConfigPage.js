import { observer } from 'mobx-react-lite'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  API_URL,
  AUTH_CALLBACK_URL,
  fetchAppConfig,
  fetchConfig,
  resetApp,
  updateConfig,
} from '../requests'
import '../styles/ConfigPage.scss'
import PrimaryButton from './PrimaryButton'
import { ReactComponent as ArrowSvg } from '../images/arrow.svg'
import Spinner from './Spinner'
import TextInput from './TextInput'
import { useMobx } from '../store/mobx'
import routes, { PAGES } from '../routes'
import ConfirmModal from './ConfirmModal'
import ForkMeOnGithub from './ForkMeOnGithub'
import Toggle from './Toggle'

function ConfigPage() {
  const [mergedConfig, setMergedConfig] = useState({})
  const [resetting, setResetting] = useState(false)
  const history = useHistory()
  const { config } = useMobx()
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState(
    config.googleMapsApiKey
  )
  const [basicAuthUsername, setBasicAuthUsername] = useState(null)
  const [basicAuthPassword, setBasicAuthPassword] = useState(null)
  const [basicAuthEnabled, setBasicAuthEnabled] = useState(false)
  const [addingAuth, setAddingAuth] = useState(false)
  const [removingAuth, setRemovingAuth] = useState(false)
  const [showErrors, setShowErrors] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        const [appConfig, config] = await Promise.all([
          fetchAppConfig(),
          fetchConfig(),
        ])
        setMergedConfig({ ...appConfig, config })
        setBasicAuthEnabled(config.basic_auth_enabled)
      } catch (e) {
        console.log('Failed to fetch configs', e)
      }
    }

    fetch()
  }, [history])

  const onSave = async () => {
    setShowErrors(true)
    config.setGoogleMapsApiKey(googleMapsApiKey)
    const dashboardPath = routes.find(
      (route) => route.name === PAGES.DASHBOARD
    ).path

    if (basicAuthEnabled && (!basicAuthUsername || !basicAuthPassword)) {
      return
    }

    if (
      !mergedConfig?.config?.basic_auth_enabled &&
      basicAuthEnabled &&
      !addingAuth
    ) {
      setAddingAuth(true)
      return
    }

    if (
      mergedConfig?.config?.basic_auth_enabled &&
      !basicAuthEnabled &&
      !removingAuth
    ) {
      setRemovingAuth(true)
      return
    }

    await updateConfig({
      googleMapsApiKey,
      basicAuthEnabled,
      basicAuthUsername,
      basicAuthPassword,
    })

    window.location.href = dashboardPath
  }

  const onBack = () => {
    history.push(routes.find((route) => route.name === PAGES.DASHBOARD).path)
  }

  const onClickReset = async () => {
    setResetting(true)
  }

  const onConfirmReset = async () => {
    await resetApp()
    history.push(routes.find((route) => route.name === PAGES.HOME).path)
  }

  return (
    <div className="ConfigPage">
      <ForkMeOnGithub />
      <div className="ConfigPageHeader">
        <div className="ConfigPageBackButton" onClick={() => onBack()}>
          <ArrowSvg />
        </div>
        <h2 className="ConfigPageTitle">App configuration</h2>
        <PrimaryButton
          className="ConfigPageResetAppButton"
          onClick={() => onClickReset()}
        >
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
            <div className="ConfigPageLabel">API URL</div>
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

            <div className="ConfigPageBasicAuthConfig">
              <div className="ConfigPageToggleRow">
                <h5 className="ConfigPageSubTitle">Basic auth</h5>
                <Toggle
                  value={basicAuthEnabled}
                  onChange={() => setBasicAuthEnabled(!basicAuthEnabled)}
                />
              </div>
              <TextInput
                disabled={mergedConfig?.config?.basic_auth_enabled}
                name="basicAuthUsername"
                value={basicAuthUsername}
                placeholder={
                  mergedConfig?.config?.basic_auth_enabled
                    ? '**********'
                    : 'Username'
                }
                onChange={(e) => {
                  setBasicAuthEnabled(true)
                  setBasicAuthUsername(e.target.value)
                }}
                error={
                  basicAuthEnabled &&
                  !basicAuthUsername &&
                  showErrors &&
                  'Field is required'
                }
              />
              <TextInput
                disabled={mergedConfig?.config?.basic_auth_enabled}
                name="basicAuthPassword"
                type="password"
                value={basicAuthPassword}
                placeholder={
                  mergedConfig?.config?.basic_auth_enabled
                    ? '**********'
                    : 'Password'
                }
                onChange={(e) => {
                  setBasicAuthEnabled(true)
                  setBasicAuthPassword(e.target.value)
                }}
                error={
                  basicAuthEnabled &&
                  !basicAuthPassword &&
                  showErrors &&
                  'Field is required'
                }
              />
            </div>
            <h5 className="ConfigPageSubTitle">Webhook</h5>
            <p className="small ConfigPageTextBlock">
              To configure a webhook for continuous database logging and
              updating fleet vehicle clearance , open your app and follow the
              Webhooks tab, enter the following values:
            </p>
            <div className="ConfigPageLabel">Payload URL</div>
            <p className="ConfigPageValue NoPadding">{API_URL}/webhook</p>
            <div className="ConfigPageLabel">Secret key</div>
            <p className="ConfigPageValue NoPadding">
              {mergedConfig?.config?.webhook_secret}
            </p>

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
      <ConfirmModal
        show={!!resetting}
        close={() => setResetting(false)}
        onConfirm={() => onConfirmReset()}
        headerText="Do you want to reset the app?"
        descriptionText="Once you confirm, all vehicles and app configuration will be reset."
        confirmText="Yes, reset"
        cancelText="No, don't reset"
      />
      <ConfirmModal
        show={!!addingAuth}
        close={() => setAddingAuth(false)}
        onConfirm={() => onSave()}
        headerText="Do you want to add basic auth for the app?"
        descriptionText="Once you confirm, you won't be able to access this website without username and password"
        confirmText="Yes, add"
        cancelText="No, don't add"
      />
      <ConfirmModal
        show={!!removingAuth}
        close={() => setRemovingAuth(false)}
        onConfirm={() => onSave()}
        headerText="Do you want to remove basic auth?"
        descriptionText="Once you confirm, the app will be accessible to anyone"
        confirmText="Yes, remove"
        cancelText="No, don't remove"
      />
    </div>
  )
}

export default observer(ConfigPage)
