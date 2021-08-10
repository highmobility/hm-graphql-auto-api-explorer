import { upperFirst } from 'lodash'
import React from 'react'
import '../styles/ListBlock.scss'
import { formatValue } from '../utils/properties'
import { camelCaseToWords } from '../utils/strings'
import PinButton from './PinButton'

export default function ListBlock({ property }) {
  return (
    <div className="ListBlock">
      <div className="ListBlockCapability">
        {upperFirst(
          camelCaseToWords(property.config.capabilityName).toLowerCase()
        )}
      </div>
      <div className="ListBlockProperty">{property.config.name_pretty}</div>
      <div className="ListBlockValues">
        {formatValue(property.data.value)} {property.data.unit}
      </div>
      <PinButton propertyId={property.id} />
    </div>
  )
}
