import {
  GRAPHQL_URI,
  NEXT_PUBLIC_GRAPHQL_URI,
  NODE_ENV,
} from '../environments';

describe('environments', () => {
  it('for single number', () => {
    expect(NODE_ENV).toEqual('test');

    const graphqlUri = 'http://localhost:3002/api/graphql';
    expect(GRAPHQL_URI).toEqual(graphqlUri);
    expect(NEXT_PUBLIC_GRAPHQL_URI).toEqual(graphqlUri);
  });
});
