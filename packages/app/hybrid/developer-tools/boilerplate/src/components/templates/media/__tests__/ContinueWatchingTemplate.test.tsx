import { fireEvent, render, screen, within } from '@testing-library/react';
import { ContinueWatchingTemplate } from '../ContinueWatchingTemplate';

describe('ContinueWatchingTemplate', () => {
  it('renders titles with progress bars', () => {
    render(<ContinueWatchingTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Continue Watching' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 titles')).toBeInTheDocument();
    expect(screen.getByText('Neon Horizon')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getAllByRole('progressbar')).toHaveLength(4);
  });

  it('removes a title and updates the count', () => {
    render(<ContinueWatchingTemplate />);
    const card = screen
      .getByText('Neon Horizon')
      .closest('.card') as HTMLElement;
    fireEvent.click(
      within(card).getByRole('button', { name: 'Remove Neon Horizon' })
    );
    expect(screen.getByText('3 titles')).toBeInTheDocument();
    expect(screen.queryByText('Neon Horizon')).not.toBeInTheDocument();
  });

  it('shows an empty state after removing every title', () => {
    render(<ContinueWatchingTemplate />);
    while (screen.queryAllByRole('button', { name: /^Remove / }).length > 0) {
      screen
        .getAllByRole('button', { name: /^Remove / })
        .forEach((button) => fireEvent.click(button));
    }
    expect(screen.getByText('0 titles')).toBeInTheDocument();
    expect(screen.getByText('Nothing to watch')).toBeInTheDocument();
  });
});
