import { render, screen } from '@testing-library/react';
import ImportPage from '@/app/(templates)/mail/import/page';

describe('ImportPage', () => {
  it('renders the ImportPage', () => {
    render(<ImportPage />);
    expect(
      screen.getByText('Choose a CSV file to get started.')
    ).toBeInTheDocument();
  });
});
