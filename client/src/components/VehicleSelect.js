import React, { Fragment, useState } from 'react'
import '../styles/VehicleSelect.scss'
import PrimaryButton from './PrimaryButton'
import { useMobx } from '../store/mobx'
import Dropdown from './Dropdown'
import { useHistory } from 'react-router-dom'
import routes, { PAGES } from '../routes'
import { observer } from 'mobx-react-lite'
import { ReactComponent as CrossSvg } from '../images/cross.svg'
import DeleteVehicleModal from './DeleteVehicleModal'

const VehicleSelect = () => {
  const { config, vehicles } = useMobx()
  const history = useHistory()
  const [vehicleToDelete, setVehicleToDelete] = useState(null)
  const onConfirmDelete = async (id) => {
    await vehicles.delete(id)
    setVehicleToDelete(null)
  }

  const selectedVehicle = vehicles.list.find(
    (vehicle) => vehicle.vin === config.selectedVehicleId
  )

  const vehicleDropdownItems = [
    ...vehicles.list.map((vehicle) => ({
      value: vehicle.id,
      renderLabel: () => (
        <Fragment>
          <div className="VehicleSelectDropdownBrand">{vehicle.brand}</div>
          <div className="VehicleSelectDropdownVin">{vehicle.vin}</div>
          <CrossSvg
            className="VehicleSelectDropdownDelete"
            onClick={() => setVehicleToDelete(vehicle.id)}
          />
        </Fragment>
      ),
      onClick: () => {
        config.setSelectedVehicleId(vehicle.id)
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

  const renderLabel = () => {
    if (!selectedVehicle) return 'No selected vehicle'

    return (
      <Fragment>
        <div className="VehicleSelectButtonBrand">
          {selectedVehicle?.brand?.toLowerCase()}
        </div>
        <div className="VehicleSelectButtonVin">{selectedVehicle?.vin}</div>
      </Fragment>
    )
  }

  return (
    <div className="VehicleSelect">
      <Dropdown
        value={config.selectedVehicleId}
        renderLabel={renderLabel}
        items={vehicleDropdownItems}
      />
      <DeleteVehicleModal
        show={!!vehicleToDelete}
        close={() => setVehicleToDelete(null)}
        onConfirm={() => onConfirmDelete(vehicleToDelete)}
      />
    </div>
  )
}

export default observer(VehicleSelect)
