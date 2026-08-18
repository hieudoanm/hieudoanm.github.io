import { render, screen } from '@testing-library/react';
import VersionPage from '../page';

jest.mock('@/components/templates/VersionTemplate', () => ({
  VersionTemplate: ({ version }: { version: string }) => (
    <div data-testid="version">{version}</div>
  ),
}));

describe('VersionPage', () => {
  it('renders a generated timestamp version', () => {
    render(<VersionPage />);
    const version = screen.getByTestId('version').textContent ?? '';
    expect(version).toMatch(/^\d{4}\.\d{2}\.\d{2}\.\d{2}\.\d{2}\.\d{2}$/);
  });
});
