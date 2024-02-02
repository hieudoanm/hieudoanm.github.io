'use client';

import { Card, CardBody, CardHeader, Divider, Heading } from '@chakra-ui/react';
import { TEAL_COLOR } from '@chess/common/constants/chess.constants';
import { ChessTimeClass } from '@prisma/client';
import {
  Bar,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';

export const ChessHistogramChart: React.FC<{
  timeClass: ChessTimeClass;
  data: { label: string; value: number }[];
}> = ({ timeClass = '', data = [] }) => {
  return (
    <Card className="border border-gray-200 shadow">
      <CardHeader>
        <Heading as={'h2'} className="text-lg capitalize">
          {timeClass} Distribution
        </Heading>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="aspect-video overflow-hidden">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              width={1600}
              height={900}
              barCategoryGap={1}
              data={data}>
              <XAxis dataKey="label" scale="band" />
              <Tooltip />
              <Bar dataKey="value" fill={TEAL_COLOR} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
};
