import React, { useEffect } from 'react';
import './App.css';
import { connect, Provider } from 'react-redux';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { Store } from 'redux';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';
import DynamicTheme from './core/dynamic-theme/DynamicTheme';
import Header from './core/header/Header';
import Spinners from './core/spinners/Spinners';
import config from './config';
import Content from './Content';
import ApplicationState from './core/redux/application-state';
import { AccountDetail } from './core/redux/account/account.state';
import { checkAmountStaked, checkCoreAccount } from './core/redux/account/account.actions';
import { initLogger } from './util/log-util';
import SnackbarHolder from './core/snackbar/SnackbarHolder';

interface Props {
  store: Store<ApplicationState>;
  accountDetail: AccountDetail;
  checkCoreAccount: typeof checkCoreAccount;
  checkAmountStaked: typeof checkAmountStaked;
}

const useStyles = makeStyles({
  wrapper: {
    margin: '0 auto',
    marginLeft: '20px',
    marginRight: '20px',
  },
});

const instance = createInstance({
  disabled: config.matomo.enabled,
  urlBase: config.matomo.url,
  siteId: config.matomo.siteId,
  // trackerUrl: `${config.matomo.url}/${config.matomo.phpFilename}`,
  // srcUrl: `${config.matomo.url}/${config.matomo.jsFileName}`,
  heartBeat: {
    active: true,
    seconds: 10,
  },
  linkTracking: true,
  configurations: {
    disableCookies: false,
    setSecureCookie: false,
    setRequestMethod: 'POST',
  },
});

initLogger();

const App: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  useEffect(() => {
    if (props.accountDetail) {
      props.checkCoreAccount();
      props.checkAmountStaked();
    }
  }, [props]);

  return (
    <MatomoProvider value={instance}>
      <Provider store={props.store}>
        <DynamicTheme>
          <CssBaseline />
          <Router basename={config.baseUrl}>
            <div className={classes.wrapper}>
              <Header />
              <Spinners />
              <Content />
              <SnackbarHolder />
            </div>
          </Router>
        </DynamicTheme>
      </Provider>
    </MatomoProvider>
  );
};

const mapStateToProps = (store: ApplicationState) => {
  return {
    accountDetail: store.account.accountDetail,
  };
};

const mapDispatchToProps = {
  checkCoreAccount,
  checkAmountStaked,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
