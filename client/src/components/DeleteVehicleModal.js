import Modal from './Modal'
import '../styles/DeleteVehicleModal.scss'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import { ReactComponent as CrossSvg } from '../images/cross.svg'

export default function DeleteVehicleModal({ onConfirm, close, ...props }) {
  return (
    <Modal {...props} close={close} className="DeleteVehicleModal">
      <h4 className="DeleteVehicleModalHeader">
        Do you want to revoke the connection with this car?
      </h4>
      <p className="DeleteVehicleModalText">
        Once you confirm, you will not able to access its data again.
      </p>
      <div className="DeleteVehicleModalButtons">
        <SecondaryButton onClick={() => close()}>
          No, don't revoke
        </SecondaryButton>
        <PrimaryButton onClick={() => onConfirm()}>Yes, revoke</PrimaryButton>
      </div>
      <CrossSvg className="DeleteVehicleModalClose" onClick={() => close()} />
    </Modal>
  )
}
