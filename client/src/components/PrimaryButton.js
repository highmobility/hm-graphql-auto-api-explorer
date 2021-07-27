import '../styles/PrimaryButton.scss'

export default function PrimaryButton({ children, onClick = () => {} }) {
  return (
    <button className="PrimaryButton" onClick={onClick}>
      {children}
    </button>
  )
}
