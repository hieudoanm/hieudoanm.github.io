import { fireEvent, render, screen } from '@testing-library/react';
import { ColorPopover } from '../ColorPopover';

describe('ColorPopover', () => {
  it('renders button', () => {
    render(<ColorPopover />);
    expect(screen.getByText('Color popover ↓')).toBeInTheDocument();
  });

  it('shows popover on click', () => {
    render(<ColorPopover />);
    const btn = screen.getByText('Color popover ↓');
    fireEvent.click(btn);
    expect(screen.getByText('Choose accent color')).toBeInTheDocument();
  });

  it('hides popover on second click', () => {
    render(<ColorPopover />);
    const btn = screen.getByText('Color popover ↓');
    fireEvent.click(btn);
    expect(screen.getByText('Choose accent color')).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText('Choose accent color')).toBeNull();
  });

  it('renders color swatches when open', () => {
    render(<ColorPopover />);
    fireEvent.click(screen.getByText('Color popover ↓'));
    const swatches = screen.getAllByTitle(/Gold|Teal|Blue|Red|Orange|Purple/);
    expect(swatches).toHaveLength(6);
  });

  it('to match snapshot (closed)', () => {
    const { container } = render(<ColorPopover />);
    expect(container).toMatchSnapshot();
  });

  it('to match snapshot (open)', () => {
    const { container } = render(<ColorPopover />);
    fireEvent.click(screen.getByText('Color popover ↓'));
    expect(container).toMatchSnapshot();
  });
});
