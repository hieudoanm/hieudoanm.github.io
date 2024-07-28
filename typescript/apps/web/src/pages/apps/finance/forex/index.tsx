import { getLatest } from '@web/clients/forex/frankfurter/frankfurter.client';
import { useIsOnline } from '@web/hooks/use-is-online';
import currencies from '@web/json/currencies.json';
import { Layout } from '@web/layout';
import { logger } from '@web/log';
import { formatCurrency } from '@web/utils/number/number';
import { trpc } from '@web/utils/trpc';
import type { GetStaticProps, NextPage } from 'next';
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';

const DEFAULT_AMOUNT: number = 1;
const DEFAULT_BASE: string = 'EUR';

const TOP: string[] = ['AUD', 'EUR', 'GBP', 'JPY', 'USD'];
const AMERICA: string[] = ['BRL', 'CAD', 'MXN'];
const EUROPE: string[] = ['BGN', 'CHF', 'CZK', 'HUF', 'PLN', 'RON', 'TRY'];
const EUROPE_NORDIC: string[] = ['DKK', 'ISK', 'NOK', 'SEK'];
const EAST_ASIA: string[] = ['CNY', 'HKD', 'KRW'];
const SOUTH_EAST_ASIA: string[] = ['IDR', 'MYR', 'PHP', 'SGD', 'THB'];

type ForexOptions = { amount: number; base: string };

const ListItem: FC<{
  code: string;
  amount: number;
  base: string;
  baseAmount: number;
  rates: Record<string, number>;
}> = ({ code, amount, base, baseAmount, rates }) => {
  logger.info(amount);
  const fromRate: number = rates[base] ?? baseAmount;
  const toRate: number = rates[code];
  return (
    <div className='flex items-center justify-between gap-y-4 border-t border-base-content px-8 py-4 md:gap-y-8'>
      <p className='text-sm md:text-base'>
        {code} - {(currencies as Record<string, string>)[code]}
      </p>
      <p className='text-sm md:text-base'>
        {formatCurrency((amount * toRate) / fromRate, code)}
      </p>
    </div>
  );
};

const List: FC<{
  forexOptions: ForexOptions;
  baseAmount: number;
  codes: string[];
  rates: Record<string, number>;
  title: string;
}> = ({
  forexOptions = { amount: DEFAULT_AMOUNT, base: DEFAULT_BASE },
  codes = [],
  baseAmount = DEFAULT_AMOUNT,
  rates = {},
  title = '',
}) => {
  return (
    <div className='rounded-xl border border-base-content'>
      <div className='flex items-center justify-between border-base-content px-8 py-4'>
        <p>
          {title} ({codes.length})
        </p>
        <p>Rate</p>
      </div>
      {codes.map((code: string) => (
        <ListItem
          key={code}
          code={code}
          amount={
            Number.isNaN(forexOptions.amount)
              ? DEFAULT_AMOUNT
              : forexOptions.amount
          }
          base={forexOptions.base ?? DEFAULT_BASE}
          baseAmount={baseAmount ?? DEFAULT_AMOUNT}
          rates={rates}
        />
      ))}
    </div>
  );
};

const ForexOptionsBlock: FC<{
  codes: string[];
  forexOptions: ForexOptions;
  setForexOptions: Dispatch<SetStateAction<ForexOptions>>;
}> = ({ codes = [], forexOptions, setForexOptions }) => {
  return (
    <div className='join w-full'>
      <select
        id='base'
        name='base'
        className='join-item select select-bordered w-full'
        value={forexOptions.base}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          setForexOptions({ ...forexOptions, base: event.target.value })
        }>
        <optgroup label='Base'>
          <option value={forexOptions.base}>
            {forexOptions.base} -{' '}
            {(currencies as Record<string, string>)[forexOptions.base]}
          </option>
        </optgroup>
        <optgroup label='Top'>
          {codes
            .filter((code: string) => TOP.includes(code))
            .map((code: string) => {
              return (
                <option key={code} value={code}>
                  {code} - {(currencies as Record<string, string>)[code]}
                </option>
              );
            })}
        </optgroup>
        <optgroup label='America'>
          {codes
            .filter((code: string) => AMERICA.includes(code))
            .map((code: string) => {
              return (
                <option key={code} value={code}>
                  {code} - {(currencies as Record<string, string>)[code]}
                </option>
              );
            })}
        </optgroup>
        <optgroup label='Europe'>
          {codes
            .filter((code: string) => EUROPE.includes(code))
            .map((code: string) => {
              return (
                <option key={code} value={code}>
                  {code} - {(currencies as Record<string, string>)[code]}
                </option>
              );
            })}
        </optgroup>
        <optgroup label='Europe - Nordic'>
          {codes
            .filter((code: string) => EUROPE_NORDIC.includes(code))
            .map((code: string) => {
              return (
                <option key={code} value={code}>
                  {code} - {(currencies as Record<string, string>)[code]}
                </option>
              );
            })}
        </optgroup>
        <optgroup label='Southest Asia'>
          {codes
            .filter((code: string) => SOUTH_EAST_ASIA.includes(code))
            .map((code: string) => {
              return (
                <option key={code} value={code}>
                  {code} - {(currencies as Record<string, string>)[code]}
                </option>
              );
            })}
        </optgroup>
        <optgroup label='East Asia'>
          {codes
            .filter((code: string) => EAST_ASIA.includes(code))
            .map((code: string) => {
              return (
                <option key={code} value={code}>
                  {code} - {(currencies as Record<string, string>)[code]}
                </option>
              );
            })}
        </optgroup>
        <optgroup label='Other'>
          {codes
            .filter(
              (code: string) =>
                !AMERICA.includes(code) &&
                !EUROPE.includes(code) &&
                !SOUTH_EAST_ASIA.includes(code) &&
                !EAST_ASIA.includes(code) &&
                !TOP.includes(code)
            )
            .map((code: string) => {
              return (
                <option key={code} value={code}>
                  {code} - {(currencies as Record<string, string>)[code]}
                </option>
              );
            })}
        </optgroup>
      </select>
      <input
        type='number'
        id='amount'
        name='amount'
        placeholder='Amount'
        className='input join-item input-bordered w-full'
        min={0}
        value={forexOptions.amount}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const newValue: string = event.target.value;

          setForexOptions({
            ...forexOptions,
            amount: parseInt(newValue, 10),
          });
        }}
      />
    </div>
  );
};

const ForexTemplate: FC<{
  baseAmount: number;
  codes: string[];
  forexOptions: ForexOptions;
  rates: Record<string, number>;
  setForexOptions: Dispatch<SetStateAction<ForexOptions>>;
}> = ({ forexOptions, baseAmount, rates, codes, setForexOptions }) => {
  return (
    <Layout nav>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='flex flex-col gap-y-8'>
            <ForexOptionsBlock
              codes={codes}
              forexOptions={forexOptions}
              setForexOptions={setForexOptions}
            />

            <List
              title='Top'
              forexOptions={forexOptions}
              baseAmount={baseAmount}
              rates={rates}
              codes={codes.filter((code: string) => TOP.includes(code))}
            />
            <List
              title='America'
              forexOptions={forexOptions}
              baseAmount={baseAmount}
              rates={rates}
              codes={codes.filter((code: string) => AMERICA.includes(code))}
            />
            <List
              title='Europe'
              forexOptions={forexOptions}
              baseAmount={baseAmount}
              rates={rates}
              codes={codes.filter((code: string) => EUROPE.includes(code))}
            />
            <List
              title='Europe - Nordic'
              forexOptions={forexOptions}
              baseAmount={baseAmount}
              rates={rates}
              codes={codes.filter((code: string) =>
                EUROPE_NORDIC.includes(code)
              )}
            />
            <List
              title='East Asia'
              forexOptions={forexOptions}
              baseAmount={baseAmount}
              rates={rates}
              codes={codes.filter((code: string) => EAST_ASIA.includes(code))}
            />
            <List
              title='Southeast Asia'
              forexOptions={forexOptions}
              baseAmount={baseAmount}
              rates={rates}
              codes={codes.filter((code: string) =>
                SOUTH_EAST_ASIA.includes(code)
              )}
            />
            <List
              title='Other'
              forexOptions={forexOptions}
              baseAmount={baseAmount}
              rates={rates}
              codes={codes.filter(
                (code: string) =>
                  !AMERICA.includes(code) &&
                  !EUROPE.includes(code) &&
                  !SOUTH_EAST_ASIA.includes(code) &&
                  !EAST_ASIA.includes(code) &&
                  !EUROPE_NORDIC.includes(code) &&
                  !TOP.includes(code)
              )}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const ForexQuery: FC<{
  forexOptions: ForexOptions;
  setForexOptions: Dispatch<SetStateAction<ForexOptions>>;
}> = ({ forexOptions, setForexOptions }) => {
  const { isPending, error, data } = trpc.forex.useQuery({
    amount: 1,
    base: 'EUR',
  });

  if (isPending) {
    return (
      <Layout full nav>
        <div className='flex h-full items-center justify-center'>
          <div className='text-center text-xl uppercase'>
            <span className='loading loading-infinity loading-lg'></span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout full nav>
        <div className='flex h-full items-center justify-center'>
          <div className='text-center text-xl uppercase'>
            {error?.message ?? 'Error'}
          </div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout full nav>
        <div className='flex h-full items-center justify-center'>
          <div className='text-center text-xl'>No Data</div>
        </div>
      </Layout>
    );
  }

  const { amount: baseAmount = DEFAULT_AMOUNT, rates = {} } = data;
  const codes: string[] = Object.keys(rates);

  return (
    <ForexTemplate
      baseAmount={baseAmount}
      codes={codes}
      forexOptions={forexOptions}
      rates={rates}
      setForexOptions={setForexOptions}
    />
  );
};

const ForexPage: NextPage<{ rates: Record<string, number> }> = ({ rates }) => {
  const isOnline: boolean = useIsOnline();

  const [forexOptions, setForexOptions] = useState<{
    amount: number;
    base: string;
  }>({
    amount: DEFAULT_AMOUNT,
    base: DEFAULT_BASE,
  });

  const codes: string[] = Object.keys(rates);

  if (!isOnline) {
    return (
      <ForexTemplate
        baseAmount={1}
        codes={codes}
        forexOptions={forexOptions}
        rates={rates}
        setForexOptions={setForexOptions}
      />
    );
  }

  return (
    <ForexQuery forexOptions={forexOptions} setForexOptions={setForexOptions} />
  );
};

export const getStaticProps: GetStaticProps<{
  rates: Record<string, number>;
}> = async () => {
  try {
    const { rates } = await getLatest();
    return { props: { rates } };
  } catch {
    return { props: { rates: {} } };
  }
};

export default ForexPage;
