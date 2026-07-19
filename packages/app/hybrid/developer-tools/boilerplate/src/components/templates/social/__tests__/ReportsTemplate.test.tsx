import { fireEvent, render, screen } from '@testing-library/react';
import { ReportsTemplate } from '../ReportsTemplate';

describe('ReportsTemplate', () => {
  it('switches the generated date range', () => {
    render(<ReportsTemplate />);
    expect(
      screen.getByText('Generated for the last 30 days')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '7d' }));
    expect(
      screen.getByText('Generated for the last 7 days')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '90d' }));
    expect(
      screen.getByText('Generated for the last 90 days')
    ).toBeInTheDocument();
  });

  it('renders report cards with export buttons', () => {
    render(<ReportsTemplate />);
    expect(screen.getByText('Revenue summary')).toBeInTheDocument();
    expect(screen.getByText('User growth')).toBeInTheDocument();
    expect(screen.getByText('Feature usage')).toBeInTheDocument();
    expect(screen.getByText('Support performance')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Export' })).toHaveLength(4);
  });
});
