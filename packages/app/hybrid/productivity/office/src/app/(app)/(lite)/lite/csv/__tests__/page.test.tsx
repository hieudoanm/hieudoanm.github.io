import { render, screen } from '@testing-library/react';

jest.mock('@/components/csv/organisms/LiteCsv', () => ({
  __esModule: true,
  default: () => <div data-testid="lite-csv">LiteCsv</div>,
}));

import LiteCsvPage from '@/app/(app)/(lite)/lite/csv/page';

describe('LiteCsvPage', () => {
  it('renders LiteCsv', () => {
    render(<LiteCsvPage />);
    expect(screen.getByTestId('lite-csv')).toBeInTheDocument();
  });
});
