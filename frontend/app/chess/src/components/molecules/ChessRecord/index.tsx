import { Card, CardBody, Heading, Text } from '@chakra-ui/react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      fontSize={'12px'}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const ChessRecord: React.FC<{
  timeClass: string;
  win: number;
  draw: number;
  loss: number;
}> = ({ timeClass = '', win = 0, draw = 0, loss = 0 }) => {
  const data = [
    { name: 'Win', value: win, color: '#319795' },
    { name: 'Draw', value: draw, color: '#718096' },
    { name: 'Loss', value: loss, color: '#E53E3E' },
  ];

  return (
    <Card className="border border-gray-200">
      <CardBody>
        <Heading className="text-center md:text-left" size={'md'}>
          {timeClass} Record
        </Heading>
        <div className="flex h-full flex-col items-center gap-x-2 md:flex-row">
          <div className="h-[180px] w-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={60} height={60}>
                <Pie
                  isAnimationActive={false}
                  dataKey="value"
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={60}
                  startAngle={-270}
                >
                  {data.map(({ color = '#718096', name = 'name' }) => (
                    <Cell key={`cell-${name}`} fill={color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="px-8 text-center">
            <div className="flex items-center justify-between gap-x-4">
              <div className="text-left">
                <Text>Win</Text>
                <Text>Draw</Text>
                <Text>Loss</Text>
              </div>
              <div className="text-right">
                <div className="font-medium">{win.toLocaleString()}</div>
                <div className="font-medium">{draw.toLocaleString()}</div>
                <div className="font-medium">{loss.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
