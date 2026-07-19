import { fireEvent, render, screen } from '@testing-library/react';
import { GameNewsTemplate } from '../GameNewsTemplate';

describe('GameNewsTemplate', () => {
  it('renders stories with category badges and dates', () => {
    render(<GameNewsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Game News' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Patches, events, and esports.')
    ).toBeInTheDocument();
    expect(screen.getByText('4 stories')).toBeInTheDocument();
    expect(
      screen.getByText('Stellar Vanguard patch 2.1 launches next week')
    ).toBeInTheDocument();
    expect(screen.getAllByText('Patch')).toHaveLength(2);
    expect(screen.getAllByText('Esports')).toHaveLength(1);
    expect(screen.getAllByText('Community')).toHaveLength(1);
    expect(screen.getByText('Aug 4, 2026')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Read more' })).toHaveLength(
      4
    );
  });

  it('expands a story with the read more button', () => {
    render(<GameNewsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Read more' })[0]);
    expect(
      screen.getByText(
        'The update rebalances three heroes and adds a new ranked map rotation.'
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show less' })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Read more' })).toHaveLength(
      3
    );
  });
});
