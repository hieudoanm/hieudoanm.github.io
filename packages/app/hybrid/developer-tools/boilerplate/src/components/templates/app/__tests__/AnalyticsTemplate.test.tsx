import { fireEvent, render, screen } from '@testing-library/react';
import { AnalyticsTemplate } from '../AnalyticsTemplate';

describe('AnalyticsTemplate', () => {
  it('renders stat cards, bar chart and top pages table', () => {
    render(<AnalyticsTemplate />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Orders')).toBeInTheDocument();
    expect(screen.getByText('Conversion')).toBeInTheDocument();
    expect(screen.getByText('$12,480')).toBeInTheDocument();
    expect(screen.getByText('+18.2%')).toBeInTheDocument();
    expect(screen.getByText('-2.1%')).toBeInTheDocument();
    expect(screen.getByLabelText('Day 1: 42')).toBeInTheDocument();
    expect(screen.getByLabelText('Day 7: 55')).toBeInTheDocument();
    expect(screen.getByText('/home')).toBeInTheDocument();
    expect(screen.getAllByText('Growing')).toHaveLength(2);
    expect(screen.getByText('Declining')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it('switches the bar chart dataset between 7 and 30 days', () => {
    render(<AnalyticsTemplate />);
    expect(screen.getByLabelText('Day 1: 42')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '30 days' }));
    expect(screen.getByLabelText('Day 1: 48')).toBeInTheDocument();
    expect(screen.getByLabelText('Day 7: 60')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '7 days' }));
    expect(screen.getByLabelText('Day 1: 42')).toBeInTheDocument();
  });
});
