import '../styles/ErrorMessage.scss'

export default function ErrorMessage({ children, show }) {
  return (
    <div className={`ErrorMessage ${show ? '' : 'Hidden'}`}>{children}</div>
  )
}
