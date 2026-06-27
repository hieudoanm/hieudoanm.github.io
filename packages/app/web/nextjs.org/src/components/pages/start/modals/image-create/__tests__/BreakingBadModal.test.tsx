import { render, screen, fireEvent } from '@testing-library/react';
import { BreakingBadModal } from '../BreakingBadModal';

const renderBB = (onClose = jest.fn()) =>
  render(<BreakingBadModal onClose={onClose} />);

describe('BreakingBadModal', () => {
  it('should render with default name', () => {
    renderBB();
    expect(screen.getByDisplayValue('Breaking Bad')).toBeInTheDocument();
  });

  it('should render preset buttons', () => {
    renderBB();
    expect(screen.getByText('Breaking Bad')).toBeInTheDocument();
    expect(screen.getByText('Walter White')).toBeInTheDocument();
    expect(screen.getByText('Jesse Pinkman')).toBeInTheDocument();
    expect(screen.getByText('Heisenberg')).toBeInTheDocument();
    expect(screen.getByText('Saul Goodman')).toBeInTheDocument();
    expect(screen.getByText('Los Pollos')).toBeInTheDocument();
  });

  it('should highlight active preset button', () => {
    renderBB();
    const breakingBadBtn = screen.getByText('Breaking Bad');
    expect(breakingBadBtn.className).toContain('btn-primary');
    fireEvent.click(screen.getByText('Heisenberg'));
    expect(screen.getByText('Heisenberg').className).toContain('btn-primary');
    expect(breakingBadBtn.className).not.toContain('btn-primary');
  });

  it('should update name when preset clicked', () => {
    renderBB();
    fireEvent.click(screen.getByText('Heisenberg'));
    expect(screen.getByDisplayValue('Heisenberg')).toBeInTheDocument();
  });

  it('should update name on input change', () => {
    renderBB();
    const input = screen.getByDisplayValue('Breaking Bad');
    fireEvent.change(input, { target: { value: 'Custom Name' } });
    expect(screen.getByDisplayValue('Custom Name')).toBeInTheDocument();
  });

  it('should toggle colored checkbox', () => {
    renderBB();
    const coloredToggle = screen.getByLabelText('Colored');
    expect(coloredToggle).toBeChecked();
    fireEvent.click(coloredToggle);
    expect(coloredToggle).not.toBeChecked();
  });

  it('should toggle multiline checkbox', () => {
    renderBB();
    expect(screen.queryByText('Left')).not.toBeInTheDocument();
    const multilineToggle = screen.getByLabelText('Multiline');
    fireEvent.click(multilineToggle);
    expect(screen.getByText('Left')).toBeInTheDocument();
    expect(screen.getByText('Center')).toBeInTheDocument();
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('should switch align when multiline is active', () => {
    renderBB();
    fireEvent.click(screen.getByLabelText('Multiline'));
    fireEvent.click(screen.getByText('Right'));
    expect(screen.getByText('Right').className).toContain('btn-primary');
  });

  it('should hide align buttons when multiline is off', () => {
    renderBB();
    fireEvent.click(screen.getByLabelText('Multiline'));
    expect(screen.getByText('Left')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Multiline'));
    expect(screen.queryByText('Left')).not.toBeInTheDocument();
    expect(screen.queryByText('Center')).not.toBeInTheDocument();
    expect(screen.queryByText('Right')).not.toBeInTheDocument();
  });

  it('should render Preview component', () => {
    renderBB();
    expect(screen.getByText(/Download/)).toBeInTheDocument();
  });
});
