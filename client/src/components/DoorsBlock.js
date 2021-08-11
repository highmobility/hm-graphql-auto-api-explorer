import React from 'react'
import Block from './Block'
import '../styles/DoorsBlock.scss'
import { ReactComponent as CarSvg } from '../images/car.svg'

export default function DoorsBlock({ property }) {
  const frontLeft = property?.data?.find(
    (locationData) => locationData.data.location === 'frontLeft'
  )?.data?.position
  const rearLeft = property?.data?.find(
    (locationData) => locationData.data.location === 'rearLeft'
  )?.data?.position
  const frontRight = property?.data?.find(
    (locationData) => locationData.data.location === 'frontRight'
  )?.data?.position
  const rearRight = property?.data?.find(
    (locationData) => locationData.data.location === 'rearRight'
  )?.data?.position

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
