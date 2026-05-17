import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ShortcutsModal } from '../ShortcutsModal';

describe('ShortcutsModal', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <ShortcutsModal open={false} onClose={() => {}} />
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders shortcut groups when open', () => {
    render(<ShortcutsModal open={true} onClose={() => {}} />);
    expect(screen.getByText('Keyboard Shortcuts')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Editor')).toBeInTheDocument();
    expect(screen.getByText('Tabs')).toBeInTheDocument();
  });

  it('renders individual shortcuts', () => {
    render(<ShortcutsModal open={true} onClose={() => {}} />);
    expect(screen.getByText('Toggle sidebar')).toBeInTheDocument();
    expect(screen.getByText('Save file')).toBeInTheDocument();
    expect(screen.getByText('Close tab')).toBeInTheDocument();
  });

  it('renders kbd elements with key names', () => {
    render(<ShortcutsModal open={true} onClose={() => {}} />);
    expect(screen.getByText('Cmd+B')).toBeInTheDocument();
    expect(screen.getByText('Cmd+S')).toBeInTheDocument();
  });

  it('calls onClose when overlay is clicked', async () => {
    const onClose = jest.fn();
    const { container } = render(
      <ShortcutsModal open={true} onClose={onClose} />
    );
    const overlay = container.firstChild as HTMLElement;
    await userEvent.click(overlay);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn();
    render(<ShortcutsModal open={true} onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: '×' }));
    expect(onClose).toHaveBeenCalled();
  });
});
