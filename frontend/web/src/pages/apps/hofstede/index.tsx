import { PlusSquareIcon } from '@chakra-ui/icons';
import {
  Badge,
  Card,
  FormControl,
  FormLabel,
  IconButton,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Container from '@hieudoanm/components/Container';
import countries from '@hieudoanm/json/hofstede.json';
import {
  Chart as ChartJS,
  ChartData,
  ChartDataset,
  ChartOptions,
  registerables,
} from 'chart.js';
import Head from 'next/head';
import React, { FormEvent, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const TEXT_GREEN = 'text-green-500';
const TEXT_RED = 'text-red-500';

ChartJS.register(...registerables);

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

const HomePage: React.FC = () => {
  const year = new Date().getFullYear();

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

  useEffect(() => {
    onChange(countryIds);
  }, [countryIds]);

  const onChange = (newCountryIds: string | number[]) => {
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
      const backgroundColor = COLORS[index + 1];
      newDatasets.push({
        ...countryDataset,
        backgroundColor,
        label: country?.country || 'Country',
        data: [
          country?.powerDistance || 0,
          country?.individualism || 0,
          country?.masculinity || 0,
          country?.uncertaintyAvoidance || 0,
          country?.longTermOrientation || 0,
          country?.indulgence || 0,
        ],
      });
    }

    setData({
      chart: {
        labels,
        datasets: newDatasets,
      },
      rankings,
    });
  };

  return (
    <>
      <Head>
        <title>Hofstede</title>
      </Head>
      <div className='flex min-h-screen flex-col'>
        <nav className='border-b'>
          <Container>
            <div className='py-4'>
              <h1 className='text-xl font-bold uppercase'>Hofstede</h1>
            </div>
          </Container>
        </nav>
        <main className='grow'>
          <Container>
            <div className='py-8'>
              <Card className='border'>
                <div className='p-8'>
                  <form
                    onSubmit={(event: FormEvent<HTMLFormElement>) => {
                      event.preventDefault();
                      onChange(countryIds);
                    }}>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                      <div className='col-span-full'>
                        <FormControl className='w-full'>
                          <FormLabel id='country-select-label'>
                            Country
                          </FormLabel>
                          <div className='flex gap-x-4'>
                            <Select
                              id='country-select'
                              value={countryId}
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
                            </Select>
                            <IconButton
                              colorScheme='teal'
                              aria-label='Choose Country'
                              icon={<PlusSquareIcon />}
                              onClick={(event) => {
                                event.preventDefault();
                                setCountryIds((previous) => {
                                  previous.push(countryId);
                                  const newCountryIds: number[] = [
                                    ...new Set(previous),
                                  ];
                                  return newCountryIds;
                                });
                              }}
                            />
                          </div>
                          <div className='flex gap-x-2 pt-2'>
                            {countryIds.map((countryIdOption: number) => {
                              return (
                                <Badge key={countryIdOption} colorScheme='teal'>
                                  {countryIdOption}
                                </Badge>
                              );
                            })}
                          </div>
                        </FormControl>
                      </div>
                      <div className='col-span-1'>
                        <Text>Power Distance ({scales.powerDistance})</Text>
                        <Slider
                          aria-label='Power Distance'
                          step={1}
                          min={0}
                          max={100}
                          value={scales.powerDistance}
                          onChange={(newValue: number) => {
                            setScales({
                              ...scales,
                              powerDistance: newValue,
                            });
                            onChange(countryIds);
                          }}>
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                      </div>
                      <div className='col-span-1'>
                        <Text>Individualism ({scales.individualism})</Text>
                        <Slider
                          aria-label='Individualism'
                          step={1}
                          min={0}
                          max={100}
                          value={scales.individualism}
                          onChange={(newValue: number) => {
                            setScales({
                              ...scales,
                              individualism: newValue,
                            });
                            onChange(countryIds);
                          }}>
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                      </div>
                      <div className='col-span-1'>
                        <Text>Masculinity ({scales.masculinity})</Text>
                        <Slider
                          aria-label='Masculinity'
                          step={1}
                          min={0}
                          max={100}
                          value={scales.masculinity}
                          onChange={(newValue: number) => {
                            setScales({
                              ...scales,
                              masculinity: newValue,
                            });
                            onChange(countryIds);
                          }}>
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                      </div>
                      <div className='col-span-1'>
                        <Text>
                          Uncertainty Avoidance ({scales.uncertaintyAvoidance})
                        </Text>
                        <Slider
                          aria-label='Uncertainty Avoidance'
                          step={1}
                          min={0}
                          max={100}
                          value={scales.uncertaintyAvoidance}
                          onChange={(newValue: number) => {
                            setScales({
                              ...scales,
                              uncertaintyAvoidance: newValue,
                            });
                            onChange(countryIds);
                          }}>
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                      </div>
                      <div className='col-span-1'>
                        <Text>
                          Long Term Orientation ({scales.longTermOrientation})
                        </Text>
                        <Slider
                          aria-label='Long-term Orientation'
                          step={1}
                          min={0}
                          max={100}
                          value={scales.longTermOrientation}
                          onChange={(newValue: number) => {
                            setScales({
                              ...scales,
                              longTermOrientation: newValue,
                            });
                            onChange(countryIds);
                          }}>
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                      </div>
                      <div className='col-span-1'>
                        <Text>Indulgence ({scales.indulgence})</Text>
                        <Slider
                          aria-label='Indulgence'
                          step={1}
                          min={0}
                          max={100}
                          value={scales.indulgence}
                          onChange={(newValue: number) => {
                            setScales({
                              ...scales,
                              indulgence: newValue,
                            });
                            onChange(countryIds);
                          }}>
                          <SliderTrack>
                            <SliderFilledTrack />
                          </SliderTrack>
                          <SliderThumb />
                        </Slider>
                      </div>
                    </div>
                  </form>
                  <div className='py-8'>
                    {data.chart === null ? (
                      <></>
                    ) : (
                      <Bar
                        data={data.chart}
                        height={300}
                        options={barChartOptions}
                      />
                    )}
                  </div>
                  <TableContainer className='rounded border'>
                    <Table>
                      <Thead>
                        <Tr>
                          <Td>No</Td>
                          <Td>Country</Td>
                          <Td>Power Distance</Td>
                          <Td>Individualism</Td>
                          <Td>Masculinity</Td>
                          <Td>Uncertainty Avoidance</Td>
                          <Td>Long Term Orientation</Td>
                          <Td>Indulgence</Td>
                          <Td>Difference</Td>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {data.rankings.map((ranking, index: number) => {
                          return (
                            <Tr key={ranking.country}>
                              <Td>{index + 1}</Td>
                              <Td>{ranking.country}</Td>
                              <Td>
                                {ranking.powerDistance}{' '}
                                <span
                                  className={
                                    typeof ranking.pdiDiff === 'number' &&
                                    ranking.pdiDiff >= 0
                                      ? TEXT_GREEN
                                      : TEXT_RED
                                  }>
                                  ({ranking.pdiDiff})
                                </span>
                              </Td>
                              <Td>
                                {ranking.individualism}{' '}
                                <span
                                  className={
                                    typeof ranking.idvDiff === 'number' &&
                                    ranking.idvDiff >= 0
                                      ? TEXT_GREEN
                                      : TEXT_RED
                                  }>
                                  ({ranking.idvDiff})
                                </span>
                              </Td>
                              <Td>
                                {ranking.masculinity}{' '}
                                <span
                                  className={
                                    typeof ranking.masDiff === 'number' &&
                                    ranking.masDiff >= 0
                                      ? TEXT_GREEN
                                      : TEXT_RED
                                  }>
                                  ({ranking.masDiff})
                                </span>
                              </Td>
                              <Td>
                                {ranking.uncertaintyAvoidance}{' '}
                                <span
                                  className={
                                    typeof ranking.uaiDiff === 'number' &&
                                    ranking.uaiDiff >= 0
                                      ? TEXT_GREEN
                                      : TEXT_RED
                                  }>
                                  ({ranking.uaiDiff})
                                </span>
                              </Td>
                              <Td>
                                {ranking.longTermOrientation}{' '}
                                <span
                                  className={
                                    typeof ranking.ltoDiff === 'number' &&
                                    ranking.ltoDiff >= 0
                                      ? TEXT_GREEN
                                      : TEXT_RED
                                  }>
                                  ({ranking.ltoDiff})
                                </span>
                              </Td>
                              <Td>
                                {ranking.indulgence}{' '}
                                <span
                                  className={
                                    typeof ranking.indDiff === 'number' &&
                                    ranking.indDiff >= 0
                                      ? TEXT_GREEN
                                      : TEXT_RED
                                  }>
                                  ({ranking.indDiff})
                                </span>
                              </Td>
                              <Td>{ranking.avgDiff}</Td>
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </div>
              </Card>
            </div>
          </Container>
        </main>
        <footer className='border-t'>
          <Container>
            <div className='py-4'>
              <h1 className='uppercase text-gray-700'>
                &copy; {year} Hofstede
              </h1>
            </div>
          </Container>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
