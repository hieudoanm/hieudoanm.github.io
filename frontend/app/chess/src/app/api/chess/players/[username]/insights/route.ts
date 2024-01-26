import { NextRequest, NextResponse } from 'next/server';

export const GET = (request: NextRequest): NextResponse => {
  console.log(request.nextUrl);
  return NextResponse.json({});
};
