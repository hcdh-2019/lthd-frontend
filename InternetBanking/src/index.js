import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'
// redux
import { Provider } from "react-redux";
import configureStore from './store/configureStore'
const store = configureStore()
import * as helper from './modules/Helper'
// Containers
import RouterPage from './routers'
import Authorization from './routers/rAuthorization'
import iRouter from './views/Pages'

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path={helper.getPathHost("SignIn","url")} name="Login Page" component={iRouter['SignIn']}/>
        <Authorization role='any' name='Home' url='/' component={RouterPage} redirect={helper.getPathHost("SignIn","url")} />
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'));
