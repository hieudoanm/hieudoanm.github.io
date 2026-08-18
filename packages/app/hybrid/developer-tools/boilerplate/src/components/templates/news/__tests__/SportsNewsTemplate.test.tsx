import { fireEvent, render, screen } from '@testing-library/react';
import { SportsNewsTemplate } from '../SportsNewsTemplate';

describe('SportsNewsTemplate', () => {
  it('renders stories with category badges and times', () => {
    render(<SportsNewsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Sports News' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 stories')).toBeInTheDocument();
    expect(
      screen.getByText('Riverside sign midfielder in club-record deal')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Transfers')).toHaveLength(2);
    expect(screen.getAllByText('Matchday')).toHaveLength(2);
    expect(screen.getAllByText('Injury')).toHaveLength(1);
    expect(screen.getByText('3h ago')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Read' })).toHaveLength(5);
  });

  it('toggles an inline summary with the Read button', () => {
    render(<SportsNewsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Read' })[0]);
    expect(
      screen.getByText(
        'The midfielder arrives on a three-year contract from Atlas United.'
      )
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Read' })).toHaveLength(4);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(
      screen.queryByText(
        'The midfielder arrives on a three-year contract from Atlas United.'
      )
    ).not.toBeInTheDocument();
  });
});
