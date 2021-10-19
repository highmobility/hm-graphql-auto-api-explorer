import '../styles/AppTypeSelector.scss'
import RadioButton from './RadioButton'

export default function AppTypeSelector({ title, subtitle, checked, onClick }) {
  return (
    <div
      className={`AppTypeSelector ${checked ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="AppTypeSelectorContent">
        <h5>{title}</h5>
        <p>{subtitle}</p>
      </div>
      <div className="AppTypeSelectorRadio">
        <RadioButton checked={checked} />
      </div>
    </div>
  )
}
