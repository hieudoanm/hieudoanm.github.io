import axios, { AxiosRequestConfig } from 'axios';
import { Competition, Match, Team } from './football.dto';

const BASE_URL = 'https://api.football-data.org/v4';

const get = async <T>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  const response = await axios.get<T>(url, options);
  return response.data;
};

export const getCompetitions =
  (authToken: string) =>
  async (): Promise<{
    count: number;
    competitions: Competition[];
  }> => {
    const url = `${BASE_URL}/competitions`;
    const headers = { 'X-Auth-Token': authToken };
    return get<{ count: number; competitions: Competition[] }>(url, {
      headers,
    });
  };

export const getCompetition =
  (authToken: string) =>
  async (id: number): Promise<Competition> => {
    const url = `${BASE_URL}/competitions/${id}`;
    const headers = { 'X-Auth-Token': authToken };
    return get<Competition>(url, { headers });
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
    return get<{ count: number; teams: Team[] }>(url, { headers });
  };

export const getTeamsByCompetition =
  (authToken: string) =>
  async (id: number): Promise<{ count: number; teams: Team[] }> => {
    const url = `${BASE_URL}/competitions/${id}/teams`;
    const headers = { 'X-Auth-Token': authToken };
    return get<{ count: number; teams: Team[] }>(url, { headers });
  };

export const getTeam =
  (authToken: string) =>
  async (id: number): Promise<Team> => {
    const url = `${BASE_URL}/teams/${id}`;
    const headers = { 'X-Auth-Token': authToken };
    return get<Team>(url, { headers });
  };

export const getMatchesByTeam =
  (authToken: string) =>
  async (id: number): Promise<{ count: number; matches: Match[] }> => {
    const url = `${BASE_URL}/teams/${id}/matches`;
    const headers = { 'X-Auth-Token': authToken };
    return get<{ count: number; matches: Match[] }>(url, { headers });
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
