import { render, screen } from '@testing-library/react';
import ConnectionsPage from '../page';

jest.mock('@/games/connections', () => ({
  Connections: () => <div data-testid="connections-mock" />,
}));

describe('ConnectionsPage', () => {
  it('renders the connections game', () => {
    render(<ConnectionsPage />);
    expect(screen.getByTestId('connections-mock')).toBeInTheDocument();
  });
});
