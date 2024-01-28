import { RESTDataSource } from '@apollo/datasource-rest';
import { GRAPHQL_BASE_URL } from '@chess/common/environments/environments';
import { ChessGame, ChessPlayer, ChessTitle } from '@prisma/client';
import {
  CountriesResponse,
  Country,
  GamesSynced,
  OpeningsOptions,
  OpeningsResponse,
  Player,
  PlayersResponse,
  StreamersResponse,
  TimeRange,
  Titled,
} from './chess.types';

export class ChessDataSource extends RESTDataSource {
  override baseURL = GRAPHQL_BASE_URL;

  async getCountries(): Promise<Country[]> {
    const endpoint: string = '/api/chess/countries';
    const { countries = [] } = await this.get<CountriesResponse>(endpoint);
    return countries;
  }

  async getCountry(code: string): Promise<Country> {
    const endpoint: string = `/api/chess/countries/${code}`;
    return this.get(endpoint);
  }

  async getOpenings({
    eco = '',
    name = '',
  }: OpeningsOptions): Promise<OpeningsResponse> {
    const urlSearchParameters: URLSearchParams = new URLSearchParams();
    if (eco !== '') {
      urlSearchParameters.set('eco', eco);
    }
    if (name !== '') {
      urlSearchParameters.set('name', name);
    }
    const endpoint: string = `/api/chess/openings?${urlSearchParameters.toString()}`;
    return this.get<OpeningsResponse>(endpoint);
  }

  async getPlayers({
    limit = 100,
    offset = 0,
  }: {
    limit?: number;
    offset?: number;
  }): Promise<Player[]> {
    const parameters = new URLSearchParams();
    parameters.set('limit', limit.toString());
    parameters.set('offset', offset.toString());
    const endpoint = `/api/chess/players?${parameters.toString()}`;
    const { players = [] } = await this.get<PlayersResponse>(endpoint);
    return players;
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

  async getStreamers({
    title,
    country,
  }: {
    title: ChessTitle;
    country: string;
  }): Promise<StreamersResponse> {
    const urlSearchParameters: URLSearchParams = new URLSearchParams();
    if (title) urlSearchParameters.set('title', title);
    if (country) urlSearchParameters.set('country', country);
    const endpoint = `/api/chess/streamers?${urlSearchParameters.toString()}`;
    return this.get(endpoint);
  }

  async getTitled({
    title,
    timeRange,
  }: {
    title: string;
    timeRange: TimeRange;
  }): Promise<Titled> {
    const urlSearchParameters: URLSearchParams = new URLSearchParams();
    if (timeRange) {
      urlSearchParameters.set('timeRange', timeRange);
    }
    const url: string = `/api/chess/titled/${title}?${urlSearchParameters.toString()}`;
    return this.get(url);
  }
}
