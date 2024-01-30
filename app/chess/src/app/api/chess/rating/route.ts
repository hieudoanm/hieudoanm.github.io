import { logger } from '@chess/common/libs/logger';
import { NextRequest, NextResponse } from 'next/server';
import { RatingRequestBody, RatingResponse, calculateRating } from './service';

export const POST = async (
  request: NextRequest
): Promise<NextResponse<RatingResponse>> => {
  const ratingRequestBody: RatingRequestBody = await request.json();
  logger.info(`ratingRequestBody=${JSON.stringify(ratingRequestBody)}`);
  const rating = calculateRating(ratingRequestBody);
  return NextResponse.json<RatingResponse>({ rating }, { status: 200 });
};
