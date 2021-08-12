import React, { useEffect, useState } from 'react'
import '../styles/CoordinatesBlock.scss'
import Block from './Block'
import GoogleMap from './GoogleMap'
import { ReactComponent as MapIcon } from '../images/map.svg'
import useAnimateNumber from '../hooks/useAnimateNumber'
import { VIEWS } from '../store/Config'
import { useMobx } from '../store/mobx'

export default function CoordinatesBlock({ property }) {
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const { config } = useMobx()

  useEffect(() => {
    setLat(
      Number.isNaN(Number(property?.data?.value.latitude))
        ? 0
        : Number(property?.data?.value.latitude)
    )
    setLng(
      Number.isNaN(Number(property?.data?.value.longitude))
        ? 0
        : Number(property?.data?.value.longitude)
    )
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
          <div className="Num2">{animatedLatitude}</div>
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
          marker={marker}
          zoom={15}
        />
        <div
          className="CoordinatesBlockMapButton"
          onClick={() => config.setView(VIEWS.MAP)}
        >
          <MapIcon />
          <span>View map</span>
        </div>
      </div>
    </Block>
  )
}
