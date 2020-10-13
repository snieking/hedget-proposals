import React, { useEffect } from 'react';
import './App.css';
import { connect, Provider } from 'react-redux';
import { CssBaseline, makeStyles } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { Store } from 'redux';
// import ReactPiwik from 'react-piwik';
import DynamicTheme from './core/dynamic-theme/DynamicTheme';
import Header from './core/header/Header';
import Spinners from './core/spinners/Spinners';
import config from './config';
// import history from './history';
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
  },
});

// const piwik = config.matomo.enabled
//   ? new ReactPiwik({
//       url: config.matomo.url,
//       siteId: config.matomo.siteId,
//       trackErrors: config.matomo.trackErrors,
//       jsFilename: config.matomo.jsFileName,
//       phpFilename: config.matomo.phpFilename,
//     })
//   : null;

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
    <Provider store={props.store}>
      <DynamicTheme>
        <CssBaseline />
        <Router basename={config.basePath}>
          <div className={classes.wrapper}>
            <Header />
            <Spinners />
            <Content />
            <SnackbarHolder />
          </div>
        </Router>
      </DynamicTheme>
    </Provider>
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
