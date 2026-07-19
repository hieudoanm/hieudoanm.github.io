import { render, screen } from '@testing-library/react';
import { PipelineView } from '../PipelineView';

const stages = [
  {
    name: 'Qualified',
    deals: [
      { id: '1', name: 'Deal A', amount: 5000 },
      { id: '2', name: 'Deal B', amount: 8000 },
    ],
  },
  { name: 'Won', deals: [] },
];

describe('PipelineView', () => {
  it('renders stages with their deals', () => {
    render(<PipelineView stages={stages} />);
    expect(screen.getByText('Qualified')).toBeInTheDocument();
    expect(screen.getByText('Deal A')).toBeInTheDocument();
    expect(screen.getByText('$8,000')).toBeInTheDocument();
  });

  it('shows the deal count badge per stage', () => {
    render(<PipelineView stages={stages} />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('shows an empty state for stages without deals', () => {
    render(<PipelineView stages={stages} />);
    expect(screen.getByText('No deals')).toBeInTheDocument();
  });
});
