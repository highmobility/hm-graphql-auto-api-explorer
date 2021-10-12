import { observer } from 'mobx-react-lite'
import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  authFleetVehicle,
  AUTH_CALLBACK_URL,
  fetchAppConfig,
  fetchFleetVehicles,
} from '../requests'
import routes, { PAGES } from '../routes'
import '../styles/ConnectVehiclePage.scss'
import GrayCircles from './GrayCircles'
import PrimaryButton from './PrimaryButton'
import { useLocation } from 'react-use'
import { APP_TYPES } from '../store/Config'
import ErrorMessage from './ErrorMessage'
import FleetVehicleSelect from './FleetVehicleSelect'
import Spinner from './Spinner'
import { FLEET_AUTH_STATUS } from '../utils/fleet'

function ConnectVehiclePage() {
  const [url, setUrl] = useState(null)
  const [appConfig, setAppConfig] = useState(null)
  const history = useHistory()
  const [error, setError] = useState(
    new URLSearchParams(useLocation().search).get('error')
  )
  const [vin, setVin] = useState('')
  const [fleetVehicles, setFleetVehicles] = useState(null)
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        if (appConfig?.app_type === APP_TYPES.FLEET) {
          setLoading(true)
          const vehicles = await fetchFleetVehicles()
          setFleetVehicles(vehicles)
          if (vehicles.length > 0) {
            const vehicleToSelect = vehicles.find(
              (vehicle) => vehicle.state === FLEET_AUTH_STATUS.APPROVED
            )
            if (vehicleToSelect) {
              setVin(vehicleToSelect.vin)
            }
          }
        }
        setLoading(false)
      } catch (e) {
        console.log('Failed to fetch fleet vehicles', e)
        setError('Failed to fetch fleet vehicles')
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [appConfig])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!vin) {
      setError('You need to select a vehicle')
      return
    }

    try {
      setLoading(true)
      await authFleetVehicle(vin)
      history.push(routes.find((route) => route.name === PAGES.DASHBOARD).path)
    } catch (e) {
      console.log('Failed to auth vehicle', { vin })
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
            {fleetVehicles?.length === 0 && <label>No vehicles found</label>}
            {
              <FleetVehicleSelect
                value={vin}
                onSelect={(selectedVin) => setVin(selectedVin)}
                fleetVehicles={fleetVehicles}
              />
            }
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
