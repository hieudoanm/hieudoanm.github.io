import { isSquad, withFormation } from '@/lib/squad';
import { Squad } from '@/types/football';

export interface ExampleSquadMeta {
  id: string;
  name: string;
}

export const EXAMPLE_SQUADS: ExampleSquadMeta[] = [
  {
    id: 'barcelona-2008-2009',
    name: 'Barcelona 2008-2009',
  },
  {
    id: 'barcelona-2014-2015',
    name: 'Barcelona 2014-2015',
  },
  {
    id: 'bayern-munich-2012-2013',
    name: 'Bayern Munich 2012-2013',
  },
  {
    id: 'bayern-munich-2019-2020',
    name: 'Bayern Munich 2019-2020',
  },
  {
    id: 'inter-milan-2009-2010',
    name: 'Inter Milan 2009-2010',
  },
  {
    id: 'liverpool-2004-2005',
    name: 'Liverpool 2004-2005',
  },
  {
    id: 'liverpool-2019-2020',
    name: 'Liverpool 2019-2020',
  },
  {
    id: 'manchester-city-2022-2023',
    name: 'Manchester City 2022-2023',
  },
  {
    id: 'psg-2024-2025',
    name: 'PSG 2024-2025',
  },
];

export const exampleSquadUrl = (id: string): string =>
  `/data/json/11/${id}.json`;

export const loadExampleSquad = async (
  id: string = EXAMPLE_SQUADS[0].id
): Promise<Squad | null> => {
  try {
    const response = await fetch(exampleSquadUrl(id));
    if (!response.ok) return null;
    const parsed: unknown = await response.json();
    if (!isSquad(parsed)) return null;
    return withFormation(parsed);
  } catch {
    return null;
  }
};
