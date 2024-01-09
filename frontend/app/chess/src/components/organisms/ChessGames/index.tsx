import { Card, CardBody, CardHeader, Divider, Icon } from '@chakra-ui/react';
import { TEAL_COLOR } from '@chess/common/constants';
import { Insights } from '@chess/types/chess';
import { FaMinusSquare, FaPlusSquare, FaSquare } from 'react-icons/fa';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const ChessTotal: React.FC<{
  percentage: number;
  value: number;
  label: string;
  iconColor: string;
  iconAs: any;
}> = ({ percentage = 0, value = 0, label = '', iconColor, iconAs }) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center gap-x-1 md:gap-x-2">
        <Icon as={iconAs} color={iconColor} />
        <b className="text-base md:text-lg">{percentage.toFixed(2)}%</b>
      </div>
      <div className="text-right text-xs capitalize md:text-sm">
        {value} {label}
      </div>
    </div>
  );
};

const ChessAccuracy: React.FC<{
  value: number;
  label: string;
  iconColor: string;
  iconAs: any;
}> = ({ value = 0, label = '', iconColor, iconAs }) => {
  return (
    <div className="flex flex-col gap-y-1">
      <p className="text-right text-xs capitalize md:text-sm">{label}</p>
      <div className="flex items-center gap-x-1 md:gap-x-2">
        <Icon as={iconAs} color={iconColor} />
        <b className="text-base md:text-lg">{value.toFixed(2)}%</b>
      </div>
    </div>
  );
};

export const ChessGames: React.FC<{ insights: Insights }> = ({ insights }) => {
  return (
    <Card className="border border-gray-200">
      <CardHeader>
        <h1 className="text-xl md:text-3xl">Overview</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <p className="text-base md:text-lg">Games played</p>
              <p className="text-lg md:text-xl">
                <b>{(insights?.games?.total ?? 0).toLocaleString()}</b>
              </p>
            </div>
            <div className="flex items-center gap-x-2 md:gap-x-4">
              <ChessTotal
                value={insights?.games?.win ?? 0}
                percentage={
                  ((insights?.games?.win ?? 0) /
                    (insights?.games?.total ?? 1)) *
                  100
                }
                label="won"
                iconAs={FaPlusSquare}
                iconColor="teal"
              />
              <ChessTotal
                value={insights?.games?.draw ?? 0}
                percentage={
                  ((insights?.games?.draw ?? 0) /
                    (insights?.games?.total ?? 1)) *
                  100
                }
                label="drawn"
                iconAs={FaSquare}
                iconColor="gray"
              />
              <ChessTotal
                value={insights?.games?.loss ?? 0}
                percentage={
                  ((insights?.games?.loss ?? 0) /
                    (insights?.games?.total ?? 1)) *
                  100
                }
                label="lost"
                iconAs={FaMinusSquare}
                iconColor="red"
              />
            </div>
          </div>
          <div className="aspect-video">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={1600}
                height={900}
                barCategoryGap={1}
                data={insights?.games?.periods ?? []}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Bar
                  isAnimationActive={false}
                  dataKey="games"
                  fill={TEAL_COLOR}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardBody>
      <Divider />
      <CardBody>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <p className="text-base md:text-lg">Average accuracy</p>
              <p className="text-lg md:text-xl">
                <b>{(insights?.accuracy?.average ?? 0).toLocaleString()}</b>
              </p>
            </div>
            <div className="flex items-center gap-x-2 md:gap-x-4">
              <ChessAccuracy
                value={insights?.accuracy?.win ?? 0}
                label="When you win"
                iconAs={FaPlusSquare}
                iconColor="teal"
              />
              <ChessAccuracy
                value={insights?.accuracy?.draw ?? 0}
                label="When you draw"
                iconAs={FaSquare}
                iconColor="gray"
              />
              <ChessAccuracy
                value={insights?.accuracy?.loss ?? 0}
                label="When you lose"
                iconAs={FaMinusSquare}
                iconColor="red"
              />
            </div>
          </div>
          <div className="aspect-video">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={1600}
                height={900}
                data={insights?.accuracy?.periods ?? []}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Area
                  isAnimationActive={false}
                  type="monotone"
                  dataKey="average"
                  stroke={TEAL_COLOR}
                  fill="#1a8d8d"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
