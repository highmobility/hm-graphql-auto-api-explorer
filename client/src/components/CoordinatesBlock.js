import React from 'react'
import '../styles/CoordinatesBlock.scss'
import Block from './Block'
import GoogleMap from './GoogleMap'
import { ReactComponent as MapIcon } from '../images/map.svg'
import useAnimateNumber from '../hooks/useAnimateNumber'

export default function CoordinatesBlock({ property }) {
  const marker = {
    id: 1,
    position: {
      lat: Number(property.data.value.latitude),
      lng: Number(property.data.value.longitude),
    },
  }
  const animatedLatitude = useAnimateNumber(
    Number(property.data.value.latitude),
    500,
    (n) => n.toFixed(1)
  )
  const animatedLongitude = useAnimateNumber(
    Number(property.data.value.longitude),
    500,
    (n) => n.toFixed(1)
  )

  return (
    <Block className="CoordinatesBlock" property={property}>
      <div className="CoordinatesBlockTop">
        <div className="CoordinatesBlockTopItem">
          <div className="Num2">{animatedLatitude} </div>
          <div className="CoordinatesBlockLatLongText"> lat</div>
        </div>
        <div className="CoordinatesBlockTopItem">
          <div className="Num2">{animatedLongitude} </div>
          <div className="CoordinatesBlockLatLongText"> long</div>
        </div>
      </div>
      <div className="CoordinatesBlockMap">
        <GoogleMap
          center={{
            lat: Number(property.data.value.latitude),
            lng: Number(property.data.value.longitude),
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
