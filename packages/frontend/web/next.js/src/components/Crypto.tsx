import { useQuery } from '@tanstack/react-query';
import { tryCatch } from '@web/utils/try-catch';

type CoinRanking = {
  data: {
    coins: {
      uuid: string;
      name: string;
      symbol: string;
      color: string;
      iconUrl: string;
      marketCap: string;
      price: string;
      rank: number;
      sparkline: string[];
      lowVolume: boolean;
      allTimeHigh: {
        price: number;
        timestamp: number;
      };
    }[];
  };
};

export const Crypto = () => {
  const url = `https://api.coinranking.com/v2/coins?limit=10`;
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('url', url);
  const proxyUrl = `https://hieudoanm-reverse-proxy.vercel.app/api?${urlSearchParams.toString()}`;
  const { isPending, error, data } = useQuery<CoinRanking>({
    queryKey: [`coin-ranking`],
    queryFn: async () => {
      const { error, data } = await tryCatch(
        fetch(proxyUrl).then((response) => response.json())
      );
      if (error) {
        console.error('Error fetching data:', error);
        return {};
      }
      return data;
    },
  });

  if (isPending) return <p className="text-center">Loading</p>;

  if (error) return <p className="text-center">{error.message}</p>;

  if (JSON.stringify(data) === '{}')
    return <p className="text-center">No Data</p>;

  const { data: responseData } = data ?? { data: { coins: [] } };
  const { coins = [] } = responseData ?? { coins: [] };

  return (
    <div className="flex flex-col gap-2 border-t border-gray-800 pt-2">
      {coins.map((coin) => {
        const {
          rank = 0,
          uuid = '',
          name = '',
          symbol = '',
          marketCap = '0',
          price = '0',
        } = coin;

        return (
          <div
            key={uuid}
            className="flex items-center justify-between gap-2 border-b border-gray-800 pb-2">
            <div>
              <p className="text-xs">
                {rank}. {symbol}
              </p>
              <h3
                title={name}
                className="w-32 truncate font-bold whitespace-nowrap md:w-64">
                {name}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-xs">
                ${parseFloat(marketCap).toLocaleString('en-US')}
              </p>
              <p
                title={price}
                className="w-32 truncate font-bold whitespace-nowrap md:w-64">
                ${parseFloat(price).toLocaleString('en-US')}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
