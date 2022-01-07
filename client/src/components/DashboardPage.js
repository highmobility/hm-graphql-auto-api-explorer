import '../styles/DashboardPage.scss'
import { observer } from 'mobx-react-lite'
import { getBlockData, getPropertyConfig } from '../utils/properties'
import Header from './Header'
import Grid from './Grid'
import { useMobx } from '../store/mobx'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchConfig, fetchProperties, fetchVehicleData } from '../requests'
import { Link } from 'react-router-dom'
import routes, { PAGES } from '../routes'
import Spinner from './Spinner'
import { VIEWS } from '../store/Config'
import { useInterval } from 'react-use'
import DashboardMap from './DashboardMap'
import ErrorMessage from './ErrorMessage'
import { useKeyPressEvent } from 'react-use'

function DashboardPage() {
  const [initialDataFetched, setInitialDataFetched] = useState(false)
  const [vehiclesFetched, setVehiclesFetched] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const { vehicles, config, properties, app } = useMobx()
  const parsedProperties = useMemo(() => {
    return config.shownProperties
      .map((propertyUniqueId) => {
        const data = properties.values?.[propertyUniqueId]
        const propertyConfig = getPropertyConfig(propertyUniqueId)

        return {
          id: propertyUniqueId,
          config: propertyConfig,
          block: getBlockData(config.view, propertyConfig, data),
          data,
        }
      })
      .sort((a, b) => {
        const sortStringA = `${
          config.pinnedProperties.includes(a.id) ? 'a' : 'b'
        }${a.config.capabilityName}${a.config.name_cased}`
        const sortStringB = `${
          config.pinnedProperties.includes(b.id) ? 'a' : 'b'
        }${b.config.capabilityName}${b.config.name_cased}`

        if (sortStringA < sortStringB) return -1
        if (sortStringA > sortStringB) return 1

        return 0
      })
  }, [
    config.pinnedProperties,
    config.shownProperties,
    config.view,
    properties.values,
  ])

  const fetchData = useCallback(async () => {
    if (!config.selectedVehicleId) return

    try {
      const vehicleData = await fetchVehicleData(
        config.selectedVehicleId,
        config.shownProperties
      )

      if (
        vehicles.list.find((vehicle) => vehicle.id === config.selectedVehicleId)
          ?.pending &&
        vehicleData?.universal
      ) {
        await vehicles.fetch()
      }

      properties.setValues(vehicleData)
      setFetchError(false)
    } catch (e) {
      setFetchError(true)
    }
  }, [properties, config, vehicles])

  useEffect(() => {
    const fetchInitialData = async () => {
      await vehicles.fetch()
      if (!config.selectedVehicleId && vehicles.list.length > 0) {
        const newSelectedVehicle = vehicles.list[0]
        config.setSelectedVehicleId(newSelectedVehicle?.id || null)
        config.setShownProperties(
          config.shownProperties.filter((p) =>
            newSelectedVehicle?.scope?.includes(p)
          )
        )
      }
      setVehiclesFetched(true)

      const {
        google_maps_api_key,
        view,
        update_frequency,
        selected_vehicle_id,
      } = await fetchConfig()
      config.setGoogleMapsApiKey(google_maps_api_key)
      config.setView(view)
      config.setUpdateFrequency(update_frequency)
      config.setSelectedVehicleId(selected_vehicle_id)

      const propertiesData = await fetchProperties()
      if (propertiesData.length > 0) {
        config.setPinnedProperties(
          propertiesData.filter((p) => p.pinned).map((p) => p.unique_id)
        )
        config.setShownProperties(propertiesData.map((p) => p.unique_id))
      }

      await fetchData()
      setInitialDataFetched(true)
    }

    fetchInitialData()
  }, []) // eslint-disable-line

  /* eslint-disable */
  useEffect(() => {
    if (!initialDataFetched) return
    fetchData()
  }, [
    config.selectedVehicleId,
    config.updateFrequency,
    config.view,
    config.shownProperties,
    fetchData,
  ])
  /* eslint-enable */

  useInterval(
    () => {
      if (!initialDataFetched) return
      fetchData()
    },
    config.selectedVehicleId ? config.updateFrequency * 1000 : null
  )

  useKeyPressEvent('r', () => {
    fetchData()
  })

  const renderContent = () => {
    if (!vehiclesFetched) return <Spinner />
    if (vehicles.list.length === 0) {
      return (
        <div className="DashboardMessage">
          <div className="DashboardMessageTitle">No vehicles added</div>
          <Link
            to={
              routes.find((route) => route.name === PAGES.CONNECT_VEHICLE).path
            }
          >
            <div className="DashboardMessageButton">Add vehicles</div>
          </Link>
        </div>
      )
    }

    if (config.shownProperties.length === 0 && config.view !== VIEWS.MAP) {
      return (
        <div className="DashboardMessage">
          <div className="DashboardMessageTitle">No properties to show</div>
          <div
            className="DashboardMessageButton"
            onClick={() => app.setShowPropertiesFilter(true)}
          >
            Filter properties
          </div>
        </div>
      )
    }

    if (!initialDataFetched) return <Spinner />

    const coordinatesProperty = parsedProperties.find(
      (parsedProperty) => parsedProperty.id === 'vehicleLocation.coordinates'
    )

    const headingProperty = parsedProperties.find(
      (parsedProperty) => parsedProperty.id === 'vehicleLocation.heading'
    )

    return (
      <div className={`DashboardPageContent`}>
        <DashboardMap
          open={config.view === VIEWS.MAP}
          coordinates={coordinatesProperty}
          heading={headingProperty}
        />
        <Grid items={parsedProperties} view={config.view} />
      </div>
    )
  }

  return (
    <div className="DashboardPage">
      <ErrorMessage show={fetchError}>
        Failed to fetch data, try removing some properties
      </ErrorMessage>
      <Header />
      {renderContent()}
    </div>
  )
}

export default observer(DashboardPage)
