import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { buildVersion } from '@/content/version';
import VersionPage from '@/app/(info)/version/page';

const writeText = jest.fn().mockResolvedValue(undefined);

describe('VersionPage', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  it('renders the build-time version with segments', async () => {
    render(<VersionPage />);
    const [year, month, day] = buildVersion.split('.');
    expect((await screen.findAllByText(year)).length).toBeGreaterThan(0);
    expect(screen.getAllByText(month).length).toBeGreaterThan(0);
    expect(screen.getAllByText(day).length).toBeGreaterThan(0);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
  });

  it('copies the version to the clipboard', async () => {
    render(<VersionPage />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy version' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(buildVersion));
    expect(await screen.findByText('Copied')).toBeInTheDocument();
  });
});
