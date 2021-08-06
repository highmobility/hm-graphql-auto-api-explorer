import React from 'react'
import '../styles/FilterPropertiesModal.scss'
import Modal from './Modal'
import CAPABILITIES from '../data/capabilities.json'
import { useMobx } from '../store/mobx'
import Toggle from './Toggle'
import { observer } from 'mobx-react-lite'

const FilterPropertiesModal = (props) => {
  const { config } = useMobx()

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
          <div className="FilterPropertiesCapability" key={capability.name}>
            <div className="FilterPropertiesCapabilityName">
              {capability.name_pretty}
            </div>
            {capability.properties.map((property) => (
              <div
                className="FilterPropertiesProperty"
                key={`${capability.name}-${property.name}`}
              >
                <div className="FilterPropertiesPropertyName">
                  {property.name_pretty}
                </div>
                <Toggle
                  value={config.isPropertyShown(property)}
                  onChange={() => {
                    config.isPropertyShown(property)
                      ? config.hideProperty(property)
                      : config.showProperty(property)
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
