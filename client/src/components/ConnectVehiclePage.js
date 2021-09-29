import { observer } from 'mobx-react-lite'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  authFleetVehicle,
  AUTH_CALLBACK_URL,
  fetchAppConfig,
} from '../requests'
import routes, { PAGES } from '../routes'
import '../styles/ConnectVehiclePage.scss'
import GrayCircles from './GrayCircles'
import PrimaryButton from './PrimaryButton'
import { useLocation } from 'react-use'
import { APP_TYPES } from '../store/Config'
import TextInput from './TextInput'
import ErrorMessage from './ErrorMessage'

function ConnectVehiclePage() {
  const [url, setUrl] = useState(null)
  const [appConfig, setAppConfig] = useState(null)
  const history = useHistory()
  const [error, setError] = useState(
    new URLSearchParams(useLocation().search).get('error')
  )
  const [vin, setVin] = useState('')
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    const fetch = async () => {
      try {
        const config = await fetchAppConfig()
        setAppConfig(config)

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

  const validateRequired = (field, value) => {
    const newErrors = {
      ...formErrors,
      [field]: !!value ? null : 'Field is required',
    }
    setFormErrors(newErrors)

    return newErrors
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    validateRequired('vin', vin)

    if (Object.values(formErrors).some((v) => !!v)) {
      return
    }

    try {
      await authFleetVehicle(vin)
      history.push(routes.find((route) => route.name === PAGES.DASHBOARD).path)
    } catch (e) {
      console.log('Failed to auth vehicle', { vin })
      setError(e?.response?.data?.error || '')
    }
  }

  return (
    <div className="ConnectVehiclePage">
      <ErrorMessage className="ConnectVehiclePageError" show={!!error}>
        <p>
          Could not connect vehicle. Make sure to open your emulator if using
          one
        </p>
        <p className="small">{error}</p>
      </ErrorMessage>
      <div className="ConnectVehiclePageContent">
        <h2 className="ConnectVehiclePageHeader">Connect your vehicle</h2>
        <GrayCircles />
        <form
          noValidate
          spellCheck="false"
          onSubmit={(e) => onSubmit(e)}
          className="ConnectVehiclePageForm"
        >
          {appConfig?.app_type === APP_TYPES.FLEET ? (
            <Fragment>
              <TextInput
                value={vin}
                placeholder="Vehicle VIN"
                onChange={(e) => setVin(e.target.value)}
                onBlur={() => validateRequired('vin', vin)}
                error={formErrors?.vin}
              />
              <PrimaryButton type="submit">Add vehicle</PrimaryButton>
            </Fragment>
          ) : (
            <a href={url?.toString()}>
              <PrimaryButton>Add a vehicle</PrimaryButton>
            </a>
          )}
        </form>
      </div>
    </div>
  )
}

export default observer(ConnectVehiclePage)
