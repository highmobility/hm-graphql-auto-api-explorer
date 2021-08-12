import React from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import googleMapsTheme from '../data/mapsTheme.json'
import '../styles/GoogleMap.scss'

const loader = new Loader({
  apiKey: 'AIzaSyDHGGCWUgVV7elhOTnJSawnzUu1nDu1fo0',
  version: 'weekly',
})

export default function GoogleMap({
  center,
  zoom = 6,
  className,
  markers = [],
  ...props
}) {
  const domRef = React.useRef()
  const [mapInstance, setMapInstance] = React.useState()
  const [activeMarkers, setActiveMarkers] = React.useState([])
  const [hasError, setHasError] = React.useState(false)

  React.useEffect(() => {
    loader.load().then(() => {
      if (!mapInstance) {
        setMapInstance(
          // eslint-disable-next-line
          new google.maps.Map(domRef.current, {
            center,
            zoom,
            disableDefaultUI: true,
            styles: googleMapsTheme,
          })
        )

        return
      }

      mapInstance.addListener('tilesloaded', () => {
        if (domRef.current.children.length > 1) {
          setHasError(true)
        }
      })

      const currentActiveMarkers = [...activeMarkers]

      if (markers.length === 0) {
        return
      }

      const newActiveMarkers = []
      markers.forEach((marker) => {
        const existingMarker = currentActiveMarkers.find((activeMarker) => {
          return activeMarker.id === marker.id
        })

        const markerLabel = marker.label
          ? {
              className: 'GoogleMapLabel',
              ...marker.label,
            }
          : null

        if (existingMarker) {
          if (markerLabel) {
            existingMarker.setLabel(markerLabel)
          } else {
            existingMarker.setLabel(null)
          }
        }

        const newMarker =
          existingMarker ||
          // eslint-disable-next-line
          new google.maps.Marker({
            ...marker,
            icon: new google.maps.MarkerImage( // eslint-disable-line
              require('../images/car.svg').default,
              null,
              null,
              null,
              new google.maps.Size(50, 50) // eslint-disable-line
            ),
            map: mapInstance,
            label: markerLabel,
          })

        newActiveMarkers.push(newMarker)
      })

      setActiveMarkers(newActiveMarkers)

      currentActiveMarkers.forEach((activeMarker) => {
        const includedInNew = newActiveMarkers.some((newActiveMarker) => {
          return activeMarker.id === newActiveMarker.id
        })

        if (!includedInNew) {
          activeMarker.setMap(null)
        }
      })
    })
  }, [center, zoom, markers, mapInstance]) // eslint-disable-line

  return (
    <div ref={domRef} className={`GoogleMap ${className || ''}`} {...props}>
      {hasError && (
        <div className="GoogleMapError">
          Failed to load Google map
          <br />
          Check your API key
        </div>
      )}
    </div>
  )
}
