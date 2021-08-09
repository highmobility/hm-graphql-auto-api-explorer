import '../styles/DashboardPage.scss'
import { observer } from 'mobx-react-lite'
import { getBlockData, getPropertyConfig } from '../utils/properties'
import Header from './Header'
import Grid from './Grid'
import { useMobx } from '../store/mobx'
import { useCallback, useEffect, useState } from 'react'
import { fetchVehicleData } from '../requests'

function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const { vehicles, config, properties } = useMobx()
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
        return 0
      }

      return config.pinnedProperties.includes(a.id) ? -1 : 1
    })

  const fetchData = useCallback(async () => {
    const vehicleData = await fetchVehicleData(
      config.selectedVehicleId,
      config.shownProperties
    )

    properties.setValues(vehicleData)
  }, []) // eslint-disable-line

  useEffect(() => {
    const fetchPageData = async () => {
      await vehicles.fetch()
      if (!config.selectedVehicleId) {
        config.setSelectedVehicle(vehicles?.list?.[0]?.id || null)
      }
      await fetchData()
      setLoading(false)
    }

    fetchPageData()
    const interval = setInterval(fetchData, config.updateFrequency * 1000)
    return () => clearInterval(interval)
  }, []) // eslint-disable-line

  if (loading) return null

  return (
    <div className="DashboardPage">
      <Header />
      {vehicles.list.length === 0 ? (
        <div className="DashboardMessage">
          <div className="DashboardMessageTitle">No vehicles added</div>
          <div className="DashboardMessageButton">Add vehicles</div>
        </div>
      ) : (
        <Grid items={parsedProperties} />
      )}
    </div>
  )
}

export default observer(DashboardPage)
