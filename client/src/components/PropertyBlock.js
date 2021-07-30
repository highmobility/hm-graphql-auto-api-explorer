import React from 'react'
import '../styles/PropertyBlock.scss'
import PinButton from './PinButton'

export default function PropertyBlock({ children, property, className = '' }) {
  return (
    <div className={`PropertyBlock ${className}`}>
      <div className="PropertyBlockContent">
        <PinButton />
        <span className="PropertyBlockCapabilityLabel">
          {property.capabilityName}
        </span>
        <h4 className="PropertyBlockPropertyName">
          {property.name_pretty || property.name}
        </h4>
        {children || (
          <div className="PropertyBlockValue">
            <span className="Num1">{property.value}</span>{' '}
            <span className="Num4">{property.unit}</span>
          </div>
        )}
      </div>
    </div>
  )
}
