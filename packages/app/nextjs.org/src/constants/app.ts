import { chess960, chess960BackRankToInitialFEN } from '@chess/ts';

export const APP_NAME: string = 'Chess960';

export const INITIAL_ID: number = 518;
export const INITIAL_POSITION: string = chess960.at(INITIAL_ID) ?? '';
export const INITIAL_FEN: string =
  chess960BackRankToInitialFEN(INITIAL_POSITION);
