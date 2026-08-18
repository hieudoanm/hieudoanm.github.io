import { render, screen, waitFor } from '@testing-library/react';
import VersionPage from '@/app/version/page';

describe('VersionPage', () => {
  it('renders the current date-derived version', async () => {
    jest.useFakeTimers().setSystemTime(new Date('2026-08-05T12:30:45Z'));
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, '0');
    const expected = [
      now.getFullYear(),
      pad(now.getMonth() + 1),
      pad(now.getDate()),
      pad(now.getHours()),
      pad(now.getMinutes()),
      pad(now.getSeconds()),
    ].join('.');
    render(<VersionPage />);
    await waitFor(() => expect(screen.getByText(expected)).toBeInTheDocument());
    expect(screen.getByText('Copy version')).toBeInTheDocument();
    jest.useRealTimers();
  });
});
