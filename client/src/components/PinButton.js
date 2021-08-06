import React from 'react'
import '../styles/PinButton.scss'
import { ReactComponent as PinIcon } from '../images/pin.svg'
import { useMobx } from '../store/mobx'
import { observer } from 'mobx-react-lite'

function PinButton({ property }) {
  const { config } = useMobx()

  if (!property) return null

  const active = config.isPropertyPinned(property)

  const onClick = () => {
    if (active) {
      return config.unPinProperty(property)
    }

    return config.pinProperty(property)
  }

  return (
    <div className={`PinButton ${active ? 'active' : ''}`} onClick={onClick}>
      <PinIcon />
    </div>
  )
}

export default observer(PinButton)
