import React from 'react';
import { makeStyles } from '@material-ui/core';
import ProposalOverviewItem from './ProposalOverviewItem';
import { ProposalOverview } from '../../../core/services/proposals.model';

interface Props {
  proposals: ProposalOverview[];
}

const useStyles = makeStyles({
  wrapper: {
    borderRadius: '5px',
  },
});

const ProposalOverviewList: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {props.proposals.map((p) => (
        <ProposalOverviewItem proposal={p} key={p.id} />
      ))}
    </div>
  );
};

export default ProposalOverviewList;
