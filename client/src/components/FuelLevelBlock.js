import React from 'react'
import Block from './Block'
import '../styles/FuelLevelBlock.scss'
import { ReactComponent as FuelLevelSvg } from '../images/fuelLevel.svg'

export default function FuelLevelBlock({ property }) {
  return (
    <Block className="FuelLevelBlock" property={property}>
      <div className="FuelLevelBlockContent">
        <FuelLevelSvg />
      </div>
    </Block>
  )
}
