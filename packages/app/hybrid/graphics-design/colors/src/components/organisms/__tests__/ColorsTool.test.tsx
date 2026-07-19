import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColorsTool } from '../ColorsTool';

jest.mock('../themeColors', () => ({
  useThemeColors: () => [
    { key: 'primary', label: 'Primary', value: '#6366f1' },
    { key: 'secondary', label: 'Secondary', value: '#ec4899' },
    { key: 'accent', label: 'Accent', value: '#22d3ee' },
  ],
}));

jest.mock('@/hooks/useClipboard', () => ({
  useClipboard: () => ({
    copied: null,
    copy: jest.fn().mockResolvedValue(undefined),
  }),
}));

describe('ColorsTool', () => {
  it('renders all swatches from the theme', () => {
    render(<ColorsTool />);
    expect(
      screen.getByRole('button', { name: 'Copy Primary' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Copy Secondary' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Copy Accent' })
    ).toBeInTheDocument();
  });

  it('displays the hex value text for each swatch', () => {
    render(<ColorsTool />);
    expect(screen.getByText('#6366f1')).toBeInTheDocument();
    expect(screen.getByText('#ec4899')).toBeInTheDocument();
    expect(screen.getByText('#22d3ee')).toBeInTheDocument();
  });

  it('calls onPick with the swatch value when a swatch is clicked', async () => {
    const onPick = jest.fn();
    const user = userEvent.setup();
    render(<ColorsTool onPick={onPick} />);
    await user.click(screen.getByRole('button', { name: 'Copy Primary' }));
    expect(onPick).toHaveBeenCalledWith('#6366f1');
  });

  it('renders the TheoryNote about Color Roles', () => {
    render(<ColorsTool />);
    expect(screen.getByText('Color Roles')).toBeInTheDocument();
  });
});
