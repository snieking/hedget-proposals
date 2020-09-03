import React from 'react';
import { Chip } from '@material-ui/core';

interface Props {
  status: string;
  className?: string;
}

const StatusChip: React.FunctionComponent<Props> = (props) => {
  const color = () => (props.status === 'Completed' ? 'green' : 'purple');
  return <Chip label={props.status} className={props.className} style={{ backgroundColor: color() }} />;
};

export default StatusChip;
