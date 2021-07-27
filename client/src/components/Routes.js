import React from 'react'
import '../styles/App.scss'
import { Switch, Route, useLocation } from 'react-router-dom'
import routes from '../routes'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

export default function Routes() {
  const location = useLocation()

  return (
    <TransitionGroup>
      <Switch>
        {routes.map((route) => (
          <Route exact path={route.path} key={route.name}>
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={300}
                classNames="page"
                key={location.key}
                unmountOnExit
              >
                <route.component />
              </CSSTransition>
            )}
          </Route>
        ))}
      </Switch>
    </TransitionGroup>
  )
}
