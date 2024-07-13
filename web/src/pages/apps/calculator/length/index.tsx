import { Layout } from '@web/layout';
import { ChangeEvent, useState } from 'react';

type Length = 'yard' | 'foot' | 'inch' | 'cm' | 'm' | 'km';

const lengthRates: Record<Length, number> = {
  yard: 1,
  foot: 3,
  inch: 36,
  cm: 91.44,
  m: 0.9144,
  km: 0.0009144,
};

const convert =
  (rates: Record<string, number>) =>
  (from: string, anount: number): Record<string, number> => {
    const tos: string[] = Object.keys(rates);
    const result: Record<string, number> = {} as Record<string, number>;
    for (const to of tos) {
      result[to] = parseFloat(((anount * rates[to]) / rates[from]).toFixed(2));
    }
    return result;
  };

const convertLength = convert(lengthRates);

const ConverterPage = () => {
  const [length, setLength] = useState<Record<Length, number>>(lengthRates);

  return (
    <Layout nav full>
      <div className='container mx-auto h-full'>
        <div className='h-full p-4 md:p-8'>
          <div className='flex h-full items-center justify-center'>
            <div className='flex flex-col gap-y-4 md:gap-y-8'>
              <div className='flex flex-col gap-y-4'>
                <span className='capitalize'>imperial</span>
                <div className='join join-vertical w-full lg:join-horizontal'>
                  <label className='input join-item input-bordered flex w-full items-center gap-2'>
                    <input
                      type='number'
                      name='yard'
                      placeholder='yard'
                      min={0}
                      value={length.yard}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const newYard: number = parseFloat(event.target.value);
                        setLength(convertLength('yard', newYard));
                      }}
                      className='grow'
                    />
                    <span>yard</span>
                  </label>
                  <label className='input join-item input-bordered flex w-full items-center gap-2'>
                    <input
                      type='number'
                      name='foot'
                      placeholder='foot'
                      min={0}
                      value={length.foot}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const newFoot: number = parseFloat(event.target.value);
                        setLength(convertLength('foot', newFoot));
                      }}
                      className='grow'
                    />
                    <span>foot</span>
                  </label>
                  <label className='input join-item input-bordered flex w-full items-center gap-2'>
                    <input
                      type='number'
                      name='inch'
                      placeholder='inch'
                      min={0}
                      value={length.inch}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const newInch: number = parseFloat(event.target.value);
                        setLength(convertLength('inch', newInch));
                      }}
                      className='grow'
                    />
                    <span>inch</span>
                  </label>
                </div>
              </div>
              <div className='flex flex-col gap-y-4'>
                <span className='capitalize'>metric</span>
                <div className='join join-vertical w-full lg:join-horizontal'>
                  <label className='input join-item input-bordered flex w-full items-center gap-2'>
                    <input
                      type='number'
                      name='cm'
                      placeholder='cm'
                      min={0}
                      value={length.cm}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const newCm: number = parseFloat(event.target.value);
                        setLength(convertLength('cm', newCm));
                      }}
                      className='grow'
                    />
                    <span>cm</span>
                  </label>
                  <label className='input join-item input-bordered flex w-full items-center gap-2'>
                    <input
                      type='number'
                      name='m'
                      placeholder='m'
                      min={0}
                      value={length.m}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const newM: number = parseFloat(event.target.value);
                        setLength(convertLength('m', newM));
                      }}
                      className='grow'
                    />
                    <span>m</span>
                  </label>
                  <label className='input join-item input-bordered flex w-full items-center gap-2'>
                    <input
                      type='number'
                      name='km'
                      placeholder='km'
                      min={0}
                      value={length.km}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const newKm: number = parseFloat(event.target.value);
                        setLength(convertLength('km', newKm));
                      }}
                      className='grow'
                    />
                    <span>km</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConverterPage;
