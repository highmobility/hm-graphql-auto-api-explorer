import '../styles/PrimaryButton.scss'

export default function PrimaryButton({ children, ...props }) {
  return (
    <button className="PrimaryButton" {...props}>
      {children}
    </button>
  )
}
