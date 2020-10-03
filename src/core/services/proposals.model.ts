export interface ProposalOverview {
  app: string;
  id: string;
  title: string;
  status: string;
  category: string;
  author: string;
  startTimestamp: number;
  endTimestamp: number;
}

export interface Proposal extends ProposalOverview {
  description: string;
}

export interface PollOption {
  text: string;
  votes: number;
}
