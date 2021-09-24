import { useCallback, useMemo, useRef, useState } from 'react'
import '../styles/TextInput.scss'
import { ReactComponent as Check } from '../images/check.svg'

export default function TextInput({
  className,
  onBlur,
  onFocus,
  onChange,
  value,
  required,
  disabled,
  name,
  type = 'text',
  placeholder,
  error,
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [isTouched, setIsTouched] = useState(false)
  const inputRef = useRef()
  const showError = !isFocused && error

  const _onBlur = useCallback(
    (e) => {
      setIsFocused(false)
      setIsTouched(true)
      if (onBlur) onBlur(e)
    },
    [onBlur]
  )

  const _onFocus = useCallback(
    (e) => {
      setIsFocused(true)
      setIsTouched(false)
      if (onFocus) onFocus(e)
    },
    [onFocus]
  )

  const stateClasses = useMemo(() => {
    const classNames = [className]
    classNames.push(isFocused ? 'Focus' : 'Blur')
    classNames.push(!value ? 'Empty' : 'NotEmpty')
    classNames.push(showError ? 'Error' : 'NotError')
    if (required) classNames.push('Required')
    if (disabled) classNames.push('Disabled')
    if (isTouched) classNames.push('Touched')
    return classNames.join(' ')
  }, [isFocused, value, required, disabled, isTouched, className, showError])

  return (
    <div className={`TextInput ${stateClasses}`}>
      <input
        type={type}
        name={name}
        value={value || ''}
        onBlur={_onBlur}
        onFocus={_onFocus}
        ref={inputRef}
        required={required}
        disabled={disabled}
        onChange={onChange}
        className="TextInputInput"
        placeholder={placeholder}
      />
      <div className="TextInputIcon">
        <Check />
      </div>
      {showError && <div className="TextInputError">{error}</div>}
    </div>
  )
}
