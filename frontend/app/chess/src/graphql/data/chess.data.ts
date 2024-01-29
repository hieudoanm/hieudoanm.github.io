import { RESTDataSource } from '@apollo/datasource-rest';
import { GRAPHQL_BASE_URL } from '@chess/common/environments/environments';
import {
  ChessCountry,
  ChessGame,
  ChessPlayer,
  ChessTimeClass,
  ChessTitle,
  ChessTitleAbbreviation,
} from '@prisma/client';
import {
  CountriesResponse,
  GamesSynced,
  OpeningsOptions,
  OpeningsResponse,
  PlayersResponse,
  StreamersResponse,
  TimeRange,
  Titled,
  TitledCountry,
} from './chess.types';

export class ChessDataSource extends RESTDataSource {
  override baseURL = GRAPHQL_BASE_URL;

  async getCountries(): Promise<ChessCountry[]> {
    const endpoint: string = '/api/chess/countries';
    const { countries = [] } = await this.get<{ countries: ChessCountry[] }>(
      endpoint
    );
    return countries;
  }

  async getEcos(): Promise<string[]> {
    const endpoint: string = '/api/chess/openings/ecos';
    const { ecos = [] } = await this.get<{ ecos: string[] }>(endpoint);
    return ecos;
  }

  async getOpenings({
    eco = '',
    name = '',
    limit = 100,
    offset = 0,
  }: OpeningsOptions): Promise<OpeningsResponse> {
    const urlSearchParameters: URLSearchParams = new URLSearchParams();
    if (eco !== '') urlSearchParameters.set('eco', eco);
    if (name !== '') urlSearchParameters.set('name', name);
    if (limit) urlSearchParameters.set('limit', limit.toString());
    if (offset) urlSearchParameters.set('offset', offset.toString());
    const queryString: string = urlSearchParameters.toString();
    const endpoint: string = `/api/chess/openings?${queryString}`;
    return this.get<OpeningsResponse>(endpoint);
  }

  async getPlayers({
    title,
    limit = 100,
    offset = 0,
    timeRange,
    countryCode = '',
    isStreamer = false,
  }: {
    limit?: number;
    offset?: number;
    title?: ChessTitleAbbreviation;
    timeRange?: TimeRange;
    countryCode?: string;
    isStreamer?: boolean;
  }): Promise<PlayersResponse> {
    const urlSearchParameters = new URLSearchParams();
    if (limit) urlSearchParameters.set('limit', limit.toString());
    if (offset) urlSearchParameters.set('offset', offset.toString());
    if (title) urlSearchParameters.set('title', title);
    if (timeRange) urlSearchParameters.set('timeRange', timeRange);
    if (countryCode) urlSearchParameters.set('countryCode', countryCode);
    if (isStreamer)
      urlSearchParameters.set('isStreamer', isStreamer.toString());
    const endpoint = `/api/chess/players?${urlSearchParameters.toString()}`;
    return this.get<PlayersResponse>(endpoint);
  }

  async getPlayer(username: string): Promise<ChessPlayer> {
    const endpoint: string = `/api/chess/players/${username}`;
    return this.get(endpoint);
  }

  async syncPlayer(username: string): Promise<ChessPlayer> {
    const endpoint: string = `/api/chess/players/${username}`;
    return this.post(endpoint);
  }

  async getPlayerGames(
    username: string
  ): Promise<{ total: number; games: ChessGame[] }> {
    const endpoint = `/api/chess/players/${username}/games`;
    return this.get(endpoint);
  }

  async syncPlayerGames(
    username: string,
    {
      month = new Date().getMonth() + 1,
      year = new Date().getFullYear(),
    }: { month: number; year: number }
  ): Promise<GamesSynced> {
    return this.post(`/api/chess/players/${username}/games`, {
      body: { month, year },
    });
  }

  async getTitled(): Promise<ChessTitle[]> {
    const endpoint = '/api/chess/titled';
    const { titles = [] } = await this.get<{ titles: ChessTitle[] }>(endpoint);
    return titles;
  }
}
