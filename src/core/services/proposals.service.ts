import { ProposalOverview, Proposal, PollOption } from './proposals.model';
import { Transaction } from '../blockchain/Transaction';
import { Operation } from '../blockchain/Operation';
import { addAuthToOperation, query } from '../blockchain/blockchain-helper';
import { AccountState } from '../redux/account/account.state';

export function getProposals(categoryFilter: string, statusFilter: string): Promise<ProposalOverview[]> {
  if (!categoryFilter && !statusFilter) return query('get_all_proposals', {});

  if (!statusFilter) {
    return query('get_proposals_by_category', { category: categoryFilter });
  }

  if (!categoryFilter) {
    if (statusFilter === 'In Progress') return query('get_proposals_ending_after_timestamp', { timestamp: Date.now() });
    if (statusFilter === 'Completed') return query('get_proposals_ended_before_timestamp', { timestamp: Date.now() });
  }

  if (statusFilter === 'In Progress')
    return query('get_proposals_by_category_ending_after_timestamp', {
      category: categoryFilter,
      timestamp: Date.now(),
    });

  if (statusFilter === 'Completed')
    return query('get_proposals_by_category_ended_before_timestamp', {
      category: categoryFilter,
      timestamp: Date.now(),
    });
}

export function getFullProposal(id: string): Promise<Proposal> {
  return query('get_full_proposal', { id });
}

export function getProposalPollOptions(id: string): Promise<PollOption[]> {
  return query('get_poll_proposal_options', { id });
}

export async function voteForOptionInPoll(accountState: AccountState, id: string, option: string) {
  return Transaction.create()
    .addOperation(addAuthToOperation(accountState, new Operation('vote_for_option_in_poll', [id, option])))
    .sign(accountState.keyPair)
    .confirm();
}

export function createNewProposal(accountState: AccountState, title: string, description: string) {
  return Transaction.create()
    .addNop()
    .addOperation(addAuthToOperation(accountState,
      new Operation('create_proposal', ['HGET', title, description])))
    .sign(accountState.keyPair)
    .confirm();
}
