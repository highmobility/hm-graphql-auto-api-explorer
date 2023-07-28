import React from 'react'
import Dropdown from './Dropdown'
import '../styles/ClearedVehiclesSelect.scss'

function ClearedVehiclesSelect({ vehicles, value, onSelect, onAddNew }) {
  const dropdownItems = [
    ...vehicles.map((vehicle) => {
      return {
        value: {
          vin: vehicle.vin,
          brand: vehicle.brand,
        },
        renderLabel: () => `${vehicle.vin}`,
        onClick: () => onSelect(vehicle),
      }
    }),
    {
      renderLabel: () => <b>Add new vehicle</b>,
      onClick: () => onAddNew(),
    },
  ]

  return (
    <div className="ClearedVehiclesSelect">
      <Dropdown
        value={value}
        renderLabel={() => value || 'Choose a vehicle'}
        items={dropdownItems}
      />
    </div>
  )
}

export default ClearedVehiclesSelect
