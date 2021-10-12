import React from 'react'
import Dropdown from './Dropdown'
import '../styles/FleetVehicleSelect.scss'

const VEHICLE_STATUS = {
  PENDING: 'pending',
  REVOKED: 'revoked',
  APPROVED: 'approved',
}

function FleetVehicleSelect({ value, fleetVehicles = [], onSelect }) {
  const fleetVehicleDropdownItems = (fleetVehicles || [])
    .sort((a) => (a.status === VEHICLE_STATUS.APPROVED ? -1 : 1))
    .map((fleetVehicle) => {
      return {
        value: fleetVehicle.vin,
        onClick: () => onSelect(fleetVehicle.vin),
        disabled: fleetVehicle.status !== VEHICLE_STATUS.APPROVED,
        renderLabel: () =>
          renderSelectItem(fleetVehicle.vin, fleetVehicle.status),
      }
    })

  const selectedVehicle = fleetVehicles?.find(
    (vehicle) => vehicle.vin === value
  )

  const renderSelectItem = (vin, status) => (
    <div key={vin} className={`FleetVehicle ${value === vin ? 'Active' : ''}`}>
      <h5 className="FleetVehicleVin">{vin}</h5>
      <div className="FleetVehicleStatus">{status}</div>
    </div>
  )

  return (
    <div className="FleetVehicleSelect">
      <Dropdown
        value={value}
        renderLabel={() =>
          value
            ? renderSelectItem(value, selectedVehicle?.status)
            : 'Select a vehicle'
        }
        items={fleetVehicleDropdownItems}
      />
    </div>
  )
}

export default FleetVehicleSelect
