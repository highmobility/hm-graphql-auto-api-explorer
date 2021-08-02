import React, { useEffect, useState } from 'react'
import '../styles/CoordinatesBlock.scss'
import Block from './Block'
import AnimatedNumber from 'animated-number-react'
import GoogleMap from './GoogleMap'
import { ReactComponent as MapIcon } from '../images/map.svg'

export default function CoordinatesBlock({ property }) {
  const [headingInDegrees, setHeadingInDegrees] = useState(0)
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  })

  useEffect(() => {
    const propertyUnitType = property.config.unit.unit_types.find(
      (unitType) => unitType.name === property.unit
    )

    setHeadingInDegrees(
      property.heading.value * (propertyUnitType?.conversion_linear || 1)
    )

    setCoordinates(property.coordinates)
  }, [property])

  const marker = {
    id: 1,
    position: {
      lat: Number(coordinates.latitude),
      lng: Number(coordinates.longitude),
    },
  }

  return (
    <Block className="CoordinatesBlock" property={property}>
      <div className="CoordinatesBlockTop">
        <div className="CoordinatesBlockTopItem">
          <div className="Num2">
            <AnimatedNumber
              value={coordinates.latitude}
              formatValue={(value) => value.toFixed(1)}
            />
          </div>
          <div className="CoordinatesBlockLatLongText"> lat</div>
        </div>
        <div className="CoordinatesBlockTopItem">
          <div className="Num2">
            <AnimatedNumber
              value={coordinates.longitude}
              formatValue={(value) => value.toFixed(1)}
            />
          </div>
          <div className="CoordinatesBlockLatLongText"> long</div>
        </div>
      </div>
      <div className="CoordinatesBlockMap">
        <GoogleMap
          center={{
            lat: Number(coordinates.latitude),
            lng: Number(coordinates.longitude),
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
