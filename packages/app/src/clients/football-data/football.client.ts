import { Competition, Match, Team } from './football.dto';

const BASE_URL = 'https://api.football-data.org/v4';

export const getCompetitions =
  (authToken: string) =>
  async (): Promise<{
    count: number;
    competitions: Competition[];
  }> => {
    const url = `${BASE_URL}/competitions`;
    const headers = { 'X-Auth-Token': authToken };
    return fetch(url, { headers }).then((response) => response.json());
  };

export const getCompetition =
  (authToken: string) =>
  async (id: number): Promise<Competition> => {
    const url = `${BASE_URL}/competitions/${id}`;
    const headers = { 'X-Auth-Token': authToken };
    return fetch(url, { headers }).then((response) => response.json());
  };

export const getTeams =
  (authToken: string) =>
  async (
    { limit = 50, offset = 0 }: { limit?: number; offset?: number } = {
      limit: 50,
      offset: 0,
    }
  ): Promise<{ count: number; teams: Team[] }> => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('limit', limit.toString());
    urlSearchParams.set('offset', offset.toString());
    const url = `${BASE_URL}/teams?${urlSearchParams.toString()}`;
    const headers = { 'X-Auth-Token': authToken };
    return fetch(url, { headers }).then((response) => response.json());
  };

export const getTeamsByCompetition =
  (authToken: string) =>
  async (id: number): Promise<{ count: number; teams: Team[] }> => {
    const url = `${BASE_URL}/competitions/${id}/teams`;
    const headers = { 'X-Auth-Token': authToken };
    return fetch(url, { headers }).then((response) => response.json());
  };

export const getTeam =
  (authToken: string) =>
  async (id: number): Promise<Team> => {
    const url = `${BASE_URL}/teams/${id}`;
    const headers = { 'X-Auth-Token': authToken };
    return fetch(url, { headers }).then((response) => response.json());
  };

export const getMatchesByTeam =
  (authToken: string) =>
  async (id: number): Promise<{ count: number; matches: Match[] }> => {
    const url = `${BASE_URL}/teams/${id}/matches`;
    const headers = { 'X-Auth-Token': authToken };
    return fetch(url, { headers }).then((response) => response.json());
  };

export const FootballClient = (authToken: string) => {
  return {
    getCompetitions: getCompetitions(authToken),
    getCompetition: getCompetition(authToken),
    getTeamsByCompetition: getTeamsByCompetition(authToken),
    getTeams: getTeams(authToken),
    getTeam: getTeam(authToken),
    getMatchesByTeam: getMatchesByTeam(authToken),
  };
};
