import React, { useState } from 'react'
import '../styles/TemperaturePropertyBlock.scss'
import UNITS from '../utils/units'
import PropertyBlock from './PropertyBlock'
import { ReactComponent as CircleSvg } from '../images/circle.svg'

export default function TemperaturePropertyBlock({ property }) {
  const unitSymbol = UNITS[property.unit] || property.unit
  const percentValue = Math.min(Math.abs(property.value || 0), 100)
  const dashArraySize = 530

  return (
    <PropertyBlock className="TemperaturePropertyBlock" property={property}>
      <div className="TemperaturePropertyBlockContent">
        <svg
          width="198"
          height="192"
          viewBox="0 0 198 192"
          className="TemperaturePropertyBlockOuterCircle"
          fill="none"
        >
          <defs>
            <linearGradient id="Gradient1" gradientTransform="rotate(90)">
              <stop offset="0%" stop-color="#47b2f7" />
              <stop offset="100%" stop-color="#0085FF" />
            </linearGradient>
            <linearGradient id="Gradient2" gradientTransform="rotate(90)">
              <stop offset="0%" stop-color="#47b2f7" />
              <stop offset="100%" stop-color="#90E0EF" />
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
                  shape-rendering="crispEdges"
                  x="0"
                  y="0"
                  width="198"
                  height="192"
                  fill="url(#Gradient1)"
                />
                <rect
                  shape-rendering="crispEdges"
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
            style={{
              'stroke-dasharray': dashArraySize,
              'stroke-dashoffset': `${
                -dashArraySize + (dashArraySize / 100) * percentValue
              }`,
            }}
            d="M133.5 187.542C168.91 173.734 194 139.297 194 99C194 46.5329 151.467 4 99 4C46.5329 4 4 46.5329 4 99C4 139.297 29.0898 173.734 64.5 187.542"
            stroke="url(#Pattern)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="bevel"
          />
        </svg>
        <div className="TemperaturePropertyBlockInnerCircle">
          <div className="Num2">{property.value}</div>
          <div className="Num4">{unitSymbol}</div>
        </div>
      </div>
    </PropertyBlock>
  )
}
