import { observer } from 'mobx-react-lite'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AUTH_CALLBACK_URL, fetchAppConfig } from '../requests'
import routes, { PAGES } from '../routes'
import '../styles/ConnectVehiclePage.scss'
import GrayCircles from './GrayCircles'
import PrimaryButton from './PrimaryButton'
import { useLocation } from 'react-use'
import { APP_TYPES } from '../store/Config'
import TextInput from './TextInput'

function ConnectVehiclePage() {
  const [url, setUrl] = useState(null)
  const [appConfig, setAppConfig] = useState(null)
  const history = useHistory()
  const error = new URLSearchParams(useLocation().search).get('error')
  const [vin, setVin] = useState('')
  const [brand, setBrand] = useState('')
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
    setFormErrors({
      ...formErrors,
      [field]: !!value ? null : 'Field is required',
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (Object.values(formErrors).some((v) => !!v)) {
      return
    }

    console.log('adding fleet vehicle', vin)
  }

  return (
    <div className="ConnectVehiclePage">
      {error && (
        <div className="ConnectVehiclePageError">
          <p>
            Could not connect vehicle. Make sure to open your emulator if using
            one
          </p>
          <p className="small">{error}</p>
        </div>
      )}
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
              <TextInput
                value={brand}
                placeholder="Vehicle brand"
                onChange={(e) => setBrand(e.target.value)}
                onBlur={() => validateRequired('brand', brand)}
                error={formErrors?.brand}
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
