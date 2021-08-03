import React, { useEffect, useState } from 'react'
import Block from './Block'
import '../styles/DoorsBlock.scss'
import { ReactComponent as CarSvg } from '../images/car.svg'

export default function DoorsBlock({ property }) {
  const frontLeft = property.positions.find(
    (p) => p.location === 'front_left'
  )?.value
  const rearLeft = property.positions.find(
    (p) => p.location === 'rear_left'
  )?.value
  const frontRight = property.positions.find(
    (p) => p.location === 'front_right'
  )?.value
  const rearRight = property.positions.find(
    (p) => p.location === 'rear_right'
  )?.value

  return (
    <Block className="DoorsBlock" property={property}>
      <div className="DoorsBlockContent">
        <div className="DoorsBlockCar">
          <CarSvg className="DoorsBlockCarImage" />
          <div
            className={`DoorsBlockLabel DoorsBlockLabelFrontLeft ${
              frontLeft === 'open' ? 'DoorsBlockLabelOpen' : ''
            }`}
          >
            {frontLeft}
          </div>
          <div
            className={`DoorsBlockLabel DoorsBlockLabelRearLeft ${
              rearLeft === 'open' ? 'DoorsBlockLabelOpen' : ''
            }`}
          >
            {rearLeft}
          </div>
          <div
            className={`DoorsBlockLabel DoorsBlockLabelFrontRight ${
              frontRight === 'open' ? 'DoorsBlockLabelOpen' : ''
            }`}
          >
            {frontRight}
          </div>
          <div
            className={`DoorsBlockLabel DoorsBlockLabelRearRight ${
              rearRight === 'open' ? 'DoorsBlockLabelOpen' : ''
            }`}
          >
            {rearRight}
          </div>
        </div>
      </div>
    </Block>
  )
}
