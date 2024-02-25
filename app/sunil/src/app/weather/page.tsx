'use client';

import { APP_NAME } from '@sunil/common/constants/app.constants';
import type { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

type City = { id: string; name: string; timeZone: number };

const WeatherPage: NextPage = () => {
  const cities: City[] = [
    { id: 'dallas', name: 'Dallas', timeZone: -6 },
    { id: 'new-york-city', name: 'New York City', timeZone: -5 },
    { id: 'london', name: 'London', timeZone: 0 },
    { id: 'hanoi', name: 'Hanoi', timeZone: 7 },
    { id: 'ho-chi-minh-city', name: 'Ho Chi Minh City', timeZone: 7 },
    { id: 'melbourne', name: 'Melbourne', timeZone: 11 },
  ];

  return (
    <>
      <Head>
        <title>{APP_NAME} - Weather</title>
      </Head>
      <div className="flex flex-col gap-y-2 md:gap-y-4">
        {cities.map(({ id, name }) => {
          return (
            <div key={id} className="rounded border">
              <p className="p-4">{name}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default WeatherPage;
