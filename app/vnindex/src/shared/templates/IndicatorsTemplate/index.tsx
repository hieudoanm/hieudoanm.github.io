'use client';

import { Market, Sector, StockHistory } from '@prisma/client';
import { useSearchParameter } from '@vi/common/hooks/use-search-param';
import Link from 'next/link';
import { ChangeEvent } from 'react';

export type IndicatorsTemplateProperties = {
  stockHistory: StockHistory[];
};

export const IndicatorsTable: React.FC<{
  title: string;
  data: StockHistory[];
}> = ({ title = '', data = [] }) => {
  return (
    <div className="card overflow-hidden border shadow">
      <div className="border-b px-8 py-4">
        <h2 className="text-lg">
          {title} ({data.length})
        </h2>
      </div>
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Sector</th>
              <th>Market</th>
              <th>Date</th>
              <th>Open</th>
              <th>High</th>
              <th>Low</th>
              <th>Close</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({ symbol, date, stock, open, high, low, close }: any) => {
                return (
                  <tr key={symbol}>
                    <td>
                      <Link
                        href={`/chart?symbol=${encodeURIComponent(symbol)}`}>
                        {symbol}
                      </Link>
                    </td>
                    <td className="capitalize">
                      {(stock.sector || '').replaceAll('_', ' ').toLowerCase()}
                    </td>
                    <td>{stock.market}</td>
                    <td>{date.toISOString().split('T')[0]}</td>
                    <td>{open}</td>
                    <td>{high}</td>
                    <td>{low}</td>
                    <td>{close}</td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const IndicatorsTemplate: React.FC<IndicatorsTemplateProperties> = ({
  stockHistory = [],
}) => {
  const [market, setMarket] = useSearchParameter('market');
  const [sector, setSector] = useSearchParameter('sector', '');
  const [timeRange, setTimeRange] = useSearchParameter('timeRange', '3M');

  const goldenCross = stockHistory.filter(({ goldenCross }) => goldenCross);
  const deathCross = stockHistory.filter(({ deathCross }) => deathCross);
  const bollingerOverbought = stockHistory.filter(
    ({ bollingerOverbought }) => bollingerOverbought
  );
  const bollingerOversold = stockHistory.filter(
    ({ bollingerOversold }) => bollingerOversold
  );
  const mfiOverbought = stockHistory.filter(
    ({ mfiOverbought }) => mfiOverbought
  );
  const mfiOversold = stockHistory.filter(({ mfiOversold }) => mfiOversold);
  const rsiOverbought = stockHistory.filter(
    ({ rsiOverbought }) => rsiOverbought
  );
  const rsiOversold = stockHistory.filter(({ rsiOversold }) => rsiOversold);

  return (
    <div className="p-8">
      <div className="flex flex-col gap-y-8">
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="text-xl">Indicators</h1>
          <div className="join shadow">
            <select
              id="market"
              name="market"
              value={market}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setMarket(event?.target.value)
              }
              className="join-item select select-bordered">
              <option>Market</option>
              <option value="VN30">VN30</option>
              <option value={Market.HOSE}>HOSE</option>
              <option value="HNX30">HNX30</option>
              <option value={Market.HNX}>HNX</option>
              <option value={Market.UPCOM}>UPCOM</option>
            </select>
            <select
              id="sector"
              name="sector"
              value={sector}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setSector(event?.target.value)
              }
              className="join-item select select-bordered">
              <option>Sector</option>
              <option value={Sector.BANKING}>Banking</option>
              <option value={Sector.BASIC_RESOURCES}>Basic Resources</option>
              <option value={Sector.CHEMICAL}>Chemical</option>
              <option value={Sector.COMMUNICATIONS}>Communications</option>
              <option value={Sector.ELECTRICITY_WATER_PETROL}>
                Electricity, Water & Petrol
              </option>
              <option value={Sector.FINANCIAL_SERVICES}>
                Financial Services
              </option>
              <option value={Sector.FOOD_BEVERAGE}>Food & Beverage</option>
              <option value={Sector.INDUSTRIAL_GOODS_SERVICES}>
                Industrial Goods & Services
              </option>
              <option value={Sector.INFORMATION_TECHNOLOGY}>
                Information Technology
              </option>
              <option value={Sector.INSURANCE}>Insurance</option>
              <option value={Sector.MEDICAL}>Medical</option>
              <option value={Sector.PETROLEUM}>Petroleum</option>
              <option value={Sector.REAL_ESTATE}>Real Estate</option>
              <option value={Sector.RETAIL}>Retail</option>
              <option value={Sector.TELECOMMUNICATION}>
                Telecommunication
              </option>
              <option value={Sector.TRAVEL_ENTERTAINMENT}>
                Travel & Entertainment
              </option>
            </select>
            <select
              id="timeRange"
              name="timeRange"
              className="join-item select select-bordered"
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
        </div>
        <IndicatorsTable title="Golden Cross" data={goldenCross} />
        <IndicatorsTable title="Death Cross" data={deathCross} />
        <IndicatorsTable title="Bollinger Oversold" data={bollingerOversold} />
        <IndicatorsTable
          title="Bollinger Overbought"
          data={bollingerOverbought}
        />
        <IndicatorsTable title="MFI Oversold" data={mfiOversold} />
        <IndicatorsTable title="MFI Overbought" data={mfiOverbought} />
        <IndicatorsTable title="RSI Oversold" data={rsiOversold} />
        <IndicatorsTable title="RSI Overbought" data={rsiOverbought} />
      </div>
    </div>
  );
};
