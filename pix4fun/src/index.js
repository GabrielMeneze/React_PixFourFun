import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import LoginCadastro from './pages/LoginCadastro';
import UploadImagem from './pages/UploadImagem';
import Carrinho from './pages/Carrinho';
import Pagamento from './pages/Pagamento';

const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/LoginCadastro" component={LoginCadastro} />
      <Route path="/UploadImagem" component={UploadImagem} />
      <Route path="/Carrinho" component={Carrinho} />
      <Route path="/Pagamento" component={Pagamento} />
    </Switch>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

reportWebVitals();
