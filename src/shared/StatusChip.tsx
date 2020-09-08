import React from 'react';
import { Chip } from '@material-ui/core';
import { COLOR_HEDGET_GREEN, COLOR_YELLOW } from '../core/dynamic-theme/DefaultTheme';

interface Props {
  status: string;
  className?: string;
}

const StatusChip: React.FunctionComponent<Props> = (props) => {
  const color = () => (props.status === 'Completed' ? COLOR_HEDGET_GREEN : COLOR_YELLOW);
  return <Chip label={props.status} className={props.className} style={{ backgroundColor: color() }} />;
};

export default StatusChip;
