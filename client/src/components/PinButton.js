import React from 'react'
import '../styles/PinButton.scss'
import { ReactComponent as PinIcon } from '../images/pin.svg'
import { useMobx } from '../store/mobx'
import { observer } from 'mobx-react-lite'

function PinButton({ propertyId }) {
  const { config } = useMobx()

  if (!propertyId) return null

  const active = config.isPropertyPinned(propertyId)

  const onClick = () => {
    if (active) {
      return config.unPinProperty(propertyId)
    }

    return config.pinProperty(propertyId)
  }

  return (
    <div className={`PinButton ${active ? 'active' : ''}`} onClick={onClick}>
      <PinIcon />
    </div>
  )
}

export default observer(PinButton)
