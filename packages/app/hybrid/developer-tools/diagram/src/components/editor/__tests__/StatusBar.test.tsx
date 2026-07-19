import { render, screen } from '@testing-library/react';
import StatusBar from '@/components/editor/StatusBar';

describe('StatusBar', () => {
  it('shows counts and title', () => {
    render(
      <StatusBar errors={0} edges={2} nodes={3} title="Flow" kind="flow" />
    );
    expect(screen.getByText('Flow')).toBeInTheDocument();
    expect(screen.getByText('Flow diagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Node count')).toHaveTextContent('3 nodes');
    expect(screen.getByLabelText('Edge count')).toHaveTextContent('2 edges');
  });

  it('shows an error count when present', () => {
    render(
      <StatusBar errors={2} edges={0} nodes={0} title="" kind="sequence" />
    );
    expect(screen.getByText('Untitled diagram')).toBeInTheDocument();
    expect(screen.getByText('Sequence diagram')).toBeInTheDocument();
    expect(screen.getByText('2 error(s)')).toBeInTheDocument();
  });
});
