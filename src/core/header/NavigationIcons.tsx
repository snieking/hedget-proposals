import React from 'react';
import { IconButton, makeStyles, Modal } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import About from './About';

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
      <Modal open={infoOpen} onClose={handleCloseInfo}>
        <About />
      </Modal>
      <IconButton>
        <VpnKeyIcon />
      </IconButton>
    </div>
  );
};

export default NavigationIcons;
