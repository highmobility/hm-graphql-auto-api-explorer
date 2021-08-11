import React from 'react'
import '../styles/FilterPropertiesModal.scss'
import Modal from './Modal'
import CAPABILITIES from '../data/capabilities.json'
import { useMobx } from '../store/mobx'
import Toggle from './Toggle'
import { observer } from 'mobx-react-lite'

const FilterPropertiesModal = (props) => {
  const { config } = useMobx()
  const disabledCategories = ['headunit', 'api_structure']

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
        {Object.values(CAPABILITIES).map((capability) => (
          <div
            className={`FilterPropertiesCapability ${
              disabledCategories.includes(capability.category) ? 'Disabled' : ''
            }`}
            key={capability.name}
          >
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
                  value={config.isPropertyShown(propertyConfig)}
                  onChange={() => {
                    config.isPropertyShown(propertyConfig)
                      ? config.hideProperty(propertyConfig)
                      : config.showProperty(propertyConfig)
                  }}
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
