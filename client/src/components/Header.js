import React from 'react'
import '../styles/Header.scss'
import PrimaryButton from './PrimaryButton'
import { ReactComponent as FilterSvg } from '../images/filter.svg'
import { useMobx } from '../store/mobx'

export default function Header() {
  const { properties } = useMobx()

  return (
    <div className={`Header`}>
      <div className="HeaderItem">
        <PrimaryButton className="HeaderFilterButton">
          <FilterSvg />
          <span>Filter properties</span>
        </PrimaryButton>
      </div>
      <div className="HeaderItem">
        <div className="HeaderShownPropertiesCount">
          {properties.shown.length} properties shown
        </div>
      </div>
    </div>
  )
}
