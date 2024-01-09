import { GRAPHQL_URI, NEXT_PUBLIC_GRAPHQL_URI, NODE_ENV } from '..';

describe('environments', () => {
  it('for single number', () => {
    expect(NODE_ENV).toEqual('test');
    expect(GRAPHQL_URI).toEqual('');
    expect(NEXT_PUBLIC_GRAPHQL_URI).toEqual('');
  });
});
