import { useSpring, animated } from '@react-spring/web'
import React, { useState } from 'react'
import '../styles/Dropdown.scss'
import { ReactComponent as ChevronIcon } from '../images/chevron.svg'

export default function Dropdown({ label, items = [] }) {
  const [open, setOpen] = useState(false)
  const animationStyles = useSpring({
    to: { opacity: open ? 0 : 1 },
    from: { opacity: open ? 1 : 0 },
  })

  return (
    <div className="Dropdown">
      <div
        className="DropdownButton"
        onClick={() => {
          console.log('toggling', open)
          setOpen(!open)
        }}
      >
        <span>{label}</span>
        <ChevronIcon />
      </div>
      <animated.div style={animationStyles}>
        <div className={`DropdownContent`}>
          {items.map((item, key) => (
            <div
              className="DropdownItem"
              key={key}
              onClick={() => item.onClick()}
            >
              {item.label}
            </div>
          ))}
        </div>
      </animated.div>
    </div>
  )
}
