import axios, { AxiosRequestConfig } from 'axios';
import { Competition, Match, Team } from './football.dto';

const BASE_URL = 'https://api.football-data.org/v4';

export class FootballClient {
  private apiKey = '';

  constructor({ apiKey }: { apiKey: string }) {
    this.apiKey = apiKey;
  }

  private async get<T>(
    url: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response = await axios.get<T>(url, options);
    return response.data;
  }

  public async getCompetitions(): Promise<{
    count: number;
    competitions: Competition[];
  }> {
    const url = `${BASE_URL}/competitions`;
    const headers = { 'X-Auth-Token': this.apiKey };
    return this.get<{ count: number; competitions: Competition[] }>(url, {
      headers,
    });
  }

  public async getCompetition(id: number): Promise<Competition> {
    const url = `${BASE_URL}/competitions/${id}`;
    const headers = { 'X-Auth-Token': this.apiKey };
    return this.get<Competition>(url, { headers });
  }

  public async getTeams(
    { limit = 50, offset = 0 }: { limit?: number; offset?: number } = {
      limit: 50,
      offset: 0,
    }
  ): Promise<{ count: number; teams: Team[] }> {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set('limit', limit.toString());
    urlSearchParams.set('offset', offset.toString());
    const url = `${BASE_URL}/teams?${urlSearchParams.toString()}`;
    const headers = { 'X-Auth-Token': this.apiKey };
    return this.get<{ count: number; teams: Team[] }>(url, { headers });
  }

  public async getTeamsByCompetition(
    id: number
  ): Promise<{ count: number; teams: Team[] }> {
    const url = `${BASE_URL}/competitions/${id}/teams`;
    const headers = { 'X-Auth-Token': this.apiKey };
    return this.get<{ count: number; teams: Team[] }>(url, { headers });
  }

  public async getTeam(id: number): Promise<Team> {
    const url = `${BASE_URL}/teams/${id}`;
    const headers = { 'X-Auth-Token': this.apiKey };
    return this.get<Team>(url, { headers });
  }

  public async getMatchesByTeam(
    id: number
  ): Promise<{ count: number; matches: Match[] }> {
    const url = `${BASE_URL}/teams/${id}/matches`;
    const headers = { 'X-Auth-Token': this.apiKey };
    return this.get<{ count: number; matches: Match[] }>(url, { headers });
  }
}

export * from './football.enums';
export * from './football.dto';
export default FootballClient;
