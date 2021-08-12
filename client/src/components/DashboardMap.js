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
  const lat = Number(coordinates?.data?.value.latitude)
  const lng = Number(coordinates?.data?.value.longitude)

  const marker = {
    id: 1,
    position: {
      lat,
      lng,
    },
  }

  const headingInDegrees = valueWithBaseUnit(
    heading?.data?.value,
    heading?.data?.unit,
    heading?.config
  )

  console.log({ lat, lng, headingInDegrees })

  return (
    <Fragment>
      {transitions(({ opacity }) => (
        <animated.div
          className="DashboardMap"
          style={{
            opacity,
          }}
        >
          <GoogleMap markers={[marker]} center={{ lat, lng }} />
        </animated.div>
      ))}
    </Fragment>
  )
}
