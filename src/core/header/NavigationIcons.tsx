import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles({
  wrapper: {
    marginTop: '10px',
  },
  icon: {
    fontSize: 32,
  },
});

const NavigationIcons: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <IconButton>
        <InfoIcon className={classes.icon} />
      </IconButton>
      <IconButton>
        <VpnKeyIcon />
      </IconButton>
    </div>
  );
};

export default NavigationIcons;
