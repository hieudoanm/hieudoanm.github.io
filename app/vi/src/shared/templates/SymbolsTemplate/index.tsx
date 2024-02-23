'use client';

import { Market, StockSymbol, Sector } from '@prisma/client';
import { useSearchParameter } from '@vi/common/hooks/use-search-param';
import Link from 'next/link';
import { ChangeEvent } from 'react';

export type SymbolsTemplateProperties = {
  title: string;
  stockSymbols: StockSymbol[];
};

export const SymbolsTemplate: React.FC<SymbolsTemplateProperties> = ({
  title = '',
  stockSymbols = [],
}) => {
  const [market, setMarket] = useSearchParameter('market');
  const [sector, setSector] = useSearchParameter('sector', '');

  return (
    <div className="p-8">
      <div className="flex flex-col gap-y-8">
        <div className="flex items-center justify-between gap-x-4">
          <h1 className="text-xl">
            {title} ({stockSymbols.length})
          </h1>
          <div className="join shadow">
            <select
              id="market"
              name="market"
              value={market}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setMarket(event?.target.value)
              }
              className="join-item select select-bordered">
              <option value="">Market</option>
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
              <option value="">Sector</option>
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
          </div>
        </div>
        <div className="card overflow-hidden border shadow">
          <div className="overflow-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th align="right" className="w-16">
                    Market
                  </th>
                  <th align="right" className="w-32">
                    Sector
                  </th>
                </tr>
              </thead>
              <tbody>
                {stockSymbols.map(({ symbol, market, sector }) => {
                  return (
                    <tr key={symbol}>
                      <td>
                        <Link
                          href={`/chart?symbol=${encodeURIComponent(symbol)}`}>
                          {symbol}
                        </Link>
                      </td>
                      <td align="right">{market}</td>
                      <td align="right">
                        <p className="truncate capitalize">
                          {sector?.replaceAll('_', ' ').toLowerCase()}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
