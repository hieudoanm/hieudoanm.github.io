import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GraphQlEditor } from '../GraphQlEditor';
import { introspectSchema } from '@/lib/graphql';
import { prettyPrint } from '@/lib/format';

jest.mock('@/lib/graphql', () => ({
  ...jest.requireActual('@/lib/graphql'),
  introspectSchema: jest.fn(),
}));

const introspectSchemaMock = introspectSchema as jest.Mock;

describe('GraphQlEditor', () => {
  const onQueryChange = jest.fn();
  const onVariablesChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('edits query and variables', () => {
    render(
      <GraphQlEditor
        query=""
        variables=""
        url="https://x/graphql"
        onQueryChange={onQueryChange}
        onVariablesChange={onVariablesChange}
      />
    );
    fireEvent.change(screen.getByLabelText('GraphQL query'), {
      target: { value: 'query { viewer }' },
    });
    expect(onQueryChange).toHaveBeenCalledWith('query { viewer }');
    fireEvent.change(screen.getByLabelText('GraphQL variables'), {
      target: { value: '{"id": 1}' },
    });
    expect(onVariablesChange).toHaveBeenCalledWith('{"id": 1}');
  });

  it('warns on invalid variables', () => {
    render(
      <GraphQlEditor
        query=""
        variables="not-json"
        url="https://x/graphql"
        onQueryChange={onQueryChange}
        onVariablesChange={onVariablesChange}
      />
    );
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Variables must be valid JSON'
    );
  });

  it('does not warn on empty variables', () => {
    render(
      <GraphQlEditor
        query=""
        variables=""
        url="https://x/graphql"
        onQueryChange={onQueryChange}
        onVariablesChange={onVariablesChange}
      />
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('beautifies the query', () => {
    render(
      <GraphQlEditor
        query="query { viewer }"
        variables=""
        url="https://x/graphql"
        onQueryChange={onQueryChange}
        onVariablesChange={onVariablesChange}
      />
    );
    fireEvent.click(screen.getByText('Beautify'));
    expect(onQueryChange).toHaveBeenCalledWith(prettyPrint('query { viewer }'));
  });

  it('introspects a schema and shows the result', async () => {
    introspectSchemaMock.mockResolvedValue({
      queryType: 'Query',
      mutationType: null,
      types: ['Query', 'User'],
    });
    render(
      <GraphQlEditor
        query=""
        variables=""
        url="https://x/graphql"
        onQueryChange={onQueryChange}
        onVariablesChange={onVariablesChange}
      />
    );
    fireEvent.click(screen.getByText('Introspect Schema'));
    await waitFor(() => {
      expect(screen.getByText(/Types:/)).toBeInTheDocument();
    });
    expect(introspectSchemaMock).toHaveBeenCalledWith('https://x/graphql', []);
  });

  it('shows a fallback message when introspection fails', async () => {
    introspectSchemaMock.mockResolvedValue({
      queryType: null,
      mutationType: null,
      types: ['User'],
      error: 'boom',
    });
    render(
      <GraphQlEditor
        query=""
        variables=""
        url=""
        onQueryChange={onQueryChange}
        onVariablesChange={onVariablesChange}
      />
    );
    fireEvent.click(screen.getByText('Introspect Schema'));
    await waitFor(() => {
      expect(screen.getByText(/Introspection failed/)).toBeInTheDocument();
    });
  });
});
