import axios from 'axios';
import {
  FootballClient,
  getCompetition,
  getCompetitions,
  getMatchesByTeam,
  getTeam,
  getTeams,
  getTeamsByCompetition,
} from './football.client';
import { Competition, Team } from './football.dto';

describe('FootballClient', () => {
  const footballClient = FootballClient('');

  describe('getCompetitions', () => {
    it('success', async () => {
      jest
        .spyOn(axios, 'get')
        .mockResolvedValueOnce({ data: { count: 0, competitions: [] } });
      const data = await footballClient.getCompetitions();
      expect(data).toEqual({ count: 0, competitions: [] });
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await footballClient.getCompetitions();
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getCompetition', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await footballClient.getCompetition(1);
      expect(data).toEqual({} as Competition);
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await footballClient.getCompetition(1);
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getTeams', () => {
    it('success', async () => {
      jest
        .spyOn(axios, 'get')
        .mockResolvedValueOnce({ data: { count: 0, teams: [] } });
      const data = await footballClient.getTeams();
      expect(data).toEqual({ count: 0, teams: [] });
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await footballClient.getTeams();
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getTeamsByCompetition', () => {
    it('success', async () => {
      jest
        .spyOn(axios, 'get')
        .mockResolvedValueOnce({ data: { count: 0, teams: [] } });
      const data = await footballClient.getTeamsByCompetition(1);
      expect(data).toEqual({ count: 0, teams: [] });
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await footballClient.getTeamsByCompetition(1);
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getTeam', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await footballClient.getTeam(1);
      expect(data).toEqual({} as Team);
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await footballClient.getTeam(1);
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getMatchesByTeam', () => {
    it('success', async () => {
      jest
        .spyOn(axios, 'get')
        .mockResolvedValueOnce({ data: { count: 0, matches: [] } });
      const data = await footballClient.getMatchesByTeam(1);
      expect(data).toEqual({ count: 0, matches: [] });
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await footballClient.getMatchesByTeam(1);
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });
});
