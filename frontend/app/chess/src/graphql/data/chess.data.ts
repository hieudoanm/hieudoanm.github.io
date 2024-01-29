import { RESTDataSource } from '@apollo/datasource-rest';
import { GRAPHQL_BASE_URL } from '@chess/common/environments/environments';
import {
  ChessCountry,
  ChessGame,
  ChessPlayer,
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

  async getTitledCountries(): Promise<TitledCountry[]> {
    const endpoint: string = '/api/chess/countries/titled';
    const { countries = [] } = await this.get<CountriesResponse>(endpoint);
    return countries;
  }

  async getTitledCountry(code: string): Promise<TitledCountry> {
    const endpoint: string = `/api/chess/countries/titled/${code}`;
    return this.get(endpoint);
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
    limit = 100,
    offset = 0,
    title,
    countryCode = '',
    isStreamer = false,
  }: {
    limit?: number;
    offset?: number;
    title?: ChessTitleAbbreviation;
    countryCode?: string;
    isStreamer?: boolean;
  }): Promise<PlayersResponse> {
    const urlSearchParameters = new URLSearchParams();
    if (limit) urlSearchParameters.set('limit', limit.toString());
    if (offset) urlSearchParameters.set('offset', offset.toString());
    if (isStreamer)
      urlSearchParameters.set('isStreamer', isStreamer.toString());
    if (title) urlSearchParameters.set('title', title);
    if (countryCode) urlSearchParameters.set('countryCode', countryCode);
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

  async getStreamers({
    title,
    country,
  }: {
    title: ChessTitleAbbreviation;
    country: string;
  }): Promise<StreamersResponse> {
    const urlSearchParameters: URLSearchParams = new URLSearchParams();
    if (title) urlSearchParameters.set('title', title);
    if (country) urlSearchParameters.set('country', country);
    const endpoint = `/api/chess/streamers?${urlSearchParameters.toString()}`;
    return this.get(endpoint);
  }

  async getTitled(): Promise<ChessTitle[]> {
    const endpoint = '/api/chess/titled';
    const { titles = [] } = await this.get<{ titles: ChessTitle[] }>(endpoint);
    return titles;
  }

  async getTitle({
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
