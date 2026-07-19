import { fireEvent, render, screen, within } from '@testing-library/react';
import { EndpointsTemplate } from '../EndpointsTemplate';

describe('EndpointsTemplate', () => {
  it('renders endpoints with method and status badges', () => {
    render(<EndpointsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Endpoints' })
    ).toBeInTheDocument();
    expect(screen.getByText('8 endpoints')).toBeInTheDocument();
    expect(screen.getAllByText('/api/users')).toHaveLength(2);
    expect(screen.getByText('340ms')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('GET')).toHaveLength(4);
    expect(within(table).getAllByText('POST')).toHaveLength(2);
    expect(within(table).getAllByText('PUT')).toHaveLength(1);
    expect(within(table).getAllByText('DELETE')).toHaveLength(1);
    expect(within(table).getAllByText('200')).toHaveLength(5);
    expect(within(table).getAllByText('500')).toHaveLength(1);
  });

  it('filters endpoints by method', () => {
    render(<EndpointsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'GET' }));
    expect(screen.getByText('4 endpoints')).toBeInTheDocument();
    expect(screen.getByText('/api/health')).toBeInTheDocument();
    expect(screen.queryByText('/api/webhooks')).not.toBeInTheDocument();
  });

  it('shows a single deleted endpoint when filtered', () => {
    render(<EndpointsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'DELETE' }));
    expect(screen.getByText('1 endpoints')).toBeInTheDocument();
    expect(screen.getByText('/api/users/{id}')).toBeInTheDocument();
    expect(screen.getByText('80ms')).toBeInTheDocument();
  });
});
