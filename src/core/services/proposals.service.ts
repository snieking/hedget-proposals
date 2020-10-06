/* eslint-disable @typescript-eslint/camelcase */

import { ProposalOverview, Proposal, PollOption } from './proposals.model';
import { Transaction } from '../blockchain/Transaction';
import { Operation } from '../blockchain/Operation';
import { addAuthToOperation, query } from '../blockchain/blockchain-helper';
import { AccountState } from '../redux/account/account.state';

function addStatus<T extends ProposalOverview>(proposal: T): T {
  return {
    ...proposal,
    status: proposal.endTimestamp > Date.now() ? 'In Progress' : 'Completed',
  };
}

export function getProposals(categoryFilter: string, statusFilter: string): Promise<ProposalOverview[]> {
  if (!categoryFilter && !statusFilter)
    return query('get_all_proposals', {}).then((proposals: ProposalOverview[]) => proposals.map((p) => addStatus(p)));

  if (!statusFilter) {
    return query('get_proposals_by_category', { category: categoryFilter }).then((proposals: ProposalOverview[]) =>
      proposals.map((p) => addStatus(p))
    );
  }

  if (!categoryFilter) {
    if (statusFilter === 'In Progress') return query('get_proposals_ending_after_timestamp', { timestamp: Date.now() });
    if (statusFilter === 'Completed') return query('get_proposals_ended_before_timestamp', { timestamp: Date.now() });
  }

  if (statusFilter === 'In Progress')
    return query('get_proposals_by_category_ending_after_timestamp', {
      category: categoryFilter,
      timestamp: Date.now(),
    }).then((proposals: ProposalOverview[]) => proposals.map((p) => addStatus(p)));

  if (statusFilter === 'Completed')
    return query('get_proposals_by_category_ended_before_timestamp', {
      category: categoryFilter,
      timestamp: Date.now(),
    }).then((proposals: ProposalOverview[]) => proposals.map((p) => addStatus(p)));
}

export function getFullProposal(id: string): Promise<Proposal> {
  return query('get_full_proposal', { id }).then((p: Proposal) => addStatus(p));
}

export function getProposalPollOptions(id: string): Promise<PollOption[]> {
  return query('get_poll_proposal_options', { id });
}

export function getProposalPollVote(accountState: AccountState, proposalId: string): Promise<string> {
  return query('get_poll_vote', { account_id: accountState.accountDetail.accountID, id: proposalId });
}

export async function voteForOptionInPoll(accountState: AccountState, id: string, option: string) {
  return Transaction.create()
    .addOperation(addAuthToOperation(accountState, new Operation('vote_for_option_in_poll', [id, option])))
    .sign(accountState.keyPair)
    .confirm();
}

export function createNewProposal(accountState: AccountState, title: string, description: string, options: string[]) {
  return Transaction.create()
    .addNop()
    .addOperation(
      addAuthToOperation(accountState, new Operation('create_proposal', ['HGET', title, description, options]))
    )
    .sign(accountState.keyPair)
    .confirm();
}

export function deleteProposal(accountState: AccountState, id: string) {
  return Transaction.create()
    .addNop()
    .addOperation(addAuthToOperation(accountState, new Operation('delete_proposal', [id])))
    .sign(accountState.keyPair)
    .confirm();
}
