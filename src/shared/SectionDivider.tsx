import React from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  divider: {
    marginTop: '20px',
    marginBottom: '20px',
    opacity: 0.2,
  },
});

const SectionDivider: React.FunctionComponent = () => {
  const classes = useStyles();
  return <Divider className={classes.divider} />;
};

export default SectionDivider;
