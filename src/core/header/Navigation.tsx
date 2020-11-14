import React from 'react';
import { makeStyles } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { AccountCircle } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import About from './About';
import Stake from '../../shared/Stake';
import NavText from './NavText';
import NavItem from './NavItem';
import ApplicationState from '../redux/application-state';

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
  const accountState = useSelector((state: ApplicationState) => state.account);

  const [infoOpen, setInfoOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);

  const toggleOpenInfo = () => {
    setInfoOpen(true);
  };

  const handleCloseInfo = () => {
    setInfoOpen(false);
  };

  function renderAccountNavigation() {
    if (accountState.isChecked && !accountState.accountDetail) {
      return (
        <>
          <NavItem onClick={() => setLoginOpen(true)}>
            <AccountCircle color="primary" className={`${classes.icon} ${classes.navIcon}`} />
            <NavText message="Login" />
          </NavItem>
          <Stake open={loginOpen} onClose={() => setLoginOpen(false)} />
        </>
      );
    }

    return (
      <Link to={`/account/${accountState.keyPair.pubKey.toString('hex')}`} style={{ textDecoration: 'none' }}>
        <AccountCircle color="primary" className={`${classes.icon} ${classes.navIcon}`} />
        <NavText message="Your Account" />
      </Link>
    );
  }

  return (
    <div className={classes.wrapper}>
      <NavItem onClick={toggleOpenInfo}>
        <InfoIcon color="primary" className={`${classes.icon} ${classes.navIcon}`} />
        <NavText message="Service Info" />
      </NavItem>
      {renderAccountNavigation()}
      <About open={infoOpen} onClose={handleCloseInfo} />
    </div>
  );
};

export default Navigation;
