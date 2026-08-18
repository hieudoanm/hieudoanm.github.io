import { render, screen } from '@testing-library/react';
import TimesheetsPage from '@/app/(templates)/mail/timesheets/page';

describe('TimesheetsPage', () => {
  it('renders the TimesheetsPage', () => {
    render(<TimesheetsPage />);
    expect(screen.getByText('Total 14h')).toBeInTheDocument();
  });
});
