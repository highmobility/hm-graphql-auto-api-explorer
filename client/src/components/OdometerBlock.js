import React, { useEffect, useState } from 'react'
import Block from './Block'
import '../styles/OdometerBlock.scss'
import useAnimateNumber from '../hooks/useAnimateNumber'
import { formatUnit } from '../utils/properties'

export default function OdometerBlock({ property }) {
  const [value, setValue] = useState(0)
  const animatedValue = useAnimateNumber(Number(value), 500, (n) =>
    `000000${n.toFixed(0)}`.slice(-6)
  )

  useEffect(() => {
    setValue(property?.data?.value || 0)
  }, [property])

  return (
    <Block className="OdometerBlock" property={property}>
      <div className="OdometerBlockContent">
        <div className="OdometerBlockDigits">
          <div className="OdometerBlockDigit Num2">{animatedValue[0]}</div>
          <div className="OdometerBlockDigit Num2">{animatedValue[1]}</div>
          <div className="OdometerBlockDigit Num2">{animatedValue[2]}</div>
          <div className="OdometerBlockDigit Num2">{animatedValue[3]}</div>
          <div className="OdometerBlockDigit Num2">{animatedValue[4]}</div>
          <div className="OdometerBlockDigit Num2">{animatedValue[5]}</div>
        </div>
        <div className="OdometerBlockUnit">
          {formatUnit(property?.data?.unit)}
        </div>
      </div>
    </Block>
  )
}
