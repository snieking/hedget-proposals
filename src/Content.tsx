import React from 'react';
import { Switch, Route } from 'react-router';
import { makeStyles, Theme } from '@material-ui/core';
import AppProposals from './pages/proposals/overview/AppProposals';
import FullProposal from './pages/proposals/FullProposal';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    margin: '0 auto',
    marginTop: '50px',
    [theme.breakpoints.up('lg')]: {
      width: '80%',
    },
  },
}));

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
