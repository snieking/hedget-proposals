import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { makeStyles, Typography } from '@material-ui/core';
import { COLOR_DARKER_GREEN } from '../core/dynamic-theme/DefaultTheme';

const useStyles = makeStyles({
  returnWrapper: {
    position: 'relative',
    top: -10,
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
  },
  returnText: {
    color: COLOR_DARKER_GREEN,
    fontWeight: 'bold',
    position: 'relative',
    top: -5,
    textDecoration: 'none',
    marginLeft: '5px',
  },
  returnIcon: {
    color: COLOR_DARKER_GREEN,
  },
});

const BackToProposals: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.returnWrapper}>
      <RouterLink to="/" className={classes.link}>
        <BackspaceIcon fontSize="small" className={classes.returnIcon} />
        <Typography variant="body2" component="span" className={classes.returnText}>
          Back to proposals
        </Typography>
      </RouterLink>
    </div>
  );
};

export default BackToProposals;
