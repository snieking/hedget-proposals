import React from 'react';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

interface Props {
  status: string;
  className?: string;
}

const useStyles = makeStyles({
  wrapper: {
    textAlign: 'center',
    width: '100px',
    display: 'inline',
    borderRadius: '5px',
  },
  text: {
    marginLeft: '10px',
    marginRight: '10px',
    marginTop: '10px',
    marginBottom: '10px',
  },
});

const StatusChip: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const color = () => (props.status === 'Completed' ? '#D9FCEA' : '#FFEEBE');
  return (
    <div className={`${props.className} ${classes.wrapper}`} style={{ backgroundColor: color() }}>
      <Typography variant="body2" component="span" className={classes.text}>
        {props.status}
      </Typography>
    </div>
  );
};

export default StatusChip;
