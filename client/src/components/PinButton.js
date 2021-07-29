import React from 'react'
import '../styles/PinButton.scss'
import { ReactComponent as PinIcon } from '../images/pin.svg'
import { useMobx } from '../store/mobx'
import { observer } from 'mobx-react-lite'

function PinButton({ property }) {
  const { properties } = useMobx()

  if (!property) return null

  const active = properties.pinned.includes(property.id)

  const onClick = () => {
    if (active) {
      return properties.unPin(property.id)
    }

    return properties.pin(property.id)
  }

  return (
    <div className={`PinButton ${active ? 'active' : ''}`} onClick={onClick}>
      <PinIcon />
    </div>
  )
}

export default observer(PinButton)
