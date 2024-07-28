import { getLatest } from '@web/clients/forex/frankfurter/frankfurter.client';
import { Layout } from '@web/layout';
import { logger } from '@web/log';
import { GetStaticProps, NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

const convert = (
  rates: Record<string, number> = {},
  {
    fromValue,
    fromCurrency,
    toCurrency,
  }: { fromValue: number; fromCurrency: string; toCurrency: string } = {
    fromValue: 1,
    fromCurrency: 'EUR',
    toCurrency: 'USD',
  }
): number => {
  const toValue = parseFloat(
    ((fromValue * rates[toCurrency]) / rates[fromCurrency]).toFixed(2)
  );
  logger.info(
    'toValue',
    fromValue,
    rates[toCurrency],
    rates[fromCurrency],
    toValue
  );
  return toValue;
};

const ForexPage: NextPage<{ rates: Record<string, number> }> = ({
  rates = {},
}) => {
  const codes: string[] = Object.keys(rates);
  const [converter, setConverter] = useState({
    fromValue: 1,
    fromCurrency: 'EUR',
    toValue: convert(rates, {
      fromValue: 1,
      fromCurrency: 'EUR',
      toCurrency: 'USD',
    }),
    toCurrency: 'USD',
  });

  return (
    <Layout nav full>
      <div className='container mx-auto h-full'>
        <div className='h-full p-4 md:p-8'>
          <div className='flex h-full w-full items-center justify-center'>
            <div className='join join-vertical w-full md:join-horizontal'>
              <label
                htmlFor='fromValue'
                className='input join-item input-bordered flex w-full items-center gap-2'>
                <span>From</span>
                <input
                  id='fromValue'
                  name='fromValue'
                  placeholder='From Value'
                  className='grow'
                  value={converter.fromValue}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const newValue = parseFloat(event.target.value);
                    setConverter({
                      ...converter,
                      fromValue: newValue,
                      toValue: convert(rates, {
                        fromValue: newValue,
                        fromCurrency: converter.fromCurrency,
                        toCurrency: converter.toCurrency,
                      }),
                    });
                  }}
                />
              </label>
              <select
                name='fromCurrency'
                className='join-item select select-bordered'
                value={converter.fromCurrency}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  const newCurrency: string = event.target.value;
                  setConverter({
                    ...converter,
                    fromCurrency: newCurrency,
                    toValue: convert(rates, {
                      fromValue: converter.fromValue,
                      fromCurrency: newCurrency,
                      toCurrency: converter.toCurrency,
                    }),
                  });
                }}>
                <option disabled>From Currency</option>
                {codes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              <label
                htmlFor='toValue'
                className='input join-item input-bordered flex w-full items-center gap-2'>
                <span>To</span>
                <input
                  id='toValue'
                  name='toValue'
                  placeholder='To Value'
                  className='grow'
                  value={converter.toValue}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const newValue = parseFloat(event.target.value);
                    setConverter({
                      ...converter,
                      toValue: newValue,
                      fromValue: convert(rates, {
                        fromValue: newValue,
                        fromCurrency: converter.fromCurrency,
                        toCurrency: converter.toCurrency,
                      }),
                    });
                  }}
                />
              </label>
              <select
                name='toCurrency'
                className='join-item select select-bordered'
                value={converter.toCurrency}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  const newCurrency: string = event.target.value;
                  setConverter({
                    ...converter,
                    toCurrency: newCurrency,
                    toValue: convert(rates, {
                      fromValue: converter.fromValue,
                      fromCurrency: converter.fromCurrency,
                      toCurrency: newCurrency,
                    }),
                  });
                }}>
                <option disabled>From Currency</option>
                {codes.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<{
  rates: Record<string, number>;
}> = async () => {
  try {
    const { amount = 1, base = 'EUR', rates = {} } = await getLatest();
    rates[base] = amount;
    return { props: { rates } };
  } catch {
    return { props: { rates: {} } };
  }
};

export default ForexPage;
