import '../styles/DashboardPage.scss'
import { observer } from 'mobx-react-lite'
import { getBlockData, getPropertyConfig } from '../utils/properties'
import Header from './Header'
import Grid from './Grid'
import { useMobx } from '../store/mobx'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchVehicleData } from '../requests'
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
  const parsedProperties = useMemo(
    () =>
      config.shownProperties
        .map((propertyUniqueId) => {
          const data = properties?.values?.[propertyUniqueId]
          const propertyConfig = getPropertyConfig(propertyUniqueId)

          return {
            id: propertyUniqueId,
            config: propertyConfig,
            block: getBlockData(config.view, propertyConfig),
            data,
          }
        })
        .sort((a, b) => {
          if (
            config.pinnedProperties.includes(a.id) &&
            config.pinnedProperties.includes(b.id)
          ) {
            return config.pinnedProperties.indexOf(a.id) <
              config.pinnedProperties.indexOf(b.id)
              ? -1
              : 1
          }

          return config.pinnedProperties.includes(a.id) ? -1 : 1
        }),
    [
      config.pinnedProperties,
      config.shownProperties,
      config.view,
      properties.values,
    ]
  )

  const fetchData = useCallback(async () => {
    if (!config.selectedVehicleId) return
    const vehicleData = await fetchVehicleData(
      config.selectedVehicleId,
      config.shownProperties
    )

    if (!initialDataFetched) setInitialDataFetched(true)
    properties.setValues(vehicleData)
  }, [
    config.selectedVehicleId,
    config.shownProperties,
    properties,
    initialDataFetched,
  ])

  useEffect(() => {
    const fetchVehicles = async () => {
      await vehicles.fetch()
      if (!config.selectedVehicleId && vehicles.list.length > 0) {
        config.setSelectedVehicle(vehicles.list[0]?.id || null)
      }
      setVehiclesFetched(true)
    }

    fetchVehicles()
  }, []) // eslint-disable-line

  useEffect(() => {
    fetchData()
  }, [config.selectedVehicleId, config.updateFrequency]) // eslint-disable-line

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

    return (
      <div className={`DashboardPageContent`}>
        <DashboardMap open={config.view === VIEWS.MAP} />
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
