import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { AccountCircle } from '@material-ui/icons';
import About from './About';
import Stake from '../../shared/Stake';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    marginTop: '10px',
    textAlign: 'right',
  },
  icon: {
    width: '24px',
    height: '24px',
    [theme.breakpoints.up('md')]: {
      width: '32px',
      height: '32px',
    },
  },
}));

const NavigationIcons: React.FunctionComponent = () => {
  const classes = useStyles();

  const [infoOpen, setInfoOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);

  const toggleOpenInfo = () => {
    setInfoOpen(true);
  };

  const handleCloseInfo = () => {
    setInfoOpen(false);
  };

  return (
    <div className={classes.wrapper}>
      <IconButton onClick={toggleOpenInfo}>
        <InfoIcon className={classes.icon} />
      </IconButton>
      <About open={infoOpen} onClose={handleCloseInfo} />
      <IconButton onClick={() => setLoginOpen(true)}>
        <AccountCircle className={classes.icon} />
      </IconButton>
      <Stake open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
};

export default NavigationIcons;
