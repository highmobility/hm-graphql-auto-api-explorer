import React from 'react'
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
import { updateConfig } from '../requests'

const Header = () => {
  const { config, app } = useMobx()

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
      },
    },
  ]

  const updateFrequencyDropdownItems = [
    {
      value: 15,
      renderLabel: () => 'Every 15 seconds',
      onClick: () => config.setUpdateFrequency(15),
    },
    {
      value: 30,
      renderLabel: () => 'Every 30 seconds',
      onClick: () => config.setUpdateFrequency(30),
    },
    {
      value: 60,
      renderLabel: () => 'Every 60 seconds',
      onClick: () => config.setUpdateFrequency(60),
    },
  ]

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
        <Link to={routes.find((route) => route.name === PAGES.APP_CONFIG).path}>
          <div className="HeaderAppConfigButton">
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
