import '../styles/RadioButton.scss'
import { ReactComponent as Check } from '../images/check.svg'

export default function RadioButton({ checked, onClick = () => {} }) {
  return (
    <div
      className={`RadioButton ${checked ? 'checked' : ''}`}
      onClick={onClick}
    >
      <input
        type="radio"
        className="RadioButtonInput"
        checked={checked}
        readOnly
      />
      <Check className="RadioButtonCheck" />
    </div>
  )
}
