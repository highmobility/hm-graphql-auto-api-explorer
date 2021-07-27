import { observer } from 'mobx-react'
import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/ConnectVehiclePage.scss'
import GrayCircles from './GrayCircles'
import PrimaryButton from './PrimaryButton'

function ConnectVehiclePage() {
  return (
    <div className="ConnectVehiclePage">
      <div className="ConnectVehiclePageContent">
        <h2 className="Header">Connect your vehicle</h2>
        <GrayCircles />
        <Link to="">
          <PrimaryButton>Add my first vehicle</PrimaryButton>
        </Link>
      </div>
    </div>
  )
}

export default observer(ConnectVehiclePage)
