import { animated, useTransition } from '@react-spring/web'
import { Fragment } from 'react'
import GoogleMap from './GoogleMap'
import '../styles/DashboardMap.scss'

export default function DashboardMap({ open }) {
  const transitions = useTransition(open ? [open] : [], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

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
            markers={[]}
            center={{
              lat: Number(59.40325),
              lng: Number(24.72989),
            }}
          />
        </animated.div>
      ))}
    </Fragment>
  )
}
