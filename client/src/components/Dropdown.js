import React, { useRef, useState } from 'react'
import '../styles/Dropdown.scss'
import { ReactComponent as ChevronIcon } from '../images/chevron.svg'
import { useClickAway } from 'react-use'
import { animated, useTransition } from '@react-spring/web'

export default function Dropdown({
  className,
  renderLabel = () => '',
  value,
  items = [],
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useClickAway(ref, () => {
    setOpen(false)
  })

  const onClickItem = (item) => {
    setOpen(false)
    item.onClick()
  }

  const transitions = useTransition(open ? [open] : [], {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  return (
    <div
      className={`Dropdown ${className || ''} ${open ? 'Open' : ''}`}
      ref={ref}
    >
      <div
        className="DropdownButton"
        onClick={() => {
          setOpen(!open)
        }}
      >
        <div className="DropdownButtonLabelWrapper">{renderLabel()}</div>
        <ChevronIcon className="DropdownChevron" />
      </div>
      {transitions(({ opacity }) => (
        <animated.div
          style={{
            opacity,
            pointerEvents: open ? 'auto' : 'none',
          }}
          className="DropdownValueTransitionWrapper"
        >
          <div className={`DropdownContent`}>
            {items.map((item, key) => (
              <div
                className={`DropdownItem ${
                  value === item.value ? 'Selected' : ''
                } ${item.disabled ? 'Disabled' : ''}`}
                key={key}
                onClick={() => {
                  if (!open) return
                  !item.disabled && onClickItem(item)
                }}
              >
                {item.renderLabel() || ''}
              </div>
            ))}
          </div>
        </animated.div>
      ))}
    </div>
  )
}
