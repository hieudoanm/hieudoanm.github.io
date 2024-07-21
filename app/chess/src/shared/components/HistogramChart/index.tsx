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
    <div className="rounded-lg border border-gray-200 shadow">
      <div className="px-8 py-4">
        <p className="text-lg capitalize">{timeClass} Distribution</p>
      </div>
      <div className="divider m-0" />
      <div className="aspect-video w-full overflow-hidden p-4 md:p-8">
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
  );
};
