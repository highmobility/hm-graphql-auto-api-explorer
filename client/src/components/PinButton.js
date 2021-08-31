import React from 'react'
import '../styles/PinButton.scss'
import { ReactComponent as PinIcon } from '../images/pin.svg'
import { useMobx } from '../store/mobx'
import { observer } from 'mobx-react-lite'
import { updateProperty } from '../requests'

function PinButton({ propertyId }) {
  const { config } = useMobx()

  if (!propertyId) return null

  const active = config.isPropertyPinned(propertyId)

  const onClick = async () => {
    if (active) {
      config.unPinProperty(propertyId)
      await updateProperty({ id: propertyId, shown: true, pinned: false })
      return
    }

    config.pinProperty(propertyId)
    await updateProperty({ id: propertyId, shown: true, pinned: true })
  }

  return (
    <div className={`PinButton ${active ? 'active' : ''}`} onClick={onClick}>
      <PinIcon />
    </div>
  )
}

export default observer(PinButton)
