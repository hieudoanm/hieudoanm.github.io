import { Tag } from '@web/clients/coinranking/coinranking.client';
import { Coin } from '@web/clients/coinranking/coinranking.dto';
import { Layout } from '@web/layout';
import { QueryTemplate } from '@web/templates/QueryTemplate';
import { formatCurrency } from '@web/utils/number/number';
import { trpc } from '@web/utils/trpc';
import { FC } from 'react';

export const CryptoQuery: FC<{ tag: Tag }> = ({ tag }) => {
  const {
    isPending,
    error,
    data: coins,
  } = trpc.crypto.useQuery({ tag: Tag.LAYER_1 });

  return (
    <QueryTemplate
      isPending={isPending}
      error={error}
      noData={!coins || coins.length === 0}>
      <CryptoTemplate coins={coins} />;
    </QueryTemplate>
  );
};

export const CryptoTemplate: FC<{ coins?: Coin[] }> = ({ coins = [] }) => {
  return (
    <Layout nav>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='flex flex-col gap-y-4'>
            {coins.map(({ uuid, name, price, change, iconUrl }: Coin) => {
              const floatPrice: number = parseFloat(price);
              const floatChange: number = parseFloat(change);
              const changeColor = floatChange >= 0 ? 'green' : 'red';

              return (
                <div key={uuid}>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-2'>
                      {iconUrl ? (
                        <img src={iconUrl} alt={name} className='h-8 w-8' />
                      ) : (
                        <></>
                      )}
                      {name}
                    </div>
                    <div className='flex items-center gap-x-2'>
                      <p className='w-32 truncate text-right'>
                        {formatCurrency(floatPrice, 'USD')}
                      </p>
                      <p
                        className={`w-16 truncate text-right text-${changeColor}-500`}>
                        {floatChange}%
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};
