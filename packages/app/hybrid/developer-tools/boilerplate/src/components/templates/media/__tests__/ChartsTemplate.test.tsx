import { fireEvent, render, screen } from '@testing-library/react';
import { ChartsTemplate } from '../ChartsTemplate';

describe('ChartsTemplate', () => {
  it('renders the weekly chart by default', () => {
    render(<ChartsTemplate />);
    expect(screen.getByRole('heading', { name: 'Charts' })).toBeInTheDocument();
    expect(screen.getByText('5 songs')).toBeInTheDocument();
    expect(screen.getByText('Solar Flare')).toBeInTheDocument();
    expect(screen.getByText('3.2M plays')).toBeInTheDocument();
  });

  it('switches to the monthly chart', () => {
    render(<ChartsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Monthly' }));
    expect(screen.getByText('6 songs')).toBeInTheDocument();
    expect(screen.getByText('Neon Dreams')).toBeInTheDocument();
    expect(screen.queryByText('Solar Flare')).not.toBeInTheDocument();
  });

  it('switches to the yearly chart and shows movement badges', () => {
    render(<ChartsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Yearly' }));
    expect(screen.getByText('4 songs')).toBeInTheDocument();
    expect(screen.getByText('Midnight Static')).toBeInTheDocument();
    expect(screen.queryByText('Neon Dreams')).not.toBeInTheDocument();
    expect(screen.getByText('41.2M plays')).toBeInTheDocument();
    expect(screen.getAllByText('Up')).toHaveLength(2);
    expect(screen.getAllByText('Down')).toHaveLength(2);
    expect(screen.getAllByText('Up')[0]).toHaveClass('badge-success');
    expect(screen.getAllByText('Down')[0]).toHaveClass('badge-error');
  });
});
