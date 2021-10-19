import React, { useEffect, useState } from 'react'
import '../styles/SpeedBlock.scss'
import Block from './Block'
import useAnimateNumber from '../hooks/useAnimateNumber'
import { formatUnit, valueWithBaseUnit } from '../utils/properties'

export default function SpeedBlock({ property }) {
  const maxValue = 55
  const [valueInMetersPerSecond, setValueInMetersPerSecond] = useState(0)
  const percentValue = Math.min((valueInMetersPerSecond / maxValue) * 100, 100)
  const animatedValue = useAnimateNumber(
    Number(property?.data?.value) || 0,
    500
  )
  const dashArraySize = 530
  const dashOffset = dashArraySize + (dashArraySize / 100) * percentValue

  useEffect(() => {
    setValueInMetersPerSecond(
      valueWithBaseUnit(
        property?.data?.value,
        property?.data?.unit,
        property.config
      )
    )
  }, [property])

  return (
    <Block className="SpeedBlock" property={property}>
      <div className="SpeedBlockContent">
        <div className="Tacometer">
          <div className="TacometerLine">
            <div className="TacometerPin" />
          </div>
          <div className="TacometerLine">
            <div className="TacometerPin" />
          </div>
          <div className="TacometerLine">
            <div className="TacometerPin" />
          </div>
          <div className="TacometerLine">
            <div className="TacometerPin" />
          </div>
          <div className="TacometerLine">
            <div className="TacometerPin" />
          </div>
          <div className="TacometerLine">
            <div className="TacometerPin" />
          </div>
          <div className="TacometerLine">
            <div className="TacometerPin" />
          </div>
          <svg
            width="198"
            height="192"
            viewBox="0 0 198 192"
            className="TemperatureBlockOuterCircle"
            fill="none"
          >
            <defs>
              <linearGradient id="Gradient1" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="#47b2f7" />
                <stop offset="100%" stopColor="#0085FF" />
              </linearGradient>
              <linearGradient id="Gradient2" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="#47b2f7" />
                <stop offset="100%" stopColor="#90E0EF" />
              </linearGradient>
              <pattern
                id="Pattern"
                x="0"
                y="0"
                width="198"
                height="192"
                patternUnits="userSpaceOnUse"
              >
                <g transform="rotate(0, 300, 300)">
                  <rect
                    shapeRendering="crispEdges"
                    x="0"
                    y="0"
                    width="198"
                    height="192"
                    fill="url(#Gradient1)"
                  />
                  <rect
                    shapeRendering="crispEdges"
                    x="99"
                    y="0"
                    width="99"
                    height="192"
                    fill="url(#Gradient2)"
                  />
                </g>
              </pattern>
            </defs>
            <path
              d="M133.5 187.542C168.91 173.734 194 139.297 194 99C194 46.5329 151.467 4 99 4C46.5329 4 4 46.5329 4 99C4 139.297 29.0898 173.734 64.5 187.542"
              stroke="#E9ECEF"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="bevel"
            />
            <path
              id="SpeedPropertyValueCircle"
              style={{
                strokeDasharray: dashArraySize,
                strokeDashoffset: `${dashOffset}`,
              }}
              d="M133.5 187.542C168.91 173.734 194 139.297 194 99C194 46.5329 151.467 4 99 4C46.5329 4 4 46.5329 4 99C4 139.297 29.0898 173.734 64.5 187.542"
              stroke="url(#Pattern)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="bevel"
            />
          </svg>
        </div>
        <div className="SpeedBlockInnerContent">
          <div className="Num2">{animatedValue}</div>
          <div className="SpeedPropertyUnit">
            {formatUnit(property?.data?.unit)}
          </div>
        </div>
      </div>
    </Block>
  )
}
