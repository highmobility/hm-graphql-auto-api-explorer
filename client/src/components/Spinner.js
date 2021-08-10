import '../styles/Spinner.scss'

export default function Spinner() {
  return (
    <div className="SpinnerContainer SpinnerOverlay">
      <div className="Spinner">
        <div className="SpinnerBounceA" />
        <div className="SpinnerBounceB" />
      </div>
    </div>
  )
}
