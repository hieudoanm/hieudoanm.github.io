import { List, ListItem, Text } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import Container from '../../../components/atoms/Container';

type City = { id: string; name: string; timeZone: number };

export const WeatherPage: React.FC = () => {
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
      <Helmet>
        <title>Weather</title>
      </Helmet>
      <Container>
        <div className="py-8">
          <List flexDirection={'row'} gap={8}>
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
