import { TITLES } from '@chess/common/constants/chess.constants';
import { NextResponse } from 'next/server';

export const GET = () => {
  return NextResponse.json(TITLES, { status: 200 });
};
