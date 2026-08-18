import { fireEvent, render, screen } from '@testing-library/react';
import { HiringPipelineTemplate } from '../HiringPipelineTemplate';

describe('HiringPipelineTemplate', () => {
  it('renders candidates grouped by stage and the summary', () => {
    render(<HiringPipelineTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Hiring Pipeline' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 candidates')).toBeInTheDocument();
    expect(screen.getByText('Ava Turner')).toBeInTheDocument();
    expect(screen.getByText('Lucas Meyer')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Advance' })).toHaveLength(5);
  });

  it('advances a candidate to the next stage', () => {
    render(<HiringPipelineTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Advance' })[0]);
    expect(screen.getByText('6 candidates')).toBeInTheDocument();
    const interview = screen.getByText('Interview');
    expect(interview).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Advance' })).toHaveLength(5);
  });
});
