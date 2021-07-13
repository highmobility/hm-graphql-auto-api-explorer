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
      <div className="App">
        <Switch>
          {routes.map(route => (
            <Route exact path={route.path} key={route.name}>
              <route.component />
            </Route>
          ))}
        </Switch>
      </div>
    </Router>
  );
}
