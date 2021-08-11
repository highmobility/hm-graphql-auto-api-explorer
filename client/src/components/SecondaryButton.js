import '../styles/SecondaryButton.scss'

export default function SecondaryButton({ children, className, ...props }) {
  return (
    <button className={`SecondaryButton ${className}`} {...props}>
      {children}
    </button>
  )
}
