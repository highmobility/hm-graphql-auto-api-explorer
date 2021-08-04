import React from 'react'
import '../styles/Toggle.scss'

export default function Toggle({ value, onChange = () => {} }) {
  return (
    <input
      className="Toggle"
      type="checkbox"
      checked={value}
      onChange={onChange}
    />
  )
}
