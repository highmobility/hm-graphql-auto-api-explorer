import React, { useEffect, useState } from 'react'
import Block from './Block'
import '../styles/BatteryLevelBlock.scss'
import useAnimateNumber from '../hooks/useAnimateNumber'

export default function BatteryLevelBlock({ property }) {
  const [value, setValue] = useState(0)
  const percentValue = value * 100
  const animatedValue = useAnimateNumber(Number(percentValue), 500)

  useEffect(() => {
    setValue(property?.data?.value || 0)
  }, [property])

  return (
    <Block className="BatteryLevelBlock" property={property}>
      <div className="BatteryLevelBlockContent">
        <svg
          width="57"
          height="95"
          viewBox="0 0 57 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="2"
            y="8"
            width="51"
            height="85"
            rx="11"
            stroke="#6C757D"
            strokeWidth="4"
          />
          <path
            id="ValuePath"
            d="M 8 16 H 47 V 81 C 47 84.3137 44.3137 87 41 87 H 14 C 10.6863 87 8 84.3137 8 81 V 25 Z"
            fill="url(#paint0_linear)"
            style={{ transform: `scaleY(${percentValue / 100})` }}
          />
          <rect
            width="31"
            height="10"
            rx="5"
            transform="matrix(1 0 0 -1 12 10)"
            fill="#6C757D"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="27.5"
              y1="32"
              x2="27.5"
              y2="87"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#90E0EF" />
              <stop offset="1" stopColor="#0085FF" />
            </linearGradient>
          </defs>
        </svg>

        <div className="BatterLevelBlockText">
          <div className="Num2 BatteryLevelBlockValue">{animatedValue} </div>
          <div className="BatteryLevelBlockUnit">%</div>
        </div>
      </div>
    </Block>
  )
}
