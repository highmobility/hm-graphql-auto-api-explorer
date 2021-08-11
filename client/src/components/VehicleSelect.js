import React, { Fragment } from 'react'
import '../styles/VehicleSelect.scss'
import PrimaryButton from './PrimaryButton'
import { useMobx } from '../store/mobx'
import Dropdown from './Dropdown'
import { useHistory } from 'react-router-dom'
import routes, { PAGES } from '../routes'
import { observer } from 'mobx-react-lite'
import { ReactComponent as CrossSvg } from '../images/cross.svg'

const VehicleSelect = () => {
  const { config, vehicles } = useMobx()
  const history = useHistory()

  const vehicleDropdownItems = [
    ...vehicles.list.map((vehicle) => ({
      value: vehicle.id,
      renderLabel: () => (
        <Fragment>
          <div className="VehicleSelectDropdownBrand">{vehicle.brand}</div>
          <div className="VehicleSelectDropdownVin">{vehicle.vin}</div>
          <CrossSvg
            className="VehicleSelectDropdownDelete"
            onClick={() => vehicles.delete(vehicle.vin)}
          />
        </Fragment>
      ),
      onClick: () => {
        config.setSelectedVehicle(vehicle.id)
      },
    })),
    {
      renderLabel: () => (
        <Fragment>
          <PrimaryButton>Add vehicle</PrimaryButton>
        </Fragment>
      ),
      onClick: () => {
        history.push(
          routes.find((route) => route.name === PAGES.CONNECT_VEHICLE).path
        )
      },
    },
  ]

  const renderLabel = () => (
    <Fragment>
      <div className="VehicleSelectButtonBrand">
        {selectedVehicle?.brand?.toLowerCase()}
      </div>
      <div className="VehicleSelectButtonVin">{selectedVehicle?.vin}</div>
    </Fragment>
  )

  const selectedVehicle = vehicles.list.find(
    (vehicle) => vehicle.id === config.selectedVehicleId
  )

  return (
    <div className="VehicleSelect">
      <Dropdown
        value={config.selectedVehicleId}
        renderLabel={renderLabel}
        items={vehicleDropdownItems}
      />
    </div>
  )
}

export default observer(VehicleSelect)
