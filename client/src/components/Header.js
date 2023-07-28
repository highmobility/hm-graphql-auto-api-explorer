import React, { useState } from 'react'
import '../styles/Header.scss'
import PrimaryButton from './PrimaryButton'
import { ReactComponent as FilterSvg } from '../images/filter.svg'
import { useMobx } from '../store/mobx'
import FilterPropertiesModal from './FilterPropertiesModal'
import Dropdown from './Dropdown'
import { VIEWS } from '../store/Config'
import { upperFirst } from 'lodash'
import { observer } from 'mobx-react-lite'
import VehicleSelect from './VehicleSelect'
import { ReactComponent as CogSvg } from '../images/cog.svg'
import { Link } from 'react-router-dom'
import routes, { PAGES } from '../routes'
import {
  fetchProperties,
  refreshVehicleData,
  updateConfig,
  updateProperties,
} from '../requests'
import { ReactComponent as DownloadSvg } from '../images/download.svg'
import { ReactComponent as RefreshSvg } from '../images/refresh.svg'
import { API_URL } from '../requests'

const Header = () => {
  const { config, app, vehicles } = useMobx()
  const [refreshing, setRefreshing] = useState(false)

  const viewDropdownItems = [
    {
      value: VIEWS.GRID,
      renderLabel: () => 'Grid view',
      onClick: async () => {
        config.setView(VIEWS.GRID)
        await updateConfig({ view: VIEWS.GRID })
      },
    },
    {
      value: VIEWS.LIST,
      renderLabel: () => 'List view',
      onClick: async () => {
        config.setView(VIEWS.LIST)
        await updateConfig({ view: VIEWS.LIST })
      },
    },
    {
      value: VIEWS.MAP,
      renderLabel: () => 'Map view',
      onClick: async () => {
        config.setView(VIEWS.MAP)
        await updateConfig({ view: VIEWS.MAP })
        config.showProperties([
          'vehicleLocation.coordinates',
          'vehicleLocation.heading',
        ])
        await updateProperties(
          config.shownProperties.map((id) => ({
            id,
            pinned: config.pinnedProperties.includes(id),
          }))
        )
      },
    },
  ]

  const updateFrequencyDropdownItems = [
    {
      value: 15,
      renderLabel: () => 'Every 15 seconds',
      onClick: async () => {
        config.setUpdateFrequency(15)
        await updateConfig({ updateFrequency: 15 })
      },
    },
    {
      value: 30,
      renderLabel: () => 'Every 30 seconds',
      onClick: async () => {
        config.setUpdateFrequency(30)
        await updateConfig({ updateFrequency: 30 })
      },
    },
    {
      value: 60,
      renderLabel: () => 'Every 60 seconds',
      onClick: async () => {
        config.setUpdateFrequency(60)
        await updateConfig({ updateFrequency: 60 })
      },
    },
  ]

  const handleRefresh = async () => {
    if (!config.selectedVehicleId) return

    try {
      setRefreshing(true)
      await refreshVehicleData(config.selectedVehicleId)
      const [propertiesData] = await Promise.all([
        fetchProperties(),
        vehicles.fetch(),
      ])
      const selectedVehicle = vehicles.list.find(
        (v) => v.id === config.selectedVehicleId
      )
      if (propertiesData.length > 0) {
        config.setShownProperties(
          propertiesData
            .filter((p) => selectedVehicle?.scope?.includes(p.unique_id))
            .map((p) => p.unique_id)
        )
      }

      setRefreshing(false)
    } catch (e) {
      setRefreshing(false)
      console.log('refresh failed', e)
    }
  }

  return (
    <div className={`Header`}>
      <div className="HeaderContent">
        <VehicleSelect />
        <PrimaryButton
          className="HeaderFilterButton"
          onClick={() => app.setShowPropertiesFilter(!app.showPropertiesFilter)}
        >
          <FilterSvg />
          <span>Filter properties</span>
        </PrimaryButton>
        <div className="HeaderShownPropertiesCount">
          {config.shownProperties.length} properties shown
        </div>
        <Dropdown
          className="HeaderViewDropdown"
          value={config.view}
          renderLabel={() => upperFirst(`${config.view} view`.toLowerCase())}
          items={viewDropdownItems}
        />
        <Dropdown
          className="HeaderFrequencyDropdown"
          value={config.updateFrequency}
          renderLabel={() => `Update every ${config.updateFrequency}s`}
          items={updateFrequencyDropdownItems}
        />
        <button
          className="HeaderIconButton"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshSvg width="24px" height="24px" />
        </button>
        <a
          href={`${API_URL}/logs/csv?download`}
          download
          className="HeaderIconButton"
        >
          <DownloadSvg />
        </a>
        <Link to={routes.find((route) => route.name === PAGES.APP_CONFIG).path}>
          <div className="HeaderIconButton ConfigButton">
            <CogSvg />
          </div>
        </Link>
        <FilterPropertiesModal
          show={app.showPropertiesFilter}
          close={() => app.setShowPropertiesFilter(false)}
        />
      </div>
    </div>
  )
}

export default observer(Header)
