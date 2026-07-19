import { render, screen } from '@testing-library/react';
import { CandidatePipeline } from '../CandidatePipeline';

describe('CandidatePipeline', () => {
  const stages = [
    {
      id: 'screened',
      title: 'Screened',
      candidates: [
        { id: '1', name: 'Ada Lovelace', role: 'Engineer', score: 90 },
      ],
    },
    { id: 'interview', title: 'Interview', candidates: [] },
    {
      id: 'hired',
      title: 'Hired',
      candidates: [{ id: '2', name: 'Grace Hopper', role: 'PM', score: 55 }],
    },
  ];

  it('renders each stage with its candidate count', () => {
    render(<CandidatePipeline stages={stages} />);
    expect(screen.getByText('Screened')).toBeInTheDocument();
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
  });

  it('renders candidate names and roles', () => {
    render(<CandidatePipeline stages={stages} />);
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('shows an empty state for empty stages', () => {
    render(<CandidatePipeline stages={stages} />);
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });

  it('applies score badge classes by threshold', () => {
    render(<CandidatePipeline stages={stages} />);
    expect(screen.getByText('Score 90')).toHaveClass('badge-success');
    expect(screen.getByText('Score 55')).toHaveClass('badge-error');
  });
});
