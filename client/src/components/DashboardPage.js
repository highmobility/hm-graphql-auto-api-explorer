import '../styles/DashboardPage.scss'
import { observer } from 'mobx-react-lite'
import { getBlockData, getPropertyConfig } from '../utils/properties'
import Header from './Header'
import Grid from './Grid'
import { useMobx } from '../store/mobx'
import { useEffect } from 'react'

function DashboardPage() {
  const { vehicles, app, config } = useMobx()
  const properties = [
    {
      id: 0,
      name: 'engine_oil_temperature',
      name_pretty: 'Engine oil temperature',
      capabilityName: 'diagnostics',
      value: 34.5,
      type: 'unit.temperature',
      unit: 'celsius',
    },
    {
      id: 1,
      name: 'battery_level',
      name_pretty: 'Battery level',
      capabilityName: 'diagnostics',
      value: 0.65,
      type: 'types.percentage',
    },
    {
      id: 2,
      name: 'speed',
      name_pretty: 'Speed',
      capabilityName: 'diagnostics',
      value: 300,
      type: 'unit.speed',
      unit: 'kilometers_per_hour',
    },
    {
      id: 3,
      name: 'coordinates',
      name_pretty: 'Coordinates',
      capabilityName: 'vehicle_location',
      value: {
        latitude: 59.4075791,
        longitude: 24.7240193,
      },
    },
    {
      id: 4,
      name: 'odometer',
      name_pretty: 'Odometer',
      capabilityName: 'diagnostics',
      unit: 'kilometers',
      value: 4339,
    },
    {
      id: 5,
      name: 'positions',
      capabilityName: 'doors',
      positions: [
        {
          location: 'front_left',
          value: 'open',
        },
        {
          location: 'front_right',
          value: 'open',
        },
        {
          location: 'rear_left',
          value: 'closed',
        },
        {
          location: 'rear_right',
          value: 'closed',
        },
      ],
    },
    {
      id: 6,
      name: 'fuel_level',
      capabilityName: 'diagnostics',
      value: 0.9,
    },
    {
      id: 7,
      name: 'heading',
      capabilityName: 'vehicle_location',
      unit: 'degrees',
      value: 170.370123,
    },
  ]
  const parsedProperties = properties.map((p) => ({
    ...p,
    block: getBlockData(p),
    config: getPropertyConfig(p),
  }))

  useEffect(() => {
    const fetchPageData = async () => {
      app.setLoading(true)
      await vehicles.fetch()
      if (!config.selectedVehicleId) {
        config.setSelectedVehicle(vehicles?.list?.[0]?.id || null)
      }
      app.setLoading(false)
    }
    fetchPageData()
  }, [])

  if (app.loading) return null

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
