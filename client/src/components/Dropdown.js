import React, { useState } from 'react'
import '../styles/Dropdown.scss'
import { ReactComponent as ChevronIcon } from '../images/chevron.svg'

export default function Dropdown({ label, value, items = [] }) {
  const [open, setOpen] = useState(false)

  const onClickItem = (item) => {
    item.onClick()
    setOpen(false)
  }

  return (
    <div className={`Dropdown ${open ? 'Open' : ''}`}>
      <div className="DropdownButton" onClick={() => setOpen(!open)}>
        <span>{label}</span>
        <ChevronIcon />
      </div>
      <div className={`DropdownContent`}>
        {items.map((item, key) => (
          <div
            className={`DropdownItem ${value === item.value ? 'Selected' : ''}`}
            key={key}
            onClick={() => onClickItem(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
