import '../styles/PrimaryButton.scss'

export default function PrimaryButton({ children, className, ...props }) {
  return (
    <button className={`PrimaryButton ${className}`} {...props}>
      {children}
    </button>
  )
}
