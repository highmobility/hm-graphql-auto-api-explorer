import { upperFirst } from 'lodash'
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
          {upperFirst(
            (
              property.name_pretty || property.name.replace(/_/g, ' ')
            ).toLowerCase()
          )}
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
