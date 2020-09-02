import React from 'react';
import { Switch, Route } from 'react-router';
import { makeStyles } from '@material-ui/core';
import AppSelector from './pages/app-selector/AppSelector';
import AppProposals from './pages/apps/AppProposals';

const useStyles = makeStyles({
  wrapper: {
    margin: '0 auto',
    marginTop: '30px',
    width: '80%',
  },
});

const Content: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Switch>
        <Route exact path="/" component={AppSelector} />
        <Route path="/:appName" component={AppProposals} />
      </Switch>
    </div>
  );
};

export default Content;
