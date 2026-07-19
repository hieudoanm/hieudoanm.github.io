import { fireEvent, render, screen } from '@testing-library/react';
import { PerformanceTemplate } from '../PerformanceTemplate';

describe('PerformanceTemplate', () => {
  it('renders performance bars and stats', () => {
    render(<PerformanceTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Performance' })
    ).toBeInTheDocument();
    expect(screen.getByText('12 months')).toBeInTheDocument();
    expect(screen.getByText('Best month')).toBeInTheDocument();
    expect(screen.getByText('Worst month')).toBeInTheDocument();
    expect(screen.getByText('Annual return')).toBeInTheDocument();
    expect(screen.getByText('+2.4%')).toBeInTheDocument();
    expect(screen.getByText('+10.6%')).toBeInTheDocument();
  });

  it('changes the return label by time range tab', () => {
    render(<PerformanceTemplate />);
    fireEvent.click(screen.getByRole('button', { name: '3M' }));
    expect(screen.getByText('Return over 3M')).toBeInTheDocument();
    expect(screen.getByText('+5.1%')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText('Return over All')).toBeInTheDocument();
    expect(screen.getByText('+23.4%')).toBeInTheDocument();
  });
});
