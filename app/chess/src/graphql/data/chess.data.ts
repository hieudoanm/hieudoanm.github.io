import { RESTDataSource } from '@apollo/datasource-rest';
import { Insights } from '@chess/app/api/chess/players/[username]/insights/model';
import { GRAPHQL_BASE_URL } from '@chess/common/environments/environments';
import {
  ChessCountry,
  ChessGame,
  ChessPlayer,
  ChessTimeClass,
  ChessTitle,
  ChessTitleAbbreviation,
  ChessVariant,
} from '@prisma/client';
import {
  GamesSynced,
  OpeningsOptions,
  OpeningsResponse,
  PlayersResponse,
  Stats,
  TimeRange,
} from './chess.types';

export class ChessDataSource extends RESTDataSource {
  override baseURL = GRAPHQL_BASE_URL;

  async getCountries(): Promise<ChessCountry[]> {
    try {
      const endpoint: string = '/api/chess/countries';
      const { countries = [] } = await this.get<{ countries: ChessCountry[] }>(
        endpoint
      );
      return countries;
    } catch (error) {
      this.logger.error(`getCountries error=${error}`);
      return [];
    }
  }

  async getEcos(): Promise<string[]> {
    try {
      const endpoint: string = '/api/chess/openings/ecos';
      const { ecos = [] } = await this.get<{ ecos: string[] }>(endpoint);
      return ecos;
    } catch (error) {
      this.logger.error(`getEcos error=${error}`);
      return [];
    }
  }

  async getOpenings({
    eco = '',
    name = '',
    limit = 100,
    offset = 0,
  }: OpeningsOptions): Promise<OpeningsResponse> {
    try {
      const urlSearchParameters: URLSearchParams = new URLSearchParams();
      if (eco !== '') urlSearchParameters.set('eco', eco);
      if (name !== '') urlSearchParameters.set('name', name);
      if (limit) urlSearchParameters.set('limit', limit.toString());
      if (offset) urlSearchParameters.set('offset', offset.toString());
      const queryString: string = urlSearchParameters.toString();
      const endpoint: string = `/api/chess/openings?${queryString}`;
      return this.get<OpeningsResponse>(endpoint);
    } catch (error) {
      this.logger.error(`getOpenings error=${error}`);
      return { total: 0, openings: [] };
    }
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
    try {
      const urlSearchParameters = new URLSearchParams();
      if (limit) urlSearchParameters.set('limit', limit.toString());
      if (offset) urlSearchParameters.set('offset', offset.toString());
      if (title) urlSearchParameters.set('title', title);
      if (timeRange) urlSearchParameters.set('timeRange', timeRange);
      if (countryCode) urlSearchParameters.set('countryCode', countryCode);
      if (isStreamer)
        urlSearchParameters.set('isStreamer', isStreamer.toString());
      const endpoint = `/api/chess/players?${urlSearchParameters.toString()}`;
      return await this.get<PlayersResponse>(endpoint);
    } catch (error) {
      this.logger.error(`getPlayers error=${error}`);
      return {
        total: 0,
        players: [],
        titles: [],
        countries: [],
        stats: {} as Stats,
      };
    }
  }

  async getPlayer(username: string): Promise<ChessPlayer> {
    try {
      const endpoint: string = `/api/chess/players/${username}`;
      return await this.get(endpoint);
    } catch (error) {
      this.logger.error(`getPlayer error=${error}`);
      return {} as ChessPlayer;
    }
  }

  async syncPlayer(username: string): Promise<ChessPlayer> {
    try {
      const endpoint: string = `/api/chess/players/${username}`;
      return await this.post(endpoint);
    } catch (error) {
      this.logger.error(`syncPlayer error=${error}`);
      return {} as ChessPlayer;
    }
  }

  async getPlayerGames(
    username: string
  ): Promise<{ total: number; games: ChessGame[] }> {
    try {
      const endpoint = `/api/chess/players/${username}/games`;
      return await this.get(endpoint);
    } catch (error) {
      this.logger.error(`getPlayerGames error=${error}`);
      return { total: 0, games: [] };
    }
  }

  async getPlayerInsights(
    username: string,
    {
      timeClass = ChessTimeClass.blitz,
      variant = ChessVariant.chess,
    }: { timeClass: ChessTimeClass; variant: ChessVariant }
  ): Promise<Insights> {
    try {
      const urlSearchParameters = new URLSearchParams();
      if (timeClass) urlSearchParameters.set('timeClass', timeClass);
      if (variant) urlSearchParameters.set('variant', variant);
      const endpoint = `/api/chess/players/${username}/insights?${urlSearchParameters.toString()}`;
      return await this.get(endpoint);
    } catch (error) {
      this.logger.error(`getPlayerInsights error=${error}`);
      return {} as Insights;
    }
  }

  async syncPlayerGames(
    username: string,
    {
      month = new Date().getMonth() + 1,
      year = new Date().getFullYear(),
    }: { month: number; year: number }
  ): Promise<GamesSynced> {
    try {
      const endpoint = `/api/chess/players/${username}/games`;
      return await this.post(endpoint, { body: { month, year } });
    } catch (error) {
      this.logger.error(`syncPlayerGames error=${error}`);
      return { total: 0, synced: 0, existed: 0 };
    }
  }

  async getTitled(): Promise<ChessTitle[]> {
    try {
      const endpoint = '/api/chess/titled';
      const { titles = [] } = await this.get<{ titles: ChessTitle[] }>(
        endpoint
      );
      return titles;
    } catch (error) {
      this.logger.error(`getTitled error=${error}`);
      return [];
    }
  }
}
