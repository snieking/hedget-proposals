import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { Router } from 'react-router-dom';
import { Store } from 'redux';
import ReactPiwik from 'react-piwik';
import DynamicTheme from './core/dynamic-theme/DynamicTheme';
import Header from './core/header/Header';
import Spinners from './core/spinners/Spinners';
import config from './config';
import history from './history';
import Content from './Content';
import ApplicationState from './core/redux/application-state';

interface Props {
  store: Store<ApplicationState>;
}

const piwik = config.matomo.enabled
  ? new ReactPiwik({
      url: config.matomo.url,
      siteId: config.matomo.siteId,
      trackErrors: config.matomo.trackErrors,
      jsFilename: config.matomo.jsFileName,
      phpFilename: config.matomo.phpFilename,
    })
  : null;

const App: React.FunctionComponent<Props> = (props) => {
  return (
    <Provider store={props.store}>
      <DynamicTheme>
        <CssBaseline />
        <Router history={piwik != null ? piwik.connectToHistory(history) : history}>
          <Header />
          <Spinners />
          <Content />
        </Router>
      </DynamicTheme>
    </Provider>
  );
};

export default App;
