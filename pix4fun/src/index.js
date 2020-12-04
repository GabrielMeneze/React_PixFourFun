import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import LoginCadastro from './pages/LoginCadastro';
import 'bootstrap/dist/css/bootstrap.min.css';



const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/LoginCadastro" component={LoginCadastro} />
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

reportWebVitals();
