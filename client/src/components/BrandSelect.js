import React from 'react'
import Dropdown from './Dropdown'
import '../styles/BrandSelect.scss'
import { brands } from '../utils/brands'

function BrandSelect({ isSandbox, value, onSelect }) {
  const dropdownItems = brands
    .filter((b) => {
      if (isSandbox) {
        return b.value === 'sandbox'
      }

      return b.value !== 'sandbox'
    })
    .map((brand) => {
      return {
        value: brand.value,
        onClick: () => onSelect(brand.value),
        renderLabel: () => renderSelectItem(brand.name, brand.value),
      }
    })

  const selectedBrand = brands.find((brand) => brand.value === value)

  const renderSelectItem = (brandName, brandValue) => (
    <div
      key={brandValue}
      className={`Brand ${value === brandValue ? 'Active' : ''}`}
    >
      {brandName}
    </div>
  )

  return (
    <div className="BrandSelect">
      <Dropdown
        value={value}
        renderLabel={() =>
          value
            ? renderSelectItem(selectedBrand?.name, selectedBrand?.value)
            : 'Brand'
        }
        items={dropdownItems}
      />
    </div>
  )
}

export default BrandSelect
