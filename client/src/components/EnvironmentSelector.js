import '../styles/EnvironmentSelector.scss';
import RadioButton from './RadioButton';

export default function EnvironmentSelector({ title, subtitle, checked, onClick }) {
  return (
    <div className={`EnvironmentSelector ${checked ? 'active' : ''}`} onClick={onClick}>
      <div className="EnvironmentSelectorContent">
        <h5>{title}</h5>
        <p>{subtitle}</p>
      </div>
      <div className="EnvironmentSelectorRadio">
        <RadioButton checked={checked} />
      </div>
    </div>
  );
}
