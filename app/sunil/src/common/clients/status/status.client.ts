import axios from 'axios';
import { Service, StatusResponseDto } from './status.dto';

const urls: Record<Service, string> = {
  bitbucket: 'https://bitbucket.status.atlassian.com/api/v2/status.json',
  confluence: 'https://confluence.status.atlassian.com/api/v2/status.json',
  github: 'https://www.githubstatus.com/api/v2/status.json',
  jira: 'https://jira-software.status.atlassian.com/api/v2/status.json',
  netlify: 'https://www.netlifystatus.com/api/v2/status.json',
  render: 'https://status.render.com/api/v2/status.json',
  solana: 'https://status.solana.com/api/v2/status.json',
  trello: 'https://trello.status.atlassian.com/api/v2/status.json',
  vercel: 'https://www.vercel-status.com/api/v2/status.json',
};

const getServiceStatusByKey = async (
  service: Service
): Promise<StatusResponseDto> => {
  const url = urls[service];
  const response = await axios.get<StatusResponseDto>(url);
  return response.data;
};

export const getServiceStatus = async (
  service: Service
): Promise<{ error: boolean }> => {
  const statusResponse: StatusResponseDto =
    await getServiceStatusByKey(service);
  const error: boolean = statusResponse.status.indicator !== 'none';
  return { error };
};
