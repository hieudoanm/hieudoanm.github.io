import { StatusDataSource } from '@mini/graphql/schema/status/status.data';

export const resolvers = {
  Query: {
    status: () => {
      return {};
    },
  },
  Status: {
    bitbucket: async (
      _parent: unknown,
      _params: unknown,
      { statusDataSource }: { statusDataSource: StatusDataSource }
    ) => await statusDataSource.getStatus('bitbucket'),
    confluence: async (
      _parent: unknown,
      _params: unknown,
      { statusDataSource }: { statusDataSource: StatusDataSource }
    ) => await statusDataSource.getStatus('confluence'),
    github: async (
      _parent: unknown,
      _params: unknown,
      { statusDataSource }: { statusDataSource: StatusDataSource }
    ) => await statusDataSource.getStatus('github'),
    jira: async (
      _parent: unknown,
      _params: unknown,
      { statusDataSource }: { statusDataSource: StatusDataSource }
    ) => await statusDataSource.getStatus('jira'),
    netlify: async (
      _parent: unknown,
      _params: unknown,
      { statusDataSource }: { statusDataSource: StatusDataSource }
    ) => await statusDataSource.getStatus('netlify'),
    render: async (
      _parent: unknown,
      _params: unknown,
      { statusDataSource }: { statusDataSource: StatusDataSource }
    ) => await statusDataSource.getStatus('render'),
    solana: async (
      _parent: unknown,
      _params: unknown,
      { statusDataSource }: { statusDataSource: StatusDataSource }
    ) => await statusDataSource.getStatus('solana'),
    trello: async (
      _parent: unknown,
      _params: unknown,
      { statusDataSource }: { statusDataSource: StatusDataSource }
    ) => await statusDataSource.getStatus('trello'),
    vercel: async (
      _parent: unknown,
      _params: unknown,
      { statusDataSource }: { statusDataSource: StatusDataSource }
    ) => await statusDataSource.getStatus('vercel'),
  },
};
