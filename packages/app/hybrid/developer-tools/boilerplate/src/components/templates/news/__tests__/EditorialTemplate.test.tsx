import { fireEvent, render, screen } from '@testing-library/react';
import { EditorialTemplate } from '../EditorialTemplate';

describe('EditorialTemplate', () => {
  it('renders editorial cards with authors and roles', () => {
    render(<EditorialTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Editorial' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 editorials')).toBeInTheDocument();
    expect(
      screen.getByText('A New Approach to Digital Privacy')
    ).toBeInTheDocument();
    expect(screen.getByText('Sarah Okafor')).toBeInTheDocument();
    expect(screen.getByText(/Editor-in-Chief/)).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Read editorial' })
    ).toHaveLength(4);
  });

  it('expands an editorial excerpt', () => {
    render(<EditorialTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Read editorial' })[0]
    );
    expect(
      screen.getByText(/Privacy needs to be designed/)
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(1);
    expect(
      screen.getAllByRole('button', { name: 'Read editorial' })
    ).toHaveLength(3);
  });

  it('collapses an editorial excerpt when toggled again', () => {
    render(<EditorialTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Read editorial' })[2]
    );
    expect(
      screen.getByText(/Community newsrooms are closing/)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(
      screen.queryByText(/Community newsrooms are closing/)
    ).not.toBeInTheDocument();
  });
});
