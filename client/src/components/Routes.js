import React from 'react'
import '../styles/App.scss'
import { Switch, Route, useLocation } from 'react-router-dom'
import routes from '../routes'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export default function Routes() {
  const location = useLocation()

  return (
    <TransitionGroup>
      <CSSTransition timeout={800} classNames="fade" key={location.key}>
        <Switch>
          {routes.map((route) => (
            <Route exact path={route.path} key={route.name}>
              <route.component />
            </Route>
          ))}
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  )
}
