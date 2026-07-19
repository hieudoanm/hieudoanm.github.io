import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RandomColor } from '../RandomColor';

jest.mock('@/lib/colors', () => ({
  randomColor: jest.fn(() => '#123456'),
}));

describe('RandomColor', () => {
  it('renders a random color preview and button', () => {
    render(<RandomColor />);
    expect(screen.getByLabelText('Random color preview')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Random Color/ })
    ).toBeInTheDocument();
  });

  it('renders a HEX copy row', () => {
    render(<RandomColor />);
    expect(screen.getByText('HEX')).toBeInTheDocument();
  });

  it('renders an RGB copy row when unlocked', () => {
    render(<RandomColor />);
    expect(screen.getByText('RGB')).toBeInTheDocument();
  });

  it('has a lock checkbox', () => {
    render(<RandomColor />);
    expect(screen.getByLabelText('Lock color')).toBeInTheDocument();
  });

  it('shows locked message and hides RGB after locking', async () => {
    const user = userEvent.setup();
    render(<RandomColor />);
    await user.click(screen.getByLabelText('Lock color'));
    expect(
      screen.getByText('Locked — roll again to change')
    ).toBeInTheDocument();
    expect(screen.queryByText('RGB')).not.toBeInTheDocument();
  });

  it('renders the theory note', () => {
    render(<RandomColor />);
    expect(
      screen.getAllByRole('heading', { level: 3, name: /Random Color/i }).length
    ).toBeGreaterThan(0);
  });
});
