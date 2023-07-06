import React, { Fragment, useState } from 'react'
import '../styles/VehicleSelect.scss'
import PrimaryButton from './PrimaryButton'
import { useMobx } from '../store/mobx'
import Dropdown from './Dropdown'
import { useHistory } from 'react-router-dom'
import routes, { PAGES } from '../routes'
import { observer } from 'mobx-react-lite'
import { ReactComponent as CrossSvg } from '../images/cross.svg'
import { updateConfig } from '../requests'
import ConfirmModal from './ConfirmModal'

const VehicleSelect = () => {
  const { config, vehicles, properties } = useMobx()
  const history = useHistory()
  const [vehicleToDelete, setVehicleToDelete] = useState(null)
  const onConfirmDelete = async (id) => {
    await vehicles.delete(id)
    setVehicleToDelete(null)
    vehicles.remove(id)
    config.setSelectedVehicleId(vehicles.list?.[0]?.id || null)
    await updateConfig({ selectedVehicleId: vehicles.list?.[0]?.id || null })
  }

  const selectedVehicle = vehicles.list.find(
    (vehicle) => vehicle.id === config.selectedVehicleId
  )

  const vehicleDropdownItems = [
    ...vehicles.list.map((vehicle) => ({
      value: vehicle.id,
      renderLabel: () => (
        <Fragment>
          {!vehicle.brand || !vehicle.vin ? (
            <div className="VehicleSelectDropdownBrand">Pending vehicle</div>
          ) : (
            <Fragment>
              <div className="VehicleSelectDropdownBrand">{vehicle.brand}</div>
              <div className="VehicleSelectDropdownVin">{vehicle.vin}</div>
            </Fragment>
          )}
          <CrossSvg
            className="VehicleSelectDropdownDelete"
            onClick={() => setVehicleToDelete(vehicle.id)}
          />
        </Fragment>
      ),
      onClick: async () => {
        if (config.selectedVehicleId === vehicle.id) return

        properties.resetValues()
        config.setSelectedVehicleId(vehicle.id)
        await updateConfig({ selectedVehicleId: vehicle.id })
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

    return !selectedVehicle.brand || !selectedVehicle.vin ? (
      <div className="VehicleSelectButtonBrand">Pending vehicle</div>
    ) : (
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
      <ConfirmModal
        show={!!vehicleToDelete}
        close={() => setVehicleToDelete(null)}
        onConfirm={() => onConfirmDelete(vehicleToDelete)}
        headerText="Do you want to revoke the connection with this car?"
        descriptionText="Once you confirm, you will not able to access its data again."
        confirmText="Yes, revoke"
        cancelText="No, don't revoke"
      />
    </div>
  )
}

export default observer(VehicleSelect)
