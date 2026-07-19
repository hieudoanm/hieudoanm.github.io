import { fireEvent, render, screen } from '@testing-library/react';
import { PipelineTemplate } from '../PipelineTemplate';

describe('PipelineTemplate', () => {
  it('renders deals grouped by stage and the summary', () => {
    render(<PipelineTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Pipeline' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 deals')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Onboarding')).toBeInTheDocument();
    expect(screen.getByText('$48,000')).toBeInTheDocument();
    expect(screen.getByText('$35,000')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Advance' })).toHaveLength(5);
  });

  it('advances a deal to the next stage', () => {
    render(<PipelineTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Advance' })[0]);
    expect(screen.getByText('7 deals')).toBeInTheDocument();
    expect(screen.getByText('Enterprise Onboarding')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Advance' })).toHaveLength(5);
  });
});
