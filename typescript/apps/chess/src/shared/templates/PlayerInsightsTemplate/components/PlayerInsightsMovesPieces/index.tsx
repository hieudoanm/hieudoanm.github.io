import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import { TIME_COLORS } from '@chess/common/constants/chess.constants';
import { customLabel } from '@chess/common/utils/custom-label';
import { CardHeading } from '@chess/shared/components/CardHeading';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export type PlayerInsightsMovesPiecesProperties = { insights: Insights };

export const PlayerInsightsMovesPieces: React.FC<
  PlayerInsightsMovesPiecesProperties
> = ({ insights = {} as Insights }) => {
  const pawn: number = insights?.moves?.pieces?.pawn;
  const knight: number = insights?.moves?.pieces?.knight;
  const bishop: number = insights?.moves?.pieces?.bishop;
  const rook: number = insights?.moves?.pieces?.rook;
  const queen: number = insights?.moves?.pieces?.queen;
  const king: number = insights?.moves?.pieces?.king;
  const total = pawn + knight + bishop + rook + queen + king;
  const pieces = [
    { name: 'king', value: king },
    { name: 'queen', value: queen },
    { name: 'rook', value: rook },
    { name: 'bishop', value: bishop },
    { name: 'knight', value: knight },
    { name: 'pawn', value: pawn },
  ];

  return (
    <div className="card border border-gray-200 shadow">
      <div className="border-b px-8 py-4">
        <CardHeading>Pieces</CardHeading>
      </div>
      <div className="card-body">
        <p className="text-base font-bold md:text-lg">Moves per piece</p>
        <div className="aspect-video">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Legend />
              <Tooltip />
              <Pie
                isAnimationActive={false}
                dataKey="value"
                data={pieces}
                cx="50%"
                cy="50%"
                labelLine={false}
                startAngle={-270}
                fillOpacity={0.75}
                label={customLabel(pieces, total)}>
                {pieces.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={TIME_COLORS[index % TIME_COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
