import axios from 'axios';
import {
  getCompetition,
  getCompetitions,
  getMatchesByTeam,
  getTeam,
  getTeams,
  getTeamsByCompetition,
} from '../football.client';
import { Competition, Team } from '../football.dto';

describe('FootballClient', () => {
  describe('getCompetitions', () => {
    it('success', async () => {
      jest
        .spyOn(axios, 'get')
        .mockResolvedValueOnce({ data: { count: 0, competitions: [] } });
      const data = await getCompetitions();
      expect(data).toEqual({ count: 0, competitions: [] });
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await getCompetitions();
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getCompetition', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await getCompetition(1);
      expect(data).toEqual({} as Competition);
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await getCompetition(1);
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
      const data = await getTeams();
      expect(data).toEqual({ count: 0, teams: [] });
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await getTeams();
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
      const data = await getTeamsByCompetition(1);
      expect(data).toEqual({ count: 0, teams: [] });
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await getTeamsByCompetition(1);
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });

  describe('getTeam', () => {
    it('success', async () => {
      jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {} });
      const data = await getTeam(1);
      expect(data).toEqual({} as Team);
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await getTeam(1);
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
      const data = await getMatchesByTeam(1);
      expect(data).toEqual({ count: 0, matches: [] });
    });

    it('error', async () => {
      jest.spyOn(axios, 'get').mockRejectedValueOnce(new Error('error'));
      try {
        await getMatchesByTeam(1);
      } catch (error) {
        expect((error as Error).message).toEqual('error');
      }
    });
  });
});
