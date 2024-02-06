'use client';

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
    <div className="card border border-gray-200 shadow">
      <div className="py-4 px-8">
        <h2 className="text-lg capitalize">{timeClass} Distribution</h2>
      </div>
      <div className="divider" />
      <div className="card-body">
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
      </div>
    </div>
  );
};
