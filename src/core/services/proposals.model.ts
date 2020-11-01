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

export interface PollParticipation {
  id: string;
  title: string;
  option: string;
  amount: string;
  endTimestamp: number;
  status: string;
}

export interface VoterDetails {
  address: string;
  amount: number;
}
