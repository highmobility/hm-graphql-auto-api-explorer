import React from "react";
import '../styles/App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import routes from "../routes";

export default function App() {
  return (
    <Router>
      <div class="App">
        <Switch>
          {routes.map(route => (
            <Route exact path={route.path}>
              <route.component />
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
}
