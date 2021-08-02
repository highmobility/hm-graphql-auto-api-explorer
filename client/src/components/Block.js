import React from 'react'
import '../styles/Block.scss'
import PinButton from './PinButton'

export default function Block({ children, property, className = '' }) {
  return (
    <div className={`Block ${className}`}>
      <div className="BlockContent">
        <PinButton />
        <span className="BlockCapabilityLabel">{property.capabilityName}</span>
        <h4 className="BlockPropertyName">
          {property.name_pretty || property.name}
        </h4>
        {children || (
          <div className="BlockValue">
            <span className="Num1">{property.value}</span>{' '}
            <span className="Num4">{property.unit}</span>
          </div>
        )}
      </div>
    </div>
  )
}
