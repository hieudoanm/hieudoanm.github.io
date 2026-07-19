import { fireEvent, render, screen } from '@testing-library/react';
import { RecommendationRow } from '../RecommendationRow';

const items = [
  { id: 'r1', title: 'Night Drive', subtitle: 'Synthwave', match: 95 },
  { id: 'r2', title: 'Static Coast', subtitle: 'Drama', match: 88 },
];

describe('RecommendationRow', () => {
  it('renders recommendation titles, subtitles and match badges', () => {
    render(<RecommendationRow items={items} />);
    expect(screen.getByText('Night Drive')).toBeInTheDocument();
    expect(screen.getByText('Drama')).toBeInTheDocument();
    expect(screen.getByTestId('match-r1')).toHaveTextContent('95% match');
    expect(screen.getByTestId('match-r2')).toHaveTextContent('88% match');
  });

  it('uses the provided title heading', () => {
    render(<RecommendationRow items={items} title="Because you watched" />);
    expect(
      screen.getByRole('heading', { name: 'Because you watched' })
    ).toBeInTheDocument();
  });

  it('fires onSelect with the item id', () => {
    const onSelect = jest.fn();
    render(<RecommendationRow items={items} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: /Night Drive/ }));
    expect(onSelect).toHaveBeenCalledWith('r1');
  });
});
