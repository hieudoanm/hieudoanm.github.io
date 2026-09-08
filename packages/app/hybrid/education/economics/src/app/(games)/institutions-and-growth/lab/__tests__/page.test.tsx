import InstitutionsLabPage from '@/app/(games)/institutions-and-growth/lab/page';
import { render, screen } from '@testing-library/react';

jest.mock('@/games/institutions', () => ({
  InstitutionsGame: () => <div data-testid="institutions-game" />,
}));

describe('InstitutionsLabPage', () => {
  it('renders the institutions game', () => {
    render(<InstitutionsLabPage />);
    expect(
      screen.getByRole('heading', { name: /Institutions Game/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('institutions-game')).toBeInTheDocument();
  });
});
