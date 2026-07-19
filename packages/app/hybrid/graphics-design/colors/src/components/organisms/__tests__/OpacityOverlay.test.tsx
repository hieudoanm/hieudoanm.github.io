import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OpacityOverlay } from '../OpacityOverlay';

jest.mock('@/hooks/useClipboard', () => ({
  useClipboard: () => ({
    copied: null,
    copy: jest.fn().mockResolvedValue(undefined),
  }),
}));

describe('OpacityOverlay', () => {
  it('renders On white and On black sections', () => {
    render(<OpacityOverlay baseColor="#ff0000" />);
    expect(screen.getByText('On white')).toBeInTheDocument();
    expect(screen.getByText('On black')).toBeInTheDocument();
  });

  it('renders opacity swatches for On white at various percentages', () => {
    render(<OpacityOverlay baseColor="#ff0000" />);
    expect(screen.getByLabelText('On white at 100%')).toBeInTheDocument();
    expect(screen.getByLabelText('On white at 50%')).toBeInTheDocument();
    expect(screen.getByLabelText('On white at 10%')).toBeInTheDocument();
  });

  it('renders opacity swatches for On black at various percentages', () => {
    render(<OpacityOverlay baseColor="#ff0000" />);
    expect(screen.getByLabelText('On black at 100%')).toBeInTheDocument();
    expect(screen.getByLabelText('On black at 25%')).toBeInTheDocument();
  });

  it('renders copy buttons for each swatch', () => {
    render(<OpacityOverlay baseColor="#ff0000" />);
    const copyButtons = screen.getAllByRole('button', {
      name: /^Copy /i,
    });
    expect(copyButtons.length).toBeGreaterThan(0);
  });

  it('renders the TheoryNote about Opacity and Alpha Compositing', () => {
    render(<OpacityOverlay baseColor="#ff0000" />);
    expect(
      screen.getByText('Opacity and Alpha Compositing')
    ).toBeInTheDocument();
  });

  it('renders the container with data-testid', () => {
    render(<OpacityOverlay baseColor="#6366f1" />);
    expect(screen.getByTestId('opacity-overlay')).toBeInTheDocument();
  });
});
