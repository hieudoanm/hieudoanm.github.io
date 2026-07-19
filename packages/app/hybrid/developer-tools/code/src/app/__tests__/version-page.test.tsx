import { render, screen } from '@testing-library/react';
import { buildVersion } from '@/content/version';
import VersionPage from '../(info)/version/page';

describe('VersionPage', () => {
  it('renders the build-time version segments', () => {
    render(<VersionPage />);
    const [year, month, day, hh, mm, ss] = buildVersion.split('.');
    expect(screen.getByText(year)).toBeInTheDocument();
    expect(screen.getByText(month)).toBeInTheDocument();
    expect(screen.getByText(day)).toBeInTheDocument();
    expect(screen.getByText(hh)).toBeInTheDocument();
    expect(screen.getByText(mm)).toBeInTheDocument();
    expect(screen.getByText(ss)).toBeInTheDocument();
  });

  it('renders segment labels', () => {
    render(<VersionPage />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });
});
