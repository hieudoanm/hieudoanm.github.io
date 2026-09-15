import { render, screen } from '@testing-library/react';

jest.mock('@/components/csv/organisms/Editor', () => ({
  __esModule: true,
  default: () => <div data-testid="csv-editor">Editor</div>,
}));

import CsvPage from '@/app/(app)/csv/page';

describe('CsvPage', () => {
  it('renders Editor', () => {
    render(<CsvPage />);
    expect(screen.getByTestId('csv-editor')).toBeInTheDocument();
  });
});
