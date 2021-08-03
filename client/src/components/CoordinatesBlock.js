import React from 'react'
import '../styles/CoordinatesBlock.scss'
import Block from './Block'
import AnimatedNumber from 'animated-number-react'
import GoogleMap from './GoogleMap'
import { ReactComponent as MapIcon } from '../images/map.svg'

export default function CoordinatesBlock({ property }) {
  const marker = {
    id: 1,
    position: {
      lat: Number(property.value.latitude),
      lng: Number(property.value.longitude),
    },
  }

  return (
    <Block className="CoordinatesBlock" property={property}>
      <div className="CoordinatesBlockTop">
        <div className="CoordinatesBlockTopItem">
          <div className="Num2">
            <AnimatedNumber
              value={property.value.latitude}
              formatValue={(value) => value.toFixed(1)}
            />
          </div>
          <div className="CoordinatesBlockLatLongText"> lat</div>
        </div>
        <div className="CoordinatesBlockTopItem">
          <div className="Num2">
            <AnimatedNumber
              value={property.value.longitude}
              formatValue={(value) => value.toFixed(1)}
            />
          </div>
          <div className="CoordinatesBlockLatLongText"> long</div>
        </div>
      </div>
      <div className="CoordinatesBlockMap">
        <GoogleMap
          center={{
            lat: Number(property.value.latitude),
            lng: Number(property.value.longitude),
          }}
          markers={[marker]}
          zoom={15}
        />
        <div className="CoordinatesBlockMapButton">
          <MapIcon />
          <span>View map</span>
        </div>
      </div>
    </Block>
  )
}
