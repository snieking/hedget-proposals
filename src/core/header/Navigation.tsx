import React from 'react';
import { makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { AccountCircle } from '@material-ui/icons';
import About from './About';
import Stake from '../../shared/Stake';
import NavText from './NavText';
import NavItem from './NavItem';

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
  navItem: {
    display: 'inline',
  },
  navIcon: {
    position: 'relative',
    top: '10px',
    marginRight: '5px',
  },
}));

const Navigation: React.FunctionComponent = () => {
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
      <NavItem onClick={() => setLoginOpen(true)}>
        <AccountCircle color="primary" className={`${classes.icon} ${classes.navIcon}`} />
        <NavText message="Your Account" />
      </NavItem>
      <NavItem onClick={toggleOpenInfo}>
        <InfoIcon color="primary" className={`${classes.icon} ${classes.navIcon}`} />
        <NavText message="Service Info" />
      </NavItem>
      <About open={infoOpen} onClose={handleCloseInfo} />
      <Stake open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
};

export default Navigation;
