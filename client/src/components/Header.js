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
      <div className="HeaderItem">
        <Dropdown
          value={config.view}
          label={upperFirst(`${config.view} view`.toLowerCase())}
          items={[
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
          ]}
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
