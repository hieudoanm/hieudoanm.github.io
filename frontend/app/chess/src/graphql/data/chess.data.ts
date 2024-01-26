import { RESTDataSource } from '@apollo/datasource-rest';
import { GRAPHQL_BASE_URL } from '@chess/common/environments/environments';
import {
  ChessGame,
  ChessOpening,
  ChessPlayer,
  ChessTitle,
} from '@prisma/client';
import {
  Country,
  GamesSynced,
  StreamersResponse,
  TimeRange,
  Titled,
} from './chess.types';

export class ChessDataSource extends RESTDataSource {
  override baseURL = GRAPHQL_BASE_URL;

  async getCountries(): Promise<Country[]> {
    return this.get('/chess/countries');
  }

  async getCountry(code: string): Promise<Country> {
    return this.get(`/chess/countries/${code}`);
  }

  async getOpenings({
    eco = '',
    name = '',
  }: {
    eco: string;
    name: string;
  }): Promise<{ total: number; openings: ChessOpening[] }> {
    const urlSearchParameters: URLSearchParams = new URLSearchParams();
    if (eco !== '') {
      urlSearchParameters.set('eco', eco);
    }
    if (name !== '') {
      urlSearchParameters.set('name', name);
    }
    return this.get(`/chess/openings?${urlSearchParameters.toString()}`);
  }

  async getPlayers({
    limit,
    offset,
  }: {
    limit: number;
    offset: number;
  }): Promise<ChessPlayer> {
    const parameters = new URLSearchParams();
    parameters.set('limit', limit.toString());
    parameters.set('offset', offset.toString());
    return this.get(`/chess/players?${parameters.toString()}`);
  }

  async getPlayer(username: string): Promise<ChessPlayer> {
    return this.get(`/chess/players/${username}`);
  }

  async syncPlayer(username: string): Promise<ChessPlayer> {
    return this.post(`/chess/players/${username}`);
  }

  async getPlayerGames(
    username: string
  ): Promise<{ total: number; games: ChessGame[] }> {
    return this.get(`/chess/players/${username}/games`);
  }

  async syncPlayerGames(
    username: string,
    {
      month = new Date().getMonth() + 1,
      year = new Date().getFullYear(),
    }: { month: number; year: number }
  ): Promise<GamesSynced> {
    return this.post(`/chess/players/${username}/games`, {
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
    if (title) {
      urlSearchParameters.set('title', title);
    }
    if (country) {
      urlSearchParameters.set('country', country);
    }
    const endpoint = `/chess/streamers?${urlSearchParameters.toString()}`;
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
    const url: string = `/chess/titled/${title}?${urlSearchParameters.toString()}`;
    return this.get(url);
  }
}
