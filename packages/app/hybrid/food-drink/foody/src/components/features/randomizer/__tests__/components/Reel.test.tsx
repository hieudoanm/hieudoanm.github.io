import { act, render, screen } from '@testing-library/react';
import { Reel } from '../../components/Reel';

describe('Reel', () => {
  it('shows the placeholder emoji when idle with no suggestion', () => {
    render(
      <Reel topics={['Pizza']} spinning={false} landed={false} current="" />
    );
    expect(screen.getByTestId('reel-display')).toHaveTextContent('🍽️');
    expect(screen.queryByText('Rolling…')).not.toBeInTheDocument();
  });

  it('links the landed dish to a Google search and labels the cuisine', () => {
    render(
      <Reel
        topics={['Pizza']}
        spinning={false}
        landed={true}
        current="Pizza"
        itemLabel="All Foods"
        cuisineLabel="🇮🇹 Italy"
      />
    );
    const link = screen.getByRole('link', { name: 'Pizza' });
    expect(link).toHaveAttribute(
      'href',
      'https://www.google.com/search?q=Pizza%20food'
    );
    expect(
      screen.getByText('Your Meal · 🇮🇹 Italy · All Foods')
    ).toBeInTheDocument();
  });

  it('cycles through topics while spinning', () => {
    jest.useFakeTimers();
    try {
      render(
        <Reel
          topics={['Pizza', 'Pasta']}
          spinning={true}
          landed={false}
          current="Pizza"
        />
      );
      expect(screen.getByText('Rolling…')).toBeInTheDocument();
      expect(screen.getByTestId('reel-display')).toHaveTextContent('Pizza');
      act(() => jest.advanceTimersByTime(80));
      expect(screen.getByTestId('reel-display')).toHaveTextContent('Pasta');
      act(() => jest.advanceTimersByTime(80));
      expect(screen.getByTestId('reel-display')).toHaveTextContent('Pizza');
    } finally {
      jest.useRealTimers();
    }
  });

  it('falls back to the first topic when the current topic is missing', () => {
    jest.useFakeTimers();
    try {
      render(
        <Reel
          topics={['Ramen', 'Sushi']}
          spinning={true}
          landed={false}
          current=""
        />
      );
      expect(screen.getByText('Rolling…')).toBeInTheDocument();
      act(() => jest.advanceTimersByTime(80));
      expect(screen.getByTestId('reel-display')).toHaveTextContent('Sushi');
      act(() => jest.advanceTimersByTime(80));
      expect(screen.getByTestId('reel-display')).toHaveTextContent('Ramen');
    } finally {
      jest.useRealTimers();
    }
  });
});
