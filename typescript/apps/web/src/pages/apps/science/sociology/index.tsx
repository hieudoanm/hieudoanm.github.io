import countries from '@web/json/hofstede.json';
import { Layout } from '@web/layout';
import {
  Chart,
  ChartData,
  ChartDataset,
  ChartOptions,
  registerables,
} from 'chart.js';
import { NextPage } from 'next';
import { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { FaSquarePlus } from 'react-icons/fa6';

const TEXT_GREEN = 'text-green-500';
const TEXT_RED = 'text-red-500';

Chart.register(...registerables);

type Country = {
  id: number;
  country: string;
  powerDistance: number;
  individualism: number;
  masculinity: number;
  uncertaintyAvoidance: number;
  longTermOrientation: number;
  indulgence: number;
};

const defaultCountry: Country = {
  id: 537,
  country: 'Vietnam',
  powerDistance: 70,
  individualism: 20,
  masculinity: 40,
  uncertaintyAvoidance: 30,
  longTermOrientation: 57,
  indulgence: 35,
};

const labels = [
  'Power Distance',
  'Individualism',
  'Masculinity',
  'Uncertainty Avoidance',
  'Long Term Orientation',
  'Indulgence',
];

const COLORS = ['#1E3888', '#47A8BD', '#F5E663', '#FFAD69', '#9C3848'];

const personalDataset: ChartDataset<'bar', number[]> = {
  data: [],
  label: 'You',
  borderRadius: 50,
  backgroundColor: COLORS[0],
  barPercentage: 0.3,
  categoryPercentage: 0.5,
};

const countryDataset: ChartDataset<'bar', number[]> = {
  data: [],
  label: 'Country',
  borderRadius: 50,
  backgroundColor: COLORS[1],
  barPercentage: 0.3,
  categoryPercentage: 0.5,
};

const barChartOptions: ChartOptions<'bar'> = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      align: 'center',
      labels: {
        boxWidth: 7,
        usePointStyle: true,
        pointStyle: 'circle',
      },
      title: {
        text: 'Comparison',
        display: true,
        color: '#000',
        font: { size: 18 },
      },
    },
  },
  scales: {
    y: { beginAtZero: true, max: 100 },
  },
};

type Scales = {
  powerDistance: number;
  individualism: number;
  masculinity: number;
  uncertaintyAvoidance: number;
  longTermOrientation: number;
  indulgence: number;
};

type Ranking = {
  country: string;
  powerDistance: number;
  individualism: number;
  masculinity: number;
  uncertaintyAvoidance: number;
  longTermOrientation: number;
  indulgence: number;
  pdiDiff: string | number;
  idvDiff: string | number;
  masDiff: string | number;
  uaiDiff: string | number;
  ltoDiff: string | number;
  indDiff: string | number;
  avgDiff: string | number;
};

const processRankings = (scales: Scales): Ranking[] => {
  return countries
    .map(
      ({
        country,
        powerDistance,
        individualism,
        masculinity,
        uncertaintyAvoidance,
        longTermOrientation,
        indulgence,
      }) => {
        const pdiDiff =
          powerDistance === -1 ? 'N/A' : powerDistance - scales.powerDistance;
        const idvDiff =
          individualism === -1 ? 'N/A' : individualism - scales.individualism;
        const masDiff =
          masculinity === -1 ? 'N/A' : masculinity - scales.masculinity;
        const uaiDiff =
          uncertaintyAvoidance === -1
            ? 'N/A'
            : uncertaintyAvoidance - scales.uncertaintyAvoidance;
        const ltoDiff =
          longTermOrientation === -1
            ? 'N/A'
            : longTermOrientation - scales.longTermOrientation;
        const indDiff =
          indulgence === -1 ? 'N/A' : indulgence - scales.indulgence;

        const allDiff: number[] = [
          pdiDiff,
          idvDiff,
          masDiff,
          uaiDiff,
          ltoDiff,
          indDiff,
        ].filter((number) => number !== 'N/A') as number[];

        const avgDiff = Number.parseFloat(
          (
            allDiff.reduce((a, b) => Math.abs(a) + Math.abs(b), 0) /
            allDiff.length
          ).toFixed(2)
        );

        return {
          country,
          powerDistance,
          individualism,
          masculinity,
          uncertaintyAvoidance,
          longTermOrientation,
          indulgence,
          pdiDiff,
          idvDiff,
          masDiff,
          uaiDiff,
          ltoDiff,
          indDiff,
          avgDiff,
        };
      }
    )
    .sort((a, b) => {
      return a.avgDiff > b.avgDiff ? 1 : -1;
    });
};

export const Table: FC<{ rankings: Ranking[] }> = ({ rankings = [] }) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          <td>No</td>
          <td>Country</td>
          <td>Power Distance</td>
          <td>Individualism</td>
          <td>Masculinity</td>
          <td>Uncertainty Avoidance</td>
          <td>Long Term Orientation</td>
          <td>Indulgence</td>
          <td>Difference</td>
        </tr>
      </thead>
      <tbody>
        {rankings.map((ranking, index: number) => {
          return (
            <tr key={ranking.country}>
              <td>{index + 1}</td>
              <td>{ranking.country}</td>
              <td>
                {ranking.powerDistance}{' '}
                <span
                  className={
                    typeof ranking.pdiDiff === 'number' && ranking.pdiDiff >= 0
                      ? TEXT_GREEN
                      : TEXT_RED
                  }>
                  ({ranking.pdiDiff})
                </span>
              </td>
              <td>
                {ranking.individualism}{' '}
                <span
                  className={
                    typeof ranking.idvDiff === 'number' && ranking.idvDiff >= 0
                      ? TEXT_GREEN
                      : TEXT_RED
                  }>
                  ({ranking.idvDiff})
                </span>
              </td>
              <td>
                {ranking.masculinity}{' '}
                <span
                  className={
                    typeof ranking.masDiff === 'number' && ranking.masDiff >= 0
                      ? TEXT_GREEN
                      : TEXT_RED
                  }>
                  ({ranking.masDiff})
                </span>
              </td>
              <td>
                {ranking.uncertaintyAvoidance}{' '}
                <span
                  className={
                    typeof ranking.uaiDiff === 'number' && ranking.uaiDiff >= 0
                      ? TEXT_GREEN
                      : TEXT_RED
                  }>
                  ({ranking.uaiDiff})
                </span>
              </td>
              <td>
                {ranking.longTermOrientation}{' '}
                <span
                  className={
                    typeof ranking.ltoDiff === 'number' && ranking.ltoDiff >= 0
                      ? TEXT_GREEN
                      : TEXT_RED
                  }>
                  ({ranking.ltoDiff})
                </span>
              </td>
              <td>
                {ranking.indulgence}{' '}
                <span
                  className={
                    typeof ranking.indDiff === 'number' && ranking.indDiff >= 0
                      ? TEXT_GREEN
                      : TEXT_RED
                  }>
                  ({ranking.indDiff})
                </span>
              </td>
              <td>{ranking.avgDiff}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const HofstedePage: NextPage = () => {
  const [countryId, setCountryId] = useState<number>(537);
  const [countryIds, setCountryIds] = useState<number[]>([537]);
  const [scales, setScales] = useState<Scales>({
    powerDistance: defaultCountry.powerDistance,
    individualism: defaultCountry.individualism,
    masculinity: defaultCountry.masculinity,
    uncertaintyAvoidance: defaultCountry.uncertaintyAvoidance,
    longTermOrientation: defaultCountry.longTermOrientation,
    indulgence: defaultCountry.indulgence,
  });

  const [data, setData] = useState<{
    chart: ChartData<'bar', number[], string>;
    rankings: Ranking[];
  }>({ chart: { datasets: [] }, rankings: [] });

  const onChange = useCallback(
    (newCountryIds: string | number[]) => {
      let selectedCountryIds = newCountryIds;
      if (typeof newCountryIds === 'string') {
        selectedCountryIds = newCountryIds
          .split(',')
          .map((value) => Number.parseInt(value, 10));
      }
      const selectedCountries: Country[] = countries.filter((country) =>
        (selectedCountryIds as number[]).includes(country.id)
      );

      const rankings = processRankings(scales);
      const newDatasets = [
        {
          ...personalDataset,
          data: [
            scales.powerDistance,
            scales.individualism,
            scales.masculinity,
            scales.uncertaintyAvoidance,
            scales.longTermOrientation,
            scales.indulgence,
          ],
        },
      ];

      const total = selectedCountries.length > 4 ? 4 : selectedCountries.length;

      for (let index = 0; index < total; index++) {
        const country = selectedCountries[`${index}`];
        const data = [
          country?.powerDistance || 0,
          country?.individualism || 0,
          country?.masculinity || 0,
          country?.uncertaintyAvoidance || 0,
          country?.longTermOrientation || 0,
          country?.indulgence || 0,
        ];

        const backgroundColor = COLORS[index + 1];
        newDatasets.push({
          ...countryDataset,
          backgroundColor,
          label: country?.country || 'Country',
          data,
        });
      }

      setData({ chart: { labels, datasets: newDatasets }, rankings });
    },
    [scales]
  );

  useEffect(() => {
    onChange(countryIds);
  }, [countryIds, onChange]);

  return (
    <Layout nav>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='flex flex-col gap-y-8'>
            <section>
              <form
                onSubmit={(event: FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  onChange(countryIds);
                }}>
                <div className='mb-8 flex flex-col gap-y-2'>
                  <label htmlFor='country-select' id='country-select-label'>
                    Country
                  </label>
                  <div className='join w-full'>
                    <select
                      id='country-select'
                      value={countryId}
                      className='join-item select select-bordered w-full'
                      onChange={(event) => {
                        const newCountryId: number = Number.parseInt(
                          event.target.value
                        );
                        setCountryId(newCountryId);
                      }}>
                      {countries.map((country) => {
                        return (
                          <option key={country.id} value={country.id}>
                            {country.country}
                          </option>
                        );
                      })}
                    </select>
                    <button
                      className='btn btn-outline join-item'
                      aria-label='Choose Country'
                      type='button'
                      onClick={(event) => {
                        event.preventDefault();
                        setCountryIds((previous) => {
                          previous.push(countryId);
                          const newCountryIds: number[] = [
                            ...new Set(previous),
                          ];
                          return newCountryIds;
                        });
                      }}>
                      <FaSquarePlus />
                    </button>
                  </div>
                </div>
                <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3'>
                  <div className='col-span-1'>
                    <p>Power Distance ({scales.powerDistance})</p>
                    <input
                      type='range'
                      aria-label='Power Distance'
                      step={1}
                      min={0}
                      max={100}
                      value={scales.powerDistance}
                      className='range'
                      onChange={(event) => {
                        const newValue: string = event?.target.value;
                        setScales({
                          ...scales,
                          powerDistance: parseFloat(newValue),
                        });
                        onChange(countryIds);
                      }}
                    />
                  </div>
                  <div className='col-span-1'>
                    <p>Individualism ({scales.individualism})</p>
                    <input
                      type='range'
                      aria-label='Individualism'
                      className='range'
                      step={1}
                      min={0}
                      max={100}
                      value={scales.individualism}
                      onChange={(event) => {
                        const newValue: string = event?.target.value;
                        setScales({
                          ...scales,
                          individualism: parseFloat(newValue),
                        });
                        onChange(countryIds);
                      }}
                    />
                  </div>
                  <div className='col-span-1'>
                    <p>Masculinity ({scales.masculinity})</p>
                    <input
                      type='range'
                      aria-label='Masculinity'
                      className='range'
                      step={1}
                      min={0}
                      max={100}
                      value={scales.masculinity}
                      onChange={(event) => {
                        const newValue: string = event?.target.value;
                        setScales({
                          ...scales,
                          masculinity: parseFloat(newValue),
                        });
                        onChange(countryIds);
                      }}
                    />
                  </div>
                  <div className='col-span-1'>
                    <p>Uncertainty Avoidance ({scales.uncertaintyAvoidance})</p>
                    <input
                      type='range'
                      aria-label='Uncertainty Avoidance'
                      className='range'
                      step={1}
                      min={0}
                      max={100}
                      value={scales.uncertaintyAvoidance}
                      onChange={(event) => {
                        const newValue: string = event?.target.value;
                        setScales({
                          ...scales,
                          uncertaintyAvoidance: parseFloat(newValue),
                        });
                        onChange(countryIds);
                      }}
                    />
                  </div>
                  <div className='col-span-1'>
                    <p>Long Term Orientation ({scales.longTermOrientation})</p>
                    <input
                      type='range'
                      aria-label='Long-term Orientation'
                      className='range'
                      step={1}
                      min={0}
                      max={100}
                      value={scales.longTermOrientation}
                      onChange={(event) => {
                        const newValue: string = event?.target.value;
                        setScales({
                          ...scales,
                          longTermOrientation: parseFloat(newValue),
                        });
                        onChange(countryIds);
                      }}
                    />
                  </div>
                  <div className='col-span-1'>
                    <p>Indulgence ({scales.indulgence})</p>
                    <input
                      type='range'
                      aria-label='Indulgence'
                      className='range'
                      step={1}
                      min={0}
                      max={100}
                      value={scales.indulgence}
                      onChange={(event) => {
                        const newValue: string = event?.target.value;
                        setScales({
                          ...scales,
                          indulgence: parseFloat(newValue),
                        });
                        onChange(countryIds);
                      }}
                    />
                  </div>
                </div>
              </form>
            </section>
            <section className='rounded border border-primary-content p-4'>
              {data.chart === null ? (
                <></>
              ) : (
                <Bar data={data.chart} height={300} options={barChartOptions} />
              )}
            </section>
            <section className='overflow-auto rounded'>
              <Table rankings={data.rankings} />
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HofstedePage;
