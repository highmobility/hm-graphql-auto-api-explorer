import { observer } from 'mobx-react-lite'
import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  authFleetVehicle,
  AUTH_CALLBACK_URL,
  fetchAppConfig,
  fetchClearedFleetVehicles,
} from '../requests'
import routes, { PAGES } from '../routes'
import '../styles/ConnectVehiclePage.scss'
import GrayCircles from './GrayCircles'
import PrimaryButton from './PrimaryButton'
import { useLocation } from 'react-use'
import { APP_TYPES } from '../store/Config'
import ErrorMessage from './ErrorMessage'
import Spinner from './Spinner'
import TextInput from './TextInput'
import BrandSelect from './BrandSelect'
import { useMobx } from '../store/mobx'
import ClearedVehiclesSelect from './ClearedVehiclesSelect'
import SecondaryButton from './SecondaryButton'

function ConnectVehiclePage() {
  const [url, setUrl] = useState(null)
  const [appConfig, setAppConfig] = useState(null)
  const history = useHistory()
  const [error, setError] = useState(
    new URLSearchParams(useLocation().search).get('error')
  )
  const [vin, setVin] = useState('')
  const [brand, setBrand] = useState('')
  const [loading, setLoading] = useState(true)
  const { properties } = useMobx()
  const [clearedFleetVehicles, setClearedFleetVehicles] = useState([])
  const [addingNew, setAddingNew] = useState(false)

  const [validationErrors, setValidationErrors] = useState({})

  const isSandbox = useMemo(() => {
    return appConfig?.auth_url?.includes('sandbox')
  }, [appConfig])

  useEffect(() => {
    const fetch = async () => {
      try {
        const config = await fetchAppConfig()
        const clearedFleetVehicles =
          config.app_type === APP_TYPES.FLEET
            ? await fetchClearedFleetVehicles()
            : []
        setAppConfig(config)
        setClearedFleetVehicles(clearedFleetVehicles)

        const oAuthUrl = new URL(config.auth_url)
        oAuthUrl.searchParams.set('client_id', config.client_id)
        oAuthUrl.searchParams.set('app_id', config.graph_ql_api_config.app_id)
        oAuthUrl.searchParams.set('redirect_uri', AUTH_CALLBACK_URL)
        setUrl(oAuthUrl)
        setLoading(false)
      } catch (e) {
        console.log('Failed to fetch page data', e)
        history.push(
          routes.find((route) => route.name === PAGES.INITIAL_CONFIG).path
        )
      }
    }

    fetch()
  }, [history])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (Object.values(validationErrors).filter(Boolean).length > 0) {
      return
    }

    if (!vin || !brand) {
      setError('You need to select a vehicle')
      return
    }

    try {
      setLoading(true)
      await authFleetVehicle(vin, brand)
      properties.resetValues()
      history.push(routes.find((route) => route.name === PAGES.DASHBOARD).path)
    } catch (e) {
      console.log('Failed to auth vehicle', { vin, e })
      setError(`Failed to authorize vehicle. ${e?.response?.data?.error || ''}`)
      setLoading(false)
    }
  }

  return (
    <div className="ConnectVehiclePage">
      {loading && <Spinner />}
      <ErrorMessage className="ConnectVehiclePageError" show={!!error}>
        {appConfig?.app_type === APP_TYPES.DRIVER && (
          <p>
            Could not connect vehicle. Make sure to open your emulator if using
            one
          </p>
        )}
        <p className="small">{error}</p>
      </ErrorMessage>
      <div className="ConnectVehiclePageContent">
        <h2 className="ConnectVehiclePageHeader">Connect your vehicle</h2>
        <GrayCircles />
        {appConfig?.app_type === APP_TYPES.FLEET ? (
          <form
            noValidate
            spellCheck="false"
            onSubmit={(e) => onSubmit(e)}
            className="ConnectVehiclePageForm"
          >
            {addingNew ? (
              <>
                <TextInput
                  name="vin"
                  placeholder="VIN"
                  value={vin}
                  onChange={(e) => {
                    if (
                      e.target.value.length !== 17 ||
                      e.target.value !== e.target.value.toUpperCase()
                    ) {
                      setValidationErrors((v) => ({ ...v, VIN: 'Invalid VIN' }))
                    } else {
                      setValidationErrors((v) => ({ ...v, VIN: null }))
                    }

                    setVin(e.target.value)
                  }}
                  error={validationErrors.VIN}
                />
                <BrandSelect
                  isSandbox={isSandbox}
                  value={brand}
                  onSelect={(v) => setBrand(v)}
                />
                <SecondaryButton
                  onClick={() => {
                    setAddingNew(false)
                    setVin(null)
                    setBrand(null)
                  }}
                >
                  Cancel
                </SecondaryButton>
              </>
            ) : (
              <ClearedVehiclesSelect
                vehicles={clearedFleetVehicles}
                value={vin}
                onSelect={(v) => {
                  setVin(v.vin)
                  setBrand(v.brand)
                }}
                onAddNew={() => {
                  setVin(null)
                  setBrand(isSandbox ? 'sandbox' : null)
                  setAddingNew(true)
                }}
              />
            )}
            <PrimaryButton type="submit">Add vehicle</PrimaryButton>
          </form>
        ) : (
          <a href={url?.toString()}>
            <PrimaryButton>Add a vehicle</PrimaryButton>
          </a>
        )}
      </div>
    </div>
  )
}

export default observer(ConnectVehiclePage)
