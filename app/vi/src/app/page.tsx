import { prismaClient } from '@vi/common/prisma/prisma.client';
import { NextPage } from 'next';

const HomePage: NextPage = async () => {
  const stockSymbols = await prismaClient.stockSymbol.findMany();

  return (
    <main>
      <div className="p-8">
        <div className="container mx-auto">
          <div className="card overflow-hidden border shadow">
            <div className="overflow-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Symbol</th>
                    <th align="right">Market</th>
                    <th align="right" className="w-8">
                      VN30
                    </th>
                    <th align="right" className="w-8">
                      HNX30
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stockSymbols.map(({ symbol, market, vn30, hnx30 }) => {
                    return (
                      <tr key={symbol}>
                        <td>{symbol}</td>
                        <td align="right">{market}</td>
                        <td>{vn30 ? 'VN30' : ''}</td>
                        <td>{hnx30 ? 'HNX30' : ''}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
