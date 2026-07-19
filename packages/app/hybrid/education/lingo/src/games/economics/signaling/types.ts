export type Phase = 'choose' | 'reveal' | 'done';

export type CandidateType = 'high' | 'low';

export interface Candidate {
  id: number;
  type: CandidateType;
  education: 0 | 1;
  wage: number;
  accepted: boolean;
  profit: number;
}

export interface Wages {
  w0: number;
  w1: number;
}
