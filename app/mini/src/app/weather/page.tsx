'use client';

import { List, ListItem, Text } from '@chakra-ui/react';
import Container from '@mini/common/components/Container';
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
        <title>Weather</title>
      </Head>
      <Container>
        <div className="py-8">
          <List className="flex flex-col gap-y-2 md:gap-y-4">
            {cities.map(({ id, name }) => {
              return (
                <ListItem key={id} className="rounded border">
                  <Text className="p-4">{name}</Text>
                </ListItem>
              );
            })}
          </List>
        </div>
      </Container>
    </>
  );
};

export default WeatherPage;
