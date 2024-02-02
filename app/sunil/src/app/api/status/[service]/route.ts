import { getServiceStatus } from '@sunil/common/clients/status/status.client';
import { Service } from '@sunil/common/clients/status/status.dto';
import { NextRequest, NextResponse } from 'next/server';

type StatusParameters = {
  params: { service: Service };
};

type StatusResponse = {
  service: Service;
  error: boolean;
};

export const GET = async (
  _request: NextRequest,
  { params }: StatusParameters
): Promise<NextResponse<StatusResponse>> => {
  const service: Service = params.service;
  const { error } = await getServiceStatus(service);
  return NextResponse.json({ service, error }, { status: 200 });
};
