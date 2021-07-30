import React from 'react'
import '../styles/PropertyBlock.scss'
import PinButton from './PinButton'

export default function PropertyBlock({ property }) {
  return (
    <div className={`PropertyBlock`}>
      <div className="PropertyBlockContent">
        <PinButton />
        <span className="PropertyBlockCapabilityLabel">
          {property.capabilityName}
        </span>
        <h4 className="PropertyBlockCapabilityName">{property?.name}</h4>
        <div className="PropertyBlockValue">
          <span className="Num1">{property.value}</span>{' '}
          <span className="Num4">{property.unit}</span>
        </div>
      </div>
    </div>
  )
}
