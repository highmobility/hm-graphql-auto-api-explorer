import React, { useEffect, useState } from 'react'
import Block from './Block'
import '../styles/HeadingBlock.scss'
import { ReactComponent as HeadingSvg } from '../images/heading.svg'
import { ReactComponent as HeadingCarSvg } from '../images/headingCar.svg'
import AnimatedNumber from 'animated-number-react'

export default function HeadingBlock({ property }) {
  const [valueInDegrees, setValueInDegrees] = useState(0)
  const baseRotation = 104 // svg has to be rotated to be facing up

  useEffect(() => {
    const propertyUnitType = property.config.unit.unit_types.find(
      (unitType) => unitType.name === property.unit
    )

    setValueInDegrees(
      property.value * (propertyUnitType.conversion_linear || 1)
    )
  }, [property])

  return (
    <Block className="HeadingBlock" property={property}>
      <input
        type="range"
        min="0"
        max="360"
        onChange={(e) => setValueInDegrees(e.target.value)}
      />
      <div className="HeadingBlockContent">
        <div className="HeadingCircleWrapper">
          <HeadingSvg />
          <HeadingCarSvg
            id="HeadingCarSvg"
            style={{ transform: `rotate(${valueInDegrees - baseRotation}deg)` }}
          />
        </div>
        <div className="HeadingValueWrapper">
          <div className="Num2">
            <AnimatedNumber
              value={property.value}
              formatValue={(value) => value.toFixed(0)}
            />
          </div>
          <p className="small">{property.unit}</p>
        </div>
      </div>
    </Block>
  )
}
