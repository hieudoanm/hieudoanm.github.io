import { render, screen } from '@testing-library/react';

jest.mock('@/components/csv/organisms/LiteSheet', () => ({
  __esModule: true,
  LiteSheet: () => <div data-testid="lite-csv">LiteSheet</div>,
}));

import LiteSheetPage from '@/app/(app)/(lite)/lite/csv/page';

describe('LiteSheetPage', () => {
  it('renders LiteSheet', () => {
    render(<LiteSheetPage />);
    expect(screen.getByTestId('lite-csv')).toBeInTheDocument();
  });
});
