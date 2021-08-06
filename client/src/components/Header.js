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

const Header = () => {
  const { properties, config } = useMobx()
  const [showFilterModal, setShowFilterModal] = useState(false)

  const viewDropdownItems = [
    {
      value: VIEWS.GRID,
      label: 'Grid view',
      onClick: () => config.setView(VIEWS.GRID),
    },
    {
      value: VIEWS.LIST,
      label: 'List view',
      onClick: () => config.setView(VIEWS.LIST),
    },
    {
      value: VIEWS.MAP,
      label: 'Map view',
      onClick: () => config.setView(VIEWS.MAP),
    },
  ]

  const updateFrequencyDropdownItems = [
    {
      value: 5,
      label: 'Every 5 seconds',
      onClick: () => config.setUpdateFrequency(5),
    },
    {
      value: 10,
      label: 'Every 10 seconds',
      onClick: () => config.setUpdateFrequency(10),
    },
    {
      value: 15,
      label: 'Every 15 seconds',
      onClick: () => config.setUpdateFrequency(15),
    },
  ]

  return (
    <div className={`Header`}>
      <div className="HeaderItem">
        <PrimaryButton
          className="HeaderFilterButton"
          onClick={() => setShowFilterModal(!showFilterModal)}
        >
          <FilterSvg />
          <span>Filter properties</span>
        </PrimaryButton>
      </div>
      <div className="HeaderItem">
        <div className="HeaderShownPropertiesCount">
          {properties.shown.length} properties shown
        </div>
      </div>
      <div className="HeaderItem HeaderViewDropdown">
        <Dropdown
          value={config.view}
          label={upperFirst(`${config.view} view`.toLowerCase())}
          items={viewDropdownItems}
        />
      </div>
      <div className="HeaderItem HeaderFrequencyDropdown">
        <Dropdown
          value={config.updateFrequency}
          label={`Update every ${config.updateFrequency}s`}
          items={updateFrequencyDropdownItems}
        />
      </div>
      <FilterPropertiesModal
        show={showFilterModal}
        close={() => setShowFilterModal(false)}
      >
        filterModal
      </FilterPropertiesModal>
    </div>
  )
}

export default observer(Header)
