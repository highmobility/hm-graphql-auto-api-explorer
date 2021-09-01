import React from 'react'
import '../styles/PinButton.scss'
import { ReactComponent as PinIcon } from '../images/pin.svg'
import { useMobx } from '../store/mobx'
import { observer } from 'mobx-react-lite'
import { updateProperties } from '../requests'

function PinButton({ propertyId }) {
  const { config } = useMobx()

  if (!propertyId) return null

  const active = config.isPropertyPinned(propertyId)

  const onClick = async () => {
    if (active) {
      config.unPinProperty(propertyId)
    } else {
      config.pinProperty(propertyId)
    }

    await updateProperties(
      config.shownProperties.map((id) => ({
        id,
        pinned: config.pinnedProperties.includes(id),
      }))
    )
  }

  return (
    <div className={`PinButton ${active ? 'active' : ''}`} onClick={onClick}>
      <PinIcon />
    </div>
  )
}

export default observer(PinButton)
