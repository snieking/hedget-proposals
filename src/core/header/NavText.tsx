import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import { COLOR_GRAY } from '../dynamic-theme/DefaultTheme';

interface Props {
  message: string;
}

const useStyles = makeStyles({
  text: {
    color: COLOR_GRAY,
    opacity: 0.7,
    fontWeight: 'bold',
  },
});

const NavText: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  return (
    <Hidden smDown>
      <Typography variant="body1" component="span" className={classes.text}>
        {props.message}
      </Typography>
    </Hidden>
  );
};

export default NavText;
