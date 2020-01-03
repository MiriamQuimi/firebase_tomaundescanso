import React from "react";
import ReactDOM, { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./index.css";

import Nav from "./components/Nav";
import Login from "./pages/login";
import Recompensas from "./pages/recompensas";
import Iniciar from "./pages/iniciar";
import Stats from "./pages/stats";

const App = () => (
  <div>
    <Nav />
    <div className="container">
      <Route exact={true} path="/login" component={Login} />
      <Route exact={true} path="/recompensas" component={Recompensas} />
      <Route exact path="/stats" component={Stats} />
      <Route exact={true} path="/iniciar" component={Iniciar} />
    </div>
  </div>
);

render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
