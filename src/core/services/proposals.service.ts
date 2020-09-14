import { ProposalOverview, Proposal, PollOption } from './proposals.model';
import { Transaction } from '../blockchain/Transaction';
import { Operation } from '../blockchain/Operation';
import { query } from '../blockchain/blockchain-helper';
import { KeyPair } from '../../shared/types';

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

export function voteForOptionInPoll(keyPair: KeyPair, id: string, option: string) {
  return Transaction.create()
    .addOperation(new Operation('vote_for_option_in_poll', [keyPair.pubkey, id, option]))
    .sign(keyPair.privkey, keyPair.pubkey)
    .confirm();
}

export function createNewProposal(keyPair: KeyPair, title: string, description: string) {
  return Transaction.create()
    .addNop()
    .addOperation(new Operation('create_proposal', [keyPair.pubkey, title, description]))
    .sign(keyPair.privkey, keyPair.pubkey)
    .confirm();
}
