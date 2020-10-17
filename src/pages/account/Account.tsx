import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { PollParticipation, ProposalOverview } from '../../core/services/proposals.model';
import { getPollParticipationsByAddress, getProposalsByAddress } from '../../core/services/proposals.service';

interface MatchParams {
  address: string;
}

const Account: React.FunctionComponent<RouteComponentProps<MatchParams>> = (props) => {
  const [proposals, setProposals] = useState<ProposalOverview[]>([]);
  const [pollParticipation, setPollParticipations] = useState<PollParticipation[]>([]);

  useEffect(() => {
    if (props.match.params.address) {
      console.log(props.match.params.address);
      getProposalsByAddress(props.match.params.address, 0).then((p) => setProposals(p));
      getPollParticipationsByAddress(props.match.params.address).then((p) => setPollParticipations(p));
    }
  }, [props.match.params.address]);

  return (
    <>
      {proposals.map((p) => (
        <p key={p.id}>{JSON.stringify(p)}</p>
      ))}
      <hr />
      {pollParticipation.map((p) => (
        <p key={p.id}>{JSON.stringify(p)}</p>
      ))}
    </>
  );
};

export default Account;
