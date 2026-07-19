import { render, screen } from '@testing-library/react';
import { TestRunner } from '../TestRunner';

describe('TestRunner', () => {
  it('renders results with statuses and durations', () => {
    render(
      <TestRunner
        results={[
          {
            id: '1',
            name: 'renders header',
            status: 'passed',
            duration: '12ms',
          },
          { id: '2', name: 'handles error', status: 'failed' },
        ]}
      />
    );
    expect(screen.getByText('Test runner')).toBeInTheDocument();
    expect(screen.getByText('renders header')).toBeInTheDocument();
    expect(screen.getByText('handles error')).toBeInTheDocument();
    expect(screen.getByText('12ms')).toBeInTheDocument();
  });

  it('summarizes pass and fail counts', () => {
    render(
      <TestRunner
        results={[
          { id: '1', name: 'a', status: 'passed' },
          { id: '2', name: 'b', status: 'passed' },
          { id: '3', name: 'c', status: 'failed' },
        ]}
      />
    );
    expect(screen.getByText('2 passed')).toBeInTheDocument();
    expect(screen.getByText('1 failed')).toBeInTheDocument();
    expect(screen.getByText('3 total')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<TestRunner results={[]} />);
    expect(screen.getByText('No tests run.')).toBeInTheDocument();
  });
});
