import '../styles/ErrorMessage.scss'

export default function ErrorMessage({ children, show, className }) {
  return (
    <div className={`ErrorMessage ${show ? '' : 'Hidden'} ${className}`}>
      {children}
    </div>
  )
}
