import { animated, useTransition } from '@react-spring/web'
import { Fragment } from 'react'
import GoogleMap from './GoogleMap'
import '../styles/DashboardMap.scss'
import { valueWithBaseUnit } from '../utils/properties'

export default function DashboardMap({ open, coordinates, heading }) {
  const transitions = useTransition(open ? [open] : [], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  const lat = Number(coordinates?.data?.value?.latitude)
  const lng = Number(coordinates?.data?.value?.longitude)
  const headingInDegrees = valueWithBaseUnit(
    heading?.data?.value,
    heading?.data?.unit,
    heading?.config
  )

  if (!lat || !lng) {
    return null
  }

  const marker = {
    id: 1,
    position: {
      lat,
      lng,
    },
    icon: {
      rotation: headingInDegrees,
    },
  }

  return (
    <Fragment>
      {transitions(({ opacity }) => (
        <animated.div
          className="DashboardMap"
          style={{
            opacity,
          }}
        >
          <GoogleMap
            customIcon
            useArrowIcon={headingInDegrees !== undefined}
            marker={marker}
            center={{ lat, lng }}
            panLeft
            zoom={16}
          />
        </animated.div>
      ))}
    </Fragment>
  )
}
