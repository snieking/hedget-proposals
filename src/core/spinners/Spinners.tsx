import React from 'react';
import { connect } from 'react-redux';
import { LinearProgress, makeStyles } from '@material-ui/core';
import ApplicationState from '../redux/application-state';

interface Props {
  loading: boolean;
  operationPending: boolean;
}

const useStyles = makeStyles({
  wrapper: {

  },
});

const Spinners: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {props.loading && <LinearProgress variant="query" />}
      {props.operationPending && <LinearProgress color="secondary" />}
    </div>
  );
};

const mapStateToProps = (store: ApplicationState) => {
  return {
    loading: store.global.loading,
    operationPending: store.global.operationPending,
  };
};

export default connect(mapStateToProps)(Spinners);
