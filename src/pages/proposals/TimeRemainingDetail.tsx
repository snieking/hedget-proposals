import React from 'react';
import TimerIcon from '@material-ui/icons/Timer';
import { Typography } from '@material-ui/core';
import { hoursFromNow } from './util';

interface Props {
  endTimestamp: number;
  detailWrapperClassName?: string;
  iconTextClassName?: string;
}

const TimeRemainingDetail: React.FunctionComponent<Props> = (props) => {
  const currentTime = Date.now();

  if (props.endTimestamp > currentTime) {
    return (
      <>
        <TimerIcon />
        <Typography variant="body2" component="span" className={props.iconTextClassName}>
          {hoursFromNow(props.endTimestamp)} hours remaining
        </Typography>
      </>
    );
  }

  return null;
};

export default TimeRemainingDetail;
