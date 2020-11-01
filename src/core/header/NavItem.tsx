import React from 'react';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
}

const useStyles = makeStyles({
  wrapper: {
    cursor: 'pointer',
    display: 'inline',
    marginRight: '25px',
  },
});

const NavItem: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper} onClick={props.onClick}>
      {props.children}
    </Box>
  );
};

export default NavItem;
