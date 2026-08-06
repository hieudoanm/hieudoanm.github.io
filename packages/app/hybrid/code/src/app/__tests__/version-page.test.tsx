import { render, screen } from '@testing-library/react';
import VersionPage from '../version/page';

describe('VersionPage', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the computed build version segments', () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 7, 5, 12, 30, 45));

    render(<VersionPage />);

    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('08')).toBeInTheDocument();
    expect(screen.getByText('05')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
  });

  it('renders segment labels', () => {
    jest.useFakeTimers();
    render(<VersionPage />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });
});
