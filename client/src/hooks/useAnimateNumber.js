import { useState, useEffect } from 'react'
import { useInterval } from 'react-use'

export default function useAnimateNumber(
  value = 0,
  ms = 1000,
  formatValue = (value) => value.toFixed(0)
) {
  const NUMBER_OF_CHANGES = 50
  const [animatedValue, setAnimatedValue] = useState(0)
  const [startValue, setStartValue] = useState(value)
  const [finalValue, setFinalValue] = useState(value)
  const [isAnimating, setIsAnimating] = useState(false)
  const [valueToAdd, setValueToAdd] = useState(
    (value - animatedValue) / (ms / NUMBER_OF_CHANGES)
  )

  useEffect(() => {
    const numberValue = isNaN(value) ? 0 : Number(value)
    setStartValue(animatedValue)
    setFinalValue(numberValue)
    setValueToAdd((numberValue - animatedValue) / (ms / 10))
  }, [value, ms]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (
      (finalValue >= startValue && animatedValue >= finalValue) ||
      (finalValue <= startValue && animatedValue <= finalValue)
    ) {
      setIsAnimating(false)
    }
  }, [finalValue, isAnimating, animatedValue, startValue])

  const updateAnimatedValue = () => {
    setAnimatedValue((previousValue) => {
      const newValue = previousValue + valueToAdd
      if (
        (finalValue >= startValue && animatedValue >= finalValue) ||
        (finalValue <= startValue && animatedValue <= finalValue)
      ) {
        return finalValue
      }

      return newValue
    })
  }

  useInterval(
    () => window.requestAnimationFrame(updateAnimatedValue),
    animatedValue !== finalValue ? ms / NUMBER_OF_CHANGES : null
  )

  return formatValue(animatedValue)
}
