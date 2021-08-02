import React, { useEffect, useState } from 'react'
import Block from './Block'
import '../styles/OdometerBlock.scss'
import AnimatedNumber from 'animated-number-react'

export default function OdometerBlock({ property }) {
  const [value, setValue] = useState(0)
  const paddedValue = `000000${value}`.slice(-6)

  useEffect(() => {
    setValue(property.value || 0)
  }, [property])

  return (
    <Block className="OdometerBlock" property={property}>
      <div className="OdometerBlockContent">
        <div className="OdometerBlockDigits">
          <div className="OdometerBlockDigit Num2">
            <AnimatedNumber
              value={paddedValue[0]}
              formatValue={(value) => value.toFixed(0)}
            />
          </div>
          <div className="OdometerBlockDigit Num2">
            <AnimatedNumber
              value={paddedValue[1]}
              formatValue={(value) => value.toFixed(0)}
            />
          </div>
          <div className="OdometerBlockDigit Num2">
            <AnimatedNumber
              value={paddedValue[2]}
              formatValue={(value) => value.toFixed(0)}
            />
          </div>
          <div className="OdometerBlockDigit Num2">
            <AnimatedNumber
              value={paddedValue[3]}
              formatValue={(value) => value.toFixed(0)}
            />
          </div>
          <div className="OdometerBlockDigit Num2">
            <AnimatedNumber
              value={paddedValue[4]}
              formatValue={(value) => value.toFixed(0)}
            />
          </div>
          <div className="OdometerBlockDigit Num2">
            <AnimatedNumber
              value={paddedValue[5]}
              formatValue={(value) => value.toFixed(0)}
            />
          </div>
        </div>
        <div className="OdometerBlockUnit">
          {property.unit.replace(/_/g, ' ')}
        </div>
      </div>
    </Block>
  )
}
