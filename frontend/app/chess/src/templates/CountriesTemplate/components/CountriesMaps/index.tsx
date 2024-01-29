'use client';

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import maps from '@chess/common/json/world.json';
import { SVGMaps } from '@chess/components/atoms/Maps';
import chroma from 'chroma-js';
import { useRouter } from 'next/navigation';
import { Country } from '../..';

export type CountriesMapsProperties = { countries: Country[] };

export const CountriesMaps: React.FC<CountriesMapsProperties> = ({
  countries = [],
}) => {
  const router = useRouter();

  const gap = 50;
  const numberOfTitlePlayers: number[] = countries
    .map(({ count }) => count)
    .filter((count: number) => count < 1000);
  const min: number = Math.round(Math.min(...numberOfTitlePlayers) / gap) * gap;
  const max: number = Math.ceil(Math.max(...numberOfTitlePlayers) / gap) * gap;
  const range: number[] = Array.from({ length: (max - min) / gap }).map(
    (_value: unknown, index: number) => min + index * gap
  );
  const minColor: string = '#319795';
  const maxColor: string = '#234E52';
  const overColor: string = '#1D4044';
  const colors: string[] = chroma
    .scale([minColor, maxColor])
    .mode('rgb')
    .colors(range.length);
  const data = countries.map(({ countryCode = '', count = 0 }) => {
    if (count > max) {
      return {
        id: countryCode,
        label: countryCode,
        value: count,
        color: overColor,
      };
    }
    const colorIndex: number = range.findIndex(
      (start: number) => start <= count && count < start + 100
    );
    const color = colors[colorIndex];
    return { id: countryCode, label: countryCode, value: count, color };
  });
  return (
    <Card className="border border-gray-200 shadow">
      <CardBody>
        <div className="flex items-center gap-x-4 md:gap-x-8">
          <div className="grow">
            <SVGMaps
              id="world"
              maps={maps}
              data={data}
              onClick={(id: string) => router.push(`/countries/${id}`)}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            {colors.map((color: string, index: number) => {
              const start = range[index];
              const end = start + gap;
              const label: string = `${start} - ${end}`;
              return (
                <Tooltip label={label} key={color} placement="left">
                  <Box
                    bgColor={color}
                    className="aspect-square w-4 cursor-pointer overflow-hidden rounded text-white">
                    <Text color={color}>{color}</Text>
                  </Box>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
