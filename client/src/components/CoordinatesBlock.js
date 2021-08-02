import React, { useEffect, useState } from 'react'
import '../styles/CoordinatesBlock.scss'
import Block from './Block'
import AnimatedNumber from 'animated-number-react'

export default function CoordinatesBlock({ property }) {
  const [valueInDegrees, setValueInDegrees] = useState(0)

  useEffect(() => {
    const propertyUnitType = property.config.unit.unit_types.find(
      (unitType) => unitType.name === property.unit
    )

    setValueInDegrees(property.value * propertyUnitType.conversion_linear)
  }, [property])

  return (
    <Block className="CoordinatesBlock" property={property}>
      <div className="CoordinatesBlockContent">Coordinates block</div>
    </Block>
  )
}
