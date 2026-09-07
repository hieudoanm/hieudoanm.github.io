import ContributePage from '@/app/(games)/public-goods-dilemma/contribute/page';
import { render, screen } from '@testing-library/react';

jest.mock('@/games/public-goods', () => ({
  PublicGoodsGame: () => <div>PublicGoodsGame</div>,
}));

describe('ContributePage', () => {
  it('renders the contribution game', () => {
    render(<ContributePage />);
    expect(
      screen.getByRole('heading', { name: /Contribute to the Public Good/ })
    ).toBeInTheDocument();
    expect(screen.getByText('PublicGoodsGame')).toBeInTheDocument();
  });
});
