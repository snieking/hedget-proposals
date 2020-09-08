import React from 'react';
import { Switch, Route } from 'react-router';
import { makeStyles } from '@material-ui/core';
import AppProposals from './pages/proposals/overview/AppProposals';
import FullProposal from './pages/proposals/FullProposal';

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
        <Route exact path="/" component={AppProposals} />
        <Route path="/proposal/:id" component={FullProposal} />
      </Switch>
    </div>
  );
};

export default Content;
