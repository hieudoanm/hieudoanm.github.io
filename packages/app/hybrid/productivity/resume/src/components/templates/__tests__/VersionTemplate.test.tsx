import { fireEvent, render, screen } from '@testing-library/react';
import { VersionTemplate } from '../VersionTemplate';

describe('VersionTemplate', () => {
  it('copies the version to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<VersionTemplate version="2024.01.01" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy version' }));
    expect(writeText).toHaveBeenCalledWith('2024.01.01');
  });
});
