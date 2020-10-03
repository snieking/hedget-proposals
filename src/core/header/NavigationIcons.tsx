import React from 'react';
import { IconButton, makeStyles, Modal } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import About from './About';
import Stake from '../../Stake';
import {useSelector} from "react-redux";
import ApplicationState from "../redux/application-state";

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

  const [infoOpen, setInfoOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const accountState = useSelector((state: ApplicationState) => state.account);

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
        <VpnKeyIcon color={accountState.accountDetail ? 'inherit' : 'primary'} />
      </IconButton>
      <Stake open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
};

export default NavigationIcons;
