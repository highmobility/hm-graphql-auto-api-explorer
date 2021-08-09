import { upperFirst } from 'lodash'
import React from 'react'
import '../styles/Block.scss'
import PinButton from './PinButton'

export default function Block({ children, property, className = '' }) {
  return (
    <div className={`Block ${className}`}>
      <div className="BlockContent">
        <PinButton propertyId={property.id} />
        <span className="BlockCapabilityLabel">
          {property.config.capabilityName}
        </span>
        <h4 className="BlockPropertyName">
          {upperFirst(
            (
              property.config.name_pretty ||
              property.config.name.replace(/_/g, ' ')
            ).toLowerCase()
          )}
        </h4>
        {children || (
          <div className="BlockValue">
            <span className="Num1">{property?.data?.value}</span>{' '}
            <span className="Num4">{property?.data?.unit}</span>
          </div>
        )}
      </div>
    </div>
  )
}
