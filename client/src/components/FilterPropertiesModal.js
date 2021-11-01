import React from 'react'
import '../styles/FilterPropertiesModal.scss'
import Modal from './Modal'
import CAPABILITIES from 'data/capabilities.json'
import { useMobx } from '../store/mobx'
import Toggle from './Toggle'
import { observer } from 'mobx-react-lite'
import { getPropertyUniqueId } from '../utils/properties'
import { updateProperties } from '../requests'

const FilterPropertiesModal = (props) => {
  const { config, vehicles } = useMobx()
  const disabledCategories = ['headunit', 'api_structure']

  const onClickProperty = async (propertyConfig) => {
    const uniqueId = getPropertyUniqueId(propertyConfig)

    if (config.isPropertyShown(uniqueId)) {
      config.hideProperty(uniqueId)
    } else {
      config.showProperty(uniqueId)
    }

    await updateProperties(
      config.shownProperties.map((id) => ({
        id,
        pinned: config.pinnedProperties.includes(id),
      }))
    )
  }

  const selectedVehicle = vehicles.list.find(
    (vehicle) => vehicle.id === config.selectedVehicleId
  )

  const filteredCapabilities = Object.values(CAPABILITIES)
    .map((capability) => {
      const filteredProperties = capability.properties.filter(
        (propertyConfig) => {
          const uniqueId = getPropertyUniqueId(propertyConfig)
          if (
            !selectedVehicle?.scope ||
            config.shownProperties.includes(uniqueId)
          ) {
            return true
          }

          return selectedVehicle.scope.includes(uniqueId)
        }
      )

      return {
        ...capability,
        properties: filteredProperties,
      }
    })
    .filter(
      (capability) =>
        capability.properties.length > 0 &&
        !disabledCategories.includes(capability.category)
    )

  return (
    <Modal
      {...props}
      className={`FilterPropertiesModal`}
      animation="SlideAnimation"
    >
      <div className="FilterPropertiesModalHead">
        <h4>Filter properties</h4>
        <p className="FilterPropertiesModalSelectedProperties small">
          {config.shownProperties.length} properties selected
        </p>
      </div>
      <div className="FilterPropertiesModalContent">
        {filteredCapabilities.map((capability) => (
          <div className={`FilterPropertiesCapability`} key={capability.name}>
            <div className="FilterPropertiesCapabilityName">
              {capability.name_pretty}
            </div>
            {capability.properties.map((propertyConfig) => (
              <div
                className="FilterPropertiesProperty"
                key={`${capability.name}-${propertyConfig.name}`}
              >
                <div className="FilterPropertiesPropertyName">
                  {propertyConfig.name_pretty}
                </div>
                <Toggle
                  value={config.isPropertyShown(
                    getPropertyUniqueId(propertyConfig)
                  )}
                  onChange={() => onClickProperty(propertyConfig)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </Modal>
  )
}

export default observer(FilterPropertiesModal)
