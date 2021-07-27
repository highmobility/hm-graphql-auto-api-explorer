import '../styles/ConfigGroupTip.scss'

export default function ConfigGroupTip({ title, children }) {
  return (
    <div className="ConfigGroupTip">
      <h6 className="ConfigGroupTipTitle">{title}</h6>
      <p className="ConfigGroupTipText">{children}</p>
    </div>
  )
}
