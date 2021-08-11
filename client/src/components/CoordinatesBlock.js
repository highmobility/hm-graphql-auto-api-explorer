import React, { useEffect, useState } from 'react'
import '../styles/CoordinatesBlock.scss'
import Block from './Block'
import GoogleMap from './GoogleMap'
import { ReactComponent as MapIcon } from '../images/map.svg'
import useAnimateNumber from '../hooks/useAnimateNumber'

export default function CoordinatesBlock({ property }) {
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)

  useEffect(() => {
    setLat(Number(property?.data?.value.latitude))
    setLng(Number(property?.data?.value.longitude))
  }, [property])

  const marker = {
    id: 1,
    position: {
      lat,
      lng,
    },
  }
  const animatedLatitude = useAnimateNumber(lat, 500, (n) => n.toFixed(1))
  const animatedLongitude = useAnimateNumber(lng, 500, (n) => n.toFixed(1))

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
            lat,
            lng,
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
