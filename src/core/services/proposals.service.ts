import { ProposalOverview } from './proposals.model';

const proposalOverviewMock: ProposalOverview[] = [
  {
    app: 'hedget',
    id: 'HGET-4',
    title: 'Token Rewards',
    status: 'Completed',
    category: 'Community',
    author: '0x583A78bA1f6b25E29fbBC8Cd1BFA29A51520De84',
    startTimestamp: Date.now(),
    endTimestamp: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    app: 'hedget',
    id: 'HGET-3',
    title: 'Changes to Token',
    status: 'In Progress',
    category: 'Core',
    author: '0x583A78bA1f6b25E29fbBC8Cd1BFA29A51520De84',
    startTimestamp: Date.now(),
    endTimestamp: Date.now() + 1000 * 60 * 60 * 24 * 3,
  },
  {
    app: 'hedget',
    id: 'HGET-2',
    title: 'Updates to Proposal Mechanics',
    status: 'In Progress',
    category: 'Community',
    author: '0x583A78bA1f6b25E29fbBC8Cd1BFA29A51520De84',
    startTimestamp: Date.now(),
    endTimestamp: Date.now() + 1000 * 60 * 60 * 24 * 1,
  },
  {
    app: 'hedget',
    id: 'HGET-1',
    title: 'Proposal Mechanics',
    status: 'Completed',
    category: 'Core',
    author: '0x683A78bA1f6b25E29fbBC9Cd1BFA29A51520De84',
    startTimestamp: Date.now() - 1000 * 60 * 60 * 24 * 7,
    endTimestamp: Date.now() - 1000 * 60,
  },
];

export function getProposals(app: string, categoryFilter: string, statusFilter: string) {
  return Promise.resolve(
    proposalOverviewMock
      .filter((p) => p.app === app)
      .filter((p) => !categoryFilter || p.category === categoryFilter)
      .filter((p) => !statusFilter || p.status === statusFilter)
  );
}
