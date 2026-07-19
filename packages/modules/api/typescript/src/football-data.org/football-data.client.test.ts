import {
  getCompetitions,
  getCompetition,
  getTeams,
  getTeamsByCompetition,
  getTeam,
  getMatchesByTeam,
  FootballClient,
} from './football-data.client.js';

const mockFetch = jest.fn();
globalThis.fetch = mockFetch;

const AUTH_TOKEN = 'test-auth-token';
const authHeader = { 'X-Auth-Token': AUTH_TOKEN };

beforeEach(() => {
  mockFetch.mockReset();
});

describe('FootballClient', () => {
  it('returns an object with all methods', () => {
    const client = FootballClient(AUTH_TOKEN);

    expect(client).toHaveProperty('getCompetitions');
    expect(client).toHaveProperty('getCompetition');
    expect(client).toHaveProperty('getTeams');
    expect(client).toHaveProperty('getTeamsByCompetition');
    expect(client).toHaveProperty('getTeam');
    expect(client).toHaveProperty('getMatchesByTeam');
  });
});

describe('getCompetitions', () => {
  it('fetches all competitions with auth header', async () => {
    const competitionsData = { count: 1, competitions: [] };
    mockFetch.mockResolvedValueOnce({
      json: async () => competitionsData,
    });

    const result = await getCompetitions(AUTH_TOKEN)();

    expect(result).toEqual(competitionsData);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.football-data.org/v4/competitions',
      { headers: authHeader }
    );
  });

  it('rejects on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(getCompetitions(AUTH_TOKEN)()).rejects.toThrow(
      'Network error'
    );
  });
});

describe('getCompetition', () => {
  it('fetches a competition by id with auth header', async () => {
    const competitionData = { id: 2000, name: 'UEFA Champions League' };
    mockFetch.mockResolvedValueOnce({
      json: async () => competitionData,
    });

    const result = await getCompetition(AUTH_TOKEN)(2000);

    expect(result).toEqual(competitionData);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.football-data.org/v4/competitions/2000',
      { headers: authHeader }
    );
  });
});

describe('getTeams', () => {
  it('fetches teams with default limit and offset', async () => {
    const teamsData = { count: 1, teams: [] };
    mockFetch.mockResolvedValueOnce({
      json: async () => teamsData,
    });

    const result = await getTeams(AUTH_TOKEN)();

    expect(result).toEqual(teamsData);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.football-data.org/v4/teams?limit=50&offset=0',
      { headers: authHeader }
    );
  });

  it('fetches teams with custom limit and offset', async () => {
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ count: 10, teams: [] }),
    });

    await getTeams(AUTH_TOKEN)({ limit: 10, offset: 20 });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.football-data.org/v4/teams?limit=10&offset=20',
      { headers: authHeader }
    );
  });
});

describe('getTeamsByCompetition', () => {
  it('fetches teams by competition id with auth header', async () => {
    const teamsData = { count: 20, teams: [] };
    mockFetch.mockResolvedValueOnce({
      json: async () => teamsData,
    });

    const result = await getTeamsByCompetition(AUTH_TOKEN)(2000);

    expect(result).toEqual(teamsData);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.football-data.org/v4/competitions/2000/teams',
      { headers: authHeader }
    );
  });
});

describe('getTeam', () => {
  it('fetches a team by id with auth header', async () => {
    const teamData = { id: 86, name: 'Real Madrid' };
    mockFetch.mockResolvedValueOnce({
      json: async () => teamData,
    });

    const result = await getTeam(AUTH_TOKEN)(86);

    expect(result).toEqual(teamData);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.football-data.org/v4/teams/86',
      { headers: authHeader }
    );
  });
});

describe('getMatchesByTeam', () => {
  it('fetches matches by team id with auth header', async () => {
    const matchesData = { count: 5, matches: [] };
    mockFetch.mockResolvedValueOnce({
      json: async () => matchesData,
    });

    const result = await getMatchesByTeam(AUTH_TOKEN)(86);

    expect(result).toEqual(matchesData);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.football-data.org/v4/teams/86/matches',
      { headers: authHeader }
    );
  });
});
