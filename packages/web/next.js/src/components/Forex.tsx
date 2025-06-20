import { useQuery } from '@tanstack/react-query';
import { formatCurrency } from '@web/utils/number/utils';
import { tryCatch } from '@web/utils/try-catch';

type Frankfurter = {
  amount: number;
  base: string;
  date: string;
  rates: Record<string, number>;
};

export const Forex = () => {
  const url = 'https://api.frankfurter.dev/v1/latest';
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('url', url);
  const proxyUrl = `https://hieudoanm-reverse-proxy.vercel.app/api?${urlSearchParams.toString()}`;
  const { isPending, error, data } = useQuery<Frankfurter>({
    queryKey: [`coin-ranking`],
    queryFn: async () => {
      const { error, data } = await tryCatch(
        fetch(proxyUrl).then((response) => response.json())
      );
      if (error) return {};
      return data;
    },
  });

  if (isPending) return <p className="text-center">Loading</p>;

  if (error) return <p className="text-center">{error.message}</p>;

  if (JSON.stringify(data) === '{}')
    return <p className="text-center">No Data</p>;

  const {
    amount = 1,
    base = '',
    rates = {},
  } = data ?? { amount: 1, base: '', rates: {} };

  return (
    <div className="flex flex-col gap-2 border-t border-neutral-800 pt-2">
      {Object.entries(rates).map(([key, value]) => {
        return (
          <div
            key={key}
            className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-2">
            <span className="text-sm">
              {amount} {base} to {key}
            </span>
            <span className="text-sm">{formatCurrency(value, key)}</span>
          </div>
        );
      })}
    </div>
  );
};
