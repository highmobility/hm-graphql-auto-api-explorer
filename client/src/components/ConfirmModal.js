import Modal from './Modal'
import '../styles/ConfirmModal.scss'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import { ReactComponent as CrossSvg } from '../images/cross.svg'

export default function ConfirmModal({
  onConfirm,
  close,
  headerText,
  descriptionText,
  confirmText,
  cancelText,
  ...props
}) {
  return (
    <Modal {...props} close={close} className="ConfirmModal">
      <h4 className="ConfirmModalHeader">{headerText}</h4>
      <p className="ConfirmModalText">{descriptionText}</p>
      <div className="ConfirmModalButtons">
        <SecondaryButton onClick={() => close()}>{cancelText}</SecondaryButton>
        <PrimaryButton onClick={() => onConfirm()}>{confirmText}</PrimaryButton>
      </div>
      <CrossSvg className="ConfirmModalClose" onClick={() => close()} />
    </Modal>
  )
}
