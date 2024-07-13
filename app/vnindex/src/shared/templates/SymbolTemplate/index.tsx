'use client';

import { StockHistory } from '@prisma/client';
import { useSearchParameter } from '@vi/common/hooks/use-search-param';
import React, { ChangeEvent, ReactNode, useState } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Payload } from 'recharts/types/component/DefaultLegendContent';

export const PriceChart: React.FC<{ stockHistory: StockHistory[] }> = ({
  stockHistory = [],
}) => {
  const [lines, setLines] = useState<Record<string, boolean>>({
    close: false,
    bollingerUpperBand: false,
    bollingerMiddleBand: false,
    bollingerLowerBand: false,
    ma50: false,
    ma200: false,
    mfi: false,
    rsi: false,
  });

  const priceData = stockHistory.map(
    ({
      close,
      bollingerUpperBand,
      bollingerMiddleBand,
      bollingerLowerBand,
      ma50,
      ma200,
      mfi,
      rsi,
      date,
    }) => {
      return {
        close,
        bollingerUpperBand,
        bollingerMiddleBand,
        bollingerLowerBand,
        ma50,
        ma200,
        mfi,
        rsi,
        date: date.toISOString().split('T')[0],
      };
    }
  );
  const values: number[] = [
    ...priceData.map(({ close }) => close ?? 0),
    ...priceData.map(({ ma50 }) => ma50 ?? 0),
    ...priceData.map(({ ma200 }) => ma200 ?? 0),
    ...priceData.map(({ bollingerUpperBand }) => bollingerUpperBand ?? 0),
    ...priceData.map(({ bollingerMiddleBand }) => bollingerMiddleBand ?? 0),
    ...priceData.map(({ bollingerLowerBand }) => bollingerLowerBand ?? 0),
  ];
  const min = Math.round(Math.min(...values));
  const max = Math.round(Math.max(...values));

  const selectLine = (data: Payload, _index: number, _event: any) => {
    const dataKey: string = (data?.dataKey as string) ?? '';
    console.log(lines);
    setLines((lines) => ({
      ...lines,
      [dataKey]: !lines[dataKey],
    }));
  };

  return (
    <div className="card border shadow">
      <div className="card-body">
        <div className="aspect-video">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={1600} height={900} data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                allowDataOverflow
                type="number"
                yAxisId="0"
                domain={[min, max]}
              />
              <YAxis
                allowDataOverflow
                orientation="right"
                type="number"
                yAxisId="1"
                domain={[0, 100]}
              />
              <Tooltip />
              <Legend onClick={selectLine} />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#737373"
                yAxisId="0"
                hide={lines.close}
              />
              <Line
                type="monotone"
                dataKey="ma50"
                stroke="#ef4444"
                yAxisId="0"
                hide={lines.ma50}
              />
              <Line
                type="monotone"
                dataKey="ma200"
                stroke="#f59e0b"
                yAxisId="0"
                hide={lines.ma200}
              />
              <Line
                type="monotone"
                dataKey="bollingerUpperBand"
                stroke="#84cc16"
                yAxisId="0"
                hide={lines.bollingerUpperBand}
              />
              <Line
                type="monotone"
                dataKey="bollingerMiddleBand"
                stroke="#10b981"
                yAxisId="0"
                hide={lines.bollingerMiddleBand}
              />
              <Line
                type="monotone"
                dataKey="bollingerLowerBand"
                stroke="#14b8a6"
                yAxisId="0"
                hide={lines.bollingerLowerBand}
              />
              <ReferenceLine
                y={80}
                label="MFI Overbought"
                stroke="#0ea5e9"
                yAxisId="1"
              />
              <ReferenceLine
                y={20}
                label="MFI Oversold"
                stroke="#0ea5e9"
                yAxisId="1"
              />
              <ReferenceLine
                y={70}
                label="RSI Overbought"
                stroke="#3b82f6"
                yAxisId="1"
              />
              <ReferenceLine
                y={30}
                label="RSI Oversold"
                stroke="#3b82f6"
                yAxisId="1"
              />
              <Line
                type="monotone"
                dataKey="mfi"
                stroke="#0ea5e9"
                yAxisId="1"
                hide={lines.mfi}
              />
              <Line
                type="monotone"
                dataKey="rsi"
                stroke="#3b82f6"
                yAxisId="1"
                hide={lines.rsi}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export const SymbolContainer: React.FC<{
  symbol: string;
  children: ReactNode;
}> = ({ symbol, children = <></> }) => {
  const [timeRange, setTimeRange] = useSearchParameter('timeRange', '3M');

  return (
    <div className="p-8">
      <div className="flex flex-col gap-y-8">
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="text-xl">{symbol}</h1>
          <select
            id="timeRange"
            name="timeRange"
            className="select select-bordered"
            value={timeRange}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setTimeRange(event?.target.value)
            }>
            <option value="1W">1 Week</option>
            <option value="2W">2 Weeks</option>
            <option value="1M">1 Month</option>
            <option value="2M">2 Months</option>
            <option value="3M">3 Months</option>
            <option value="6M">6 Months</option>
            <option value="1Y">1 Year</option>
          </select>
        </div>
        {children}
      </div>
    </div>
  );
};

export type SymbolTemplateProperties = {
  symbol: string;
  stockHistory: StockHistory[];
};

export const SymbolTemplate: React.FC<SymbolTemplateProperties> = ({
  symbol = '',
  stockHistory = [],
}) => {
  if (stockHistory.length === 0) {
    return (
      <SymbolContainer symbol={symbol}>
        <div className="card border shadow">
          <div className="card-body">
            <div className="aspect-video">
              <div className="flex h-full w-full items-center justify-center">
                <p>No Data</p>
              </div>
            </div>
          </div>
        </div>
      </SymbolContainer>
    );
  }

  return (
    <SymbolContainer symbol={symbol}>
      <PriceChart stockHistory={stockHistory} />
    </SymbolContainer>
  );
};
