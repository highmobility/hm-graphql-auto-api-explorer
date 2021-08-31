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

function DashboardPage() {
  const [initialDataFetched, setInitialDataFetched] = useState(false)
  const [vehiclesFetched, setVehiclesFetched] = useState(false)
  const { vehicles, config, properties, app } = useMobx()
  const parsedProperties = useMemo(() => {
    return config.shownProperties
      .map((propertyUniqueId) => {
        const data = properties.values?.[propertyUniqueId]
        const propertyConfig = getPropertyConfig(propertyUniqueId)

        return {
          id: propertyUniqueId,
          config: propertyConfig,
          block: getBlockData(config.view, propertyConfig),
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

    const vehicleData = await fetchVehicleData(
      config.selectedVehicleId,
      config.shownProperties
    )
    properties.setValues(vehicleData)

    if (!initialDataFetched) {
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

      setInitialDataFetched(true)
    }
  }, [properties, initialDataFetched, config])

  useEffect(() => {
    const fetchVehicles = async () => {
      await vehicles.fetch()
      if (!config.selectedVehicleId && vehicles.list.length > 0) {
        config.setSelectedVehicleId(vehicles.list[0]?.id || null)
      }
      setVehiclesFetched(true)
    }

    fetchVehicles()
  }, []) // eslint-disable-line

  useEffect(() => {
    fetchData()
  }, [
    config.selectedVehicleId,
    config.updateFrequency,
    config.view,
    config.shownProperties,
    fetchData,
  ])

  useInterval(
    () => {
      fetchData()
    },
    config.selectedVehicleId ? config.updateFrequency * 1000 : null
  )

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
      <Header />
      {renderContent()}
    </div>
  )
}

export default observer(DashboardPage)
