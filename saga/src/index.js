import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
// add IndexRoute above and the helpers below
import {
  checkIndexAuthorization,
  checkWidgetAuthorization,
} from './pages/Auth/lib/check-auth'

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store, {history} from './store';
import App from './pages/App';
import registerServiceWorker from './registerServiceWorker';

import AppFirst from './AppFirst'
import Login from './pages/Auth/login'
import Signup from './pages/Auth/signup'

ReactDOM.render(
  <Provider store={store}>

    <BrowserRouter history={history}>
      <div>
      <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/app" component={App}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={Signup}/>
      </Switch>
      </div>
    </BrowserRouter>
    </Provider>
    , 
    document.getElementById('root'));
registerServiceWorker();
