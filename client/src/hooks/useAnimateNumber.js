import { useState, useEffect } from 'react'

export default function useAnimateNumber(value) {
  const [animatedValue, setAnimatedValue] = useState(0)

  useEffect(() => {
    console.log('new interval')
    const interval = setInterval(() => {
      window.requestAnimationFrame(updateNumber)
    }, 10)

    const updateNumber = () => {
      const valueToAdd = Math.abs((animatedValue - value) / 100)
      if (animatedValue < value) {
        setAnimatedValue((prev) => {
          const previousValue = Number(prev)
          if (previousValue === value) {
            clearInterval(interval)
          }

          const newValue = previousValue + valueToAdd
          if (newValue >= value) {
            return value
          }

          return newValue
        })
      } else {
        setAnimatedValue((previousValue) => {
          if (previousValue === value) {
            clearInterval(interval)
          }

          const newValue = previousValue + valueToAdd
          if (newValue <= value) {
            return value
          }

          return newValue
        })
      }
    }

    return () => {
      clearInterval(interval)
    }
  }, [value]) // eslint-disable-line

  return animatedValue
}
