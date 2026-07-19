import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GradientBuilder } from '../GradientBuilder';

const mockCopy = jest.fn().mockResolvedValue(undefined);
jest.mock('@/hooks/useClipboard', () => ({
  useClipboard: () => ({ copied: null, copy: mockCopy }),
}));

describe('GradientBuilder', () => {
  it('renders Stop inputs for the default two stops', () => {
    render(<GradientBuilder baseColor="#ff0000" />);
    expect(screen.getByLabelText('Stop 1 color')).toBeInTheDocument();
    expect(screen.getByLabelText('Stop 2 color')).toBeInTheDocument();
  });

  it('renders the Angle slider', () => {
    render(<GradientBuilder baseColor="#ff0000" />);
    expect(
      screen.getByRole('slider', { name: 'Gradient angle' })
    ).toBeInTheDocument();
  });

  it('renders the Radial checkbox', () => {
    render(<GradientBuilder baseColor="#ff0000" />);
    expect(screen.getByLabelText('Radial gradient')).toBeInTheDocument();
  });

  it('renders the Copy CSS button', () => {
    render(<GradientBuilder baseColor="#ff0000" />);
    expect(
      screen.getByRole('button', { name: 'Copy gradient' })
    ).toBeInTheDocument();
  });

  it('renders the gradient preview', () => {
    render(<GradientBuilder baseColor="#ff0000" />);
    expect(screen.getByLabelText('Gradient preview')).toBeInTheDocument();
  });

  it('shows the + Add stop button when fewer than 3 stops', () => {
    render(<GradientBuilder baseColor="#ff0000" />);
    expect(screen.getByText('+ Add stop')).toBeInTheDocument();
  });

  it('renders the TheoryNote about Gradients', () => {
    render(<GradientBuilder baseColor="#ff0000" />);
    expect(screen.getByText('Gradients')).toBeInTheDocument();
  });

  it('adds a third stop when clicking + Add stop', async () => {
    const user = userEvent.setup();
    render(<GradientBuilder baseColor="#ff0000" />);
    await user.click(screen.getByText('+ Add stop'));
    expect(screen.getByLabelText('Stop 3 color')).toBeInTheDocument();
  });

  it('toggles radial when the checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(<GradientBuilder baseColor="#ff0000" />);
    const checkbox = screen.getByLabelText('Radial gradient');
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('updates the angle when the slider changes', () => {
    render(<GradientBuilder baseColor="#ff0000" />);
    const slider = screen.getByRole('slider', { name: 'Gradient angle' });
    fireEvent.change(slider, { target: { value: '180' } });
    expect(screen.getByText('180°')).toBeInTheDocument();
  });

  it('changes a stop color via its color input', () => {
    render(<GradientBuilder baseColor="#ff0000" />);
    const stop1 = screen.getByLabelText('Stop 1 color');
    fireEvent.change(stop1, { target: { value: '#0000ff' } });
    expect(stop1).toHaveValue('#0000ff');
  });

  it('removes a stop once three exist', async () => {
    const user = userEvent.setup();
    render(<GradientBuilder baseColor="#ff0000" />);
    await user.click(screen.getByText('+ Add stop'));
    expect(screen.getByLabelText('Stop 3 color')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Remove stop 3' }));
    expect(screen.queryByLabelText('Stop 3 color')).not.toBeInTheDocument();
  });

  it('hides the remove buttons when only two stops exist', () => {
    render(<GradientBuilder baseColor="#ff0000" />);
    expect(
      screen.queryByRole('button', { name: 'Remove stop 1' })
    ).not.toBeInTheDocument();
  });

  it('invokes copy when the Copy CSS button is clicked', async () => {
    const user = userEvent.setup();
    render(<GradientBuilder baseColor="#ff0000" />);
    await user.click(screen.getByRole('button', { name: 'Copy gradient' }));
    expect(mockCopy).toHaveBeenCalled();
  });
});
