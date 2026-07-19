import { render, screen } from '@testing-library/react';

jest.mock('@/components/csv/organisms/Sheet', () => ({
  __esModule: true,
  Sheet: () => <div data-testid="csv-editor">Editor</div>,
}));

import SheetPage from '@/app/(app)/csv/page';

describe('SheetPage', () => {
  it('renders Editor', () => {
    render(<SheetPage />);
    expect(screen.getByTestId('csv-editor')).toBeInTheDocument();
  });
});
