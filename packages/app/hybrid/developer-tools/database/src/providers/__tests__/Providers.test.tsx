import { render, screen } from '@testing-library/react';
import { Providers } from '@/providers/Providers';

jest.mock('@/lib/db', () => ({
  db: {
    connections: { getAll: jest.fn().mockResolvedValue([]) },
    history: { getAll: jest.fn().mockResolvedValue([]) },
    bookmarks: { getAll: jest.fn().mockResolvedValue([]) },
    settings: {
      get: jest.fn().mockResolvedValue({
        id: 'default',
        theme: 'database-light',
        defaultPort: 5432,
        editorFontSize: 14,
        queryTimeout: 30,
      }),
    },
  },
}));

jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  executeQuery: jest.fn(),
  MOCK_SCHEMAS: {},
}));

describe('Providers', () => {
  it('wraps children with the provider stack', () => {
    render(
      <Providers>
        <div data-testid="content">content</div>
      </Providers>
    );
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
