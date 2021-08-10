import '../styles/DashboardPage.scss'
import { observer } from 'mobx-react-lite'
import { getBlockData, getPropertyConfig } from '../utils/properties'
import Header from './Header'
import Grid from './Grid'
import { useMobx } from '../store/mobx'
import { useCallback, useEffect, useState } from 'react'
import { fetchVehicleData } from '../requests'
import { Link } from 'react-router-dom'
import routes, { PAGES } from '../routes'
import Spinner from './Spinner'

function DashboardPage() {
  const [dataFetched, setDataFetched] = useState(false)
  const { vehicles, config, properties, app } = useMobx()
  const parsedProperties = config.shownProperties
    .map((propertyUniqueId) => {
      const data = properties?.values?.[propertyUniqueId]
      const propertyConfig = getPropertyConfig(propertyUniqueId)

      return {
        id: propertyUniqueId,
        config: propertyConfig,
        block: getBlockData(propertyConfig),
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
    })

  const fetchData = useCallback(async () => {
    if (!config.selectedVehicleId) return

    const vehicleData = await fetchVehicleData(
      config.selectedVehicleId,
      config.shownProperties
    )

    properties.setValues(vehicleData)
    setDataFetched(true)
  }, [config.selectedVehicleId, config.shownProperties, properties])

  useEffect(() => {
    const fetchVehicles = async () => {
      await vehicles.fetch()
      if (!config.selectedVehicleId) {
        config.setSelectedVehicle(vehicles?.list?.[0]?.id || null)
      }
    }

    fetchVehicles()
  }, []) // eslint-disable-line

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, config.updateFrequency * 1000)
    return () => clearInterval(interval)
  }, [
    config.updateFrequency,
    config.shownProperties,
    config.selectedVehicleId,
    fetchData,
  ])

  return (
    <div className="DashboardPage">
      {!dataFetched && <Spinner />}
      <Header />
      {vehicles.list.length === 0 && (
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
      )}
      {vehicles.list.length > 0 && config.shownProperties.length === 0 && (
        <div className="DashboardMessage">
          <div className="DashboardMessageTitle">No properties to show</div>
          <div
            className="DashboardMessageButton"
            onClick={() => app.setShowPropertiesFilter(true)}
          >
            Filter properties
          </div>
        </div>
      )}
      {dataFetched && vehicles.list.length && config.shownProperties.length && (
        <Grid items={parsedProperties} />
      )}
    </div>
  )
}

export default observer(DashboardPage)
