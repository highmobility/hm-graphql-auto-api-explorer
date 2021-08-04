import React, { useState } from 'react'
import '../styles/Header.scss'
import PrimaryButton from './PrimaryButton'
import { ReactComponent as FilterSvg } from '../images/filter.svg'
import { useMobx } from '../store/mobx'
import FilterPropertiesModal from './FilterPropertiesModal'

export default function Header() {
  const { properties } = useMobx()
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
      <FilterPropertiesModal
        show={showFilterModal}
        close={() => setShowFilterModal(false)}
      >
        filterModal
      </FilterPropertiesModal>
    </div>
  )
}
