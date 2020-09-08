import { ProposalOverview, Proposal, PollOption } from './proposals.model';

const proposalOverviewMock: ProposalOverview[] = [
  {
    app: 'hedget',
    id: 'HGET-4',
    title: 'Token Rewards',
    status: 'Completed',
    category: 'Community',
    author: '0x583A78bA1f6b25E29fbBC8Cd1BFA29A51520De84',
    startTimestamp: Date.now() - 1000 * 60 * 60 * 24 * 10,
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

export function getFullProposal(app: string, id: string): Promise<Proposal> {
  return Promise.resolve(
    proposalOverviewMock
      .filter((p) => p.app === app)
      .map((p) => {
        const full = p as Proposal;
        full.description =
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tempus nibh tellus, vitae scelerisque enim pellentesque vel. Suspendisse blandit lorem varius eleifend sagittis. Morbi ut lacus ut felis eleifend imperdiet. Suspendisse ornare ullamcorper libero in condimentum. Donec quis quam suscipit, blandit elit eu, efficitur urna. Ut sed tortor commodo, suscipit massa nec, consequat est. Sed at ipsum eleifend, lobortis ipsum vel, tristique arcu. Cras magna felis, feugiat vel ullamcorper imperdiet, mattis nec risus. Aenean ultricies metus a dolor accumsan imperdiet. Sed eleifend tempor feugiat. Duis aliquet eu eros in faucibus.';
        return full;
      })
      .find((p) => p.id === id)
  );
}

export function getProposalPollOptions(app: string, id: string): Promise<PollOption[]> {
  return Promise.resolve([
    {
      option: 'Option 1...',
      votes: 250,
    },
    {
      option: 'Option 2...',
      votes: 350,
    },
  ]);
}
