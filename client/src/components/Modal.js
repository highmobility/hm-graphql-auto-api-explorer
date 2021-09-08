import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { useIsomorphicLayoutEffect } from 'react-use'
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock'
import '../styles/Modal.scss'

const SCROLL_LOCK_OPTIONS = {
  reserveScrollBarGap: true,
  allowTouchMove: (el) => {
    while (el && el !== document.body) {
      if (el.getAttribute('body-scroll-lock-ignore') !== null) return true
      el = el.parentElement
    }
    return false
  },
}

export default function Modal({
  children,
  className,
  animation,
  show = false,
  close = () => null,
  backdropCloseEnabled = true,
}) {
  const [canRender, setCanRender] = useState(false)
  const ref = useRef()
  useIsomorphicLayoutEffect(() => setCanRender(true), [])
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => () => clearAllBodyScrollLocks(), [])

  React.useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Escape') {
        close()
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [close])

  return (
    canRender &&
    ReactDOM.createPortal(
      <CSSTransition
        in={show}
        unmountOnExit
        timeout={400}
        onEntering={() =>
          ref.current && disableBodyScroll(ref.current, SCROLL_LOCK_OPTIONS)
        }
        onExiting={() => ref.current && enableBodyScroll(ref.current)}
        onExit={() => setScrollTop(ref.current.scrollTop)}
        onEnter={() => (ref.current.scrollTop = scrollTop || 0)}
      >
        <div className={`Modal ${className} ${animation || 'FadeAnimation'}`}>
          <div
            className={`ModalBackdrop`}
            onClick={() => (backdropCloseEnabled ? close() : void 0)}
          />
          <div className={`ModalContent`} ref={ref}>
            {children}
          </div>
        </div>
      </CSSTransition>,
      document.body
    )
  )
}
