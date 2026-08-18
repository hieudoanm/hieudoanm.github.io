import { render, screen } from '@testing-library/react';
import { PipelineStage } from '../PipelineStage';

describe('PipelineStage', () => {
  it('renders the stage name', () => {
    render(<PipelineStage stage="Qualification" />);
    expect(screen.getByText('Qualification')).toBeInTheDocument();
  });

  it('renders an index when provided', () => {
    render(<PipelineStage stage="Qualification" index={2} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('does not render an index when omitted', () => {
    render(<PipelineStage stage="Qualification" />);
    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });

  it('applies the variant class', () => {
    render(<PipelineStage stage="Closed" variant="success" />);
    expect(screen.getByTestId('pipeline-stage')).toHaveClass('badge-success');
  });
});
