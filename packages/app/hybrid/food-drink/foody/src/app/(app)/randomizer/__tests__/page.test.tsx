import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RandomizerPage from '@/app/(app)/randomizer/page';

const replace = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams('country=japanese'),
  useRouter: () => ({ replace }),
}));

describe('RandomizerPage', () => {
  beforeEach(() => {
    replace.mockClear();
  });

  it('renders the food randomizer reel', () => {
    render(<RandomizerPage />);
    expect(screen.getByTestId('reel-display')).toBeInTheDocument();
  });

  it('pre-selects the shared country query param', () => {
    render(<RandomizerPage />);
    expect(screen.getByTestId('cuisine-select-trigger')).toHaveTextContent(
      'Japan'
    );
  });

  it('updates the shareable URL when the country changes', async () => {
    const user = userEvent.setup();
    render(<RandomizerPage />);
    await user.click(screen.getByTestId('cuisine-select-trigger'));
    await user.click(screen.getByTitle('Italy'));
    expect(replace).toHaveBeenCalledWith('/randomizer?country=italian');
  });

  it('clears the country param when all is selected', async () => {
    const user = userEvent.setup();
    render(<RandomizerPage />);
    await user.click(screen.getByTestId('cuisine-select-trigger'));
    await user.click(screen.getByRole('button', { name: /All Cuisines/ }));
    expect(replace).toHaveBeenCalledWith('/randomizer');
  });
});
