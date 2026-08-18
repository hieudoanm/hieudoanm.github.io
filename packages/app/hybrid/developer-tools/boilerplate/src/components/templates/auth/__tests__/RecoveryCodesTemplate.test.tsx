import { fireEvent, render, screen } from '@testing-library/react';
import RecoveryCodesPage from '@/app/(templates)/auth/recovery-codes/page';
import { RecoveryCodesTemplate } from '../RecoveryCodesTemplate';

describe('RecoveryCodesTemplate', () => {
  it('renders masked codes by default', () => {
    render(<RecoveryCodesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Recovery codes' })
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(
        '\u2022\u2022\u2022\u2022-\u2022\u2022\u2022\u2022-\u2022\u2022\u2022\u2022'
      )
    ).toHaveLength(8);
    expect(screen.queryByText('7F2K-9QXP-L4MN')).not.toBeInTheDocument();
  });

  it('reveals and hides the codes via the toggle', () => {
    render(<RecoveryCodesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Reveal codes' }));
    expect(screen.getByText('7F2K-9QXP-L4MN')).toBeInTheDocument();
    expect(
      screen.queryAllByText(
        '\u2022\u2022\u2022\u2022-\u2022\u2022\u2022\u2022-\u2022\u2022\u2022\u2022'
      )
    ).toHaveLength(0);
    fireEvent.click(screen.getByRole('button', { name: 'Hide codes' }));
    expect(screen.queryByText('7F2K-9QXP-L4MN')).not.toBeInTheDocument();
  });

  it('regenerates the codes and shows a confirmation', () => {
    render(<RecoveryCodesTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Regenerate codes' }));
    expect(screen.getByText('Codes regenerated')).toBeInTheDocument();
    expect(screen.getByText('RN01-F2K4-M7QT')).toBeInTheDocument();
    expect(screen.queryByText('7F2K-9QXP-L4MN')).not.toBeInTheDocument();
  });

  it('renders the RecoveryCodesPage', () => {
    render(<RecoveryCodesPage />);
    expect(
      screen.getByRole('heading', { name: 'Recovery codes' })
    ).toBeInTheDocument();
  });
});
