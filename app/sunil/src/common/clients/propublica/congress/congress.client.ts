import { API_KEY_PROPUBLICA_CONGRESS } from '@sunil/common/environments/environments';
import axios from 'axios';

const BASE_URL = 'https://api.propublica.org/congress/v1';

export type Chamber = 'house' | 'senate';

export const getMembers = async ({
  congress,
  chamber,
}: {
  congress: number;
  chamber: Chamber;
}) => {
  const url: string = `${BASE_URL}/${congress}/${chamber}/members`;
  const headers = { 'X-API-Key': API_KEY_PROPUBLICA_CONGRESS };
  const response = await axios.get(url, { headers });
  const { data = { results: [] } } = response;
  const { results: members = [] } = data;
  return members;
};

export const getCommittees = async ({
  congress,
  chamber,
}: {
  congress: number;
  chamber: Chamber;
}) => {
  const url: string = `${BASE_URL}/${congress}/${chamber}/committees`;
  const headers = { 'X-API-Key': API_KEY_PROPUBLICA_CONGRESS };
  const response = await axios.get(url, { headers });
  const { data = { results: [] } } = response;
  const { results: committees = [] } = data;
  return committees;
};
