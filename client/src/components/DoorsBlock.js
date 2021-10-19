import React from 'react'
import Block from './Block'
import '../styles/DoorsBlock.scss'
import { ReactComponent as CarSvg } from '../images/car.svg'

export default function DoorsBlock({ property }) {
  const frontLeftData = property?.data?.find(
    (locationData) => locationData.data.location === 'frontLeft'
  )?.data
  const frontLeft = frontLeftData?.position || frontLeftData?.lockState
  const frontLeftActive = frontLeft === 'open' || frontLeft === 'unlocked'

  const rearLeftData = property?.data?.find(
    (locationData) => locationData.data.location === 'rearLeft'
  )?.data
  const rearLeft = rearLeftData?.position || rearLeftData?.lockState
  const rearLeftActive = rearLeft === 'open' || rearLeft === 'unlocked'

  const frontRightData = property?.data?.find(
    (locationData) => locationData.data.location === 'frontRight'
  )?.data
  const frontRight = frontRightData?.position || frontRightData?.lockState
  const frontRightActive = frontRight === 'open' || frontRight === 'unlocked'

  const rearRightData = property?.data?.find(
    (locationData) => locationData.data.location === 'rearRight'
  )?.data
  const rearRight = rearRightData?.position || rearRightData?.lockState
  const rearRightActive = rearRight === 'open' || rearRight === 'unlocked'

  return (
    <Block className="DoorsBlock" property={property}>
      <div className="DoorsBlockContent">
        <div className="DoorsBlockCar">
          <CarSvg className="DoorsBlockCarImage" />
          <div
            className={`DoorsBlockLabel DoorsBlockLabelFrontLeft ${
              frontLeftActive ? 'DoorsBlockLabelActive' : ''
            }`}
          >
            {frontLeft}
          </div>
          <div
            className={`DoorsBlockLabel DoorsBlockLabelRearLeft ${
              rearLeftActive ? 'DoorsBlockLabelActive' : ''
            }`}
          >
            {rearLeft}
          </div>
          <div
            className={`DoorsBlockLabel DoorsBlockLabelFrontRight ${
              frontRightActive ? 'DoorsBlockLabelActive' : ''
            }`}
          >
            {frontRight}
          </div>
          <div
            className={`DoorsBlockLabel DoorsBlockLabelRearRight ${
              rearRightActive ? 'DoorsBlockLabelActive' : ''
            }`}
          >
            {rearRight}
          </div>
        </div>
      </div>
    </Block>
  )
}
