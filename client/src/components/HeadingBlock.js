import React, { useEffect, useState } from 'react'
import Block from './Block'
import '../styles/HeadingBlock.scss'
import { ReactComponent as HeadingSvg } from '../images/heading.svg'
import { ReactComponent as HeadingCarSvg } from '../images/headingCar.svg'
import useAnimateNumber from '../hooks/useAnimateNumber'
import { valueWithBaseUnit } from '../utils/properties'

export default function HeadingBlock({ property }) {
  const [valueInDegrees, setValueInDegrees] = useState(0)
  const baseRotation = 104 // svg has to be rotated to be facing up
  const animatedValue = useAnimateNumber(Number(property.data.value), 500)

  useEffect(() => {
    setValueInDegrees(
      valueWithBaseUnit(
        property.data.value,
        property.data.unit,
        property.config
      )
    )
  }, [property])

  return (
    <Block className="HeadingBlock" property={property}>
      <div className="HeadingBlockContent">
        <div className="HeadingCircleWrapper">
          <HeadingSvg id="HeadingCircleSvg" />
          <HeadingCarSvg
            id="HeadingCarSvg"
            style={{ transform: `rotate(${valueInDegrees - baseRotation}deg)` }}
          />
        </div>
        <div className="HeadingValueWrapper">
          <div className="Num2">{animatedValue}</div>
          <p className="small">{property.data.unit}</p>
        </div>
      </div>
    </Block>
  )
}
