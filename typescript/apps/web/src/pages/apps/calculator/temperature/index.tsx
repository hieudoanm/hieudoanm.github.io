import { Layout } from '@web/layout';
import { cf, ck, fc, fk, kc, kf } from '@web/utils/temperature/temperature';
import { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

type TemperatureUnit = 'celsius' | 'fahrenheit' | 'kelvin';

const TemperaturePage: NextPage = () => {
  const [temperature, setTemperature] = useState<
    Record<TemperatureUnit, number>
  >({
    celsius: 1,
    fahrenheit: cf(1),
    kelvin: ck(1),
  });

  return (
    <Layout nav full>
      <div className='container mx-auto h-full'>
        <div className='h-full p-4 md:p-8'>
          <div className='flex h-full items-center justify-center'>
            <div className='join join-vertical w-full lg:join-horizontal'>
              <label className='input join-item input-bordered flex w-full items-center gap-2'>
                <input
                  type='number'
                  name='celsius'
                  placeholder='Celsius'
                  min={1}
                  value={temperature.celsius}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const newCelsius: number = parseFloat(event.target.value);
                    setTemperature({
                      celsius: newCelsius,
                      fahrenheit: cf(newCelsius),
                      kelvin: ck(newCelsius),
                    });
                  }}
                  className='grow'
                />
                <span className='truncate'>°C (Celsius)</span>
              </label>
              <label className='input join-item input-bordered flex w-full items-center gap-2'>
                <input
                  type='number'
                  name='fahrenheit'
                  placeholder='fahrenheit'
                  min={1}
                  value={temperature.fahrenheit}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const newFahrenheit: number = parseFloat(
                      event.target.value
                    );
                    setTemperature({
                      celsius: fc(newFahrenheit),
                      fahrenheit: newFahrenheit,
                      kelvin: fk(newFahrenheit),
                    });
                  }}
                  className='grow'
                />
                <span className='truncate'>°F (Fahrenheit)</span>
              </label>
              <label className='input join-item input-bordered flex w-full items-center gap-2'>
                <input
                  type='number'
                  name='kelvin'
                  placeholder='kelvin'
                  min={1}
                  value={temperature.kelvin}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const newKelvin: number = parseFloat(event.target.value);
                    setTemperature({
                      celsius: kc(newKelvin),
                      fahrenheit: kf(newKelvin),
                      kelvin: newKelvin,
                    });
                  }}
                  className='grow'
                />
                <span className='truncate'>°K (Kelvin)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TemperaturePage;
