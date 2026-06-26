import { render, screen, fireEvent } from '@testing-library/react';
import { LoremIpsumModal } from '../LoremIpsumModal';

const renderModal = (onClose = jest.fn()) =>
  render(<LoremIpsumModal onClose={onClose} />);

describe('LoremIpsumModal', () => {
  it('should render with default 3 paragraphs', () => {
    renderModal();
    expect(screen.getByText('3 paragraphs')).toBeInTheDocument();
  });

  it('should increase paragraph count', () => {
    renderModal();
    const buttons = screen.getAllByRole('button');
    const plus = buttons.find((b) => b.textContent === '+')!;
    fireEvent.click(plus);
    expect(screen.getByText('4 paragraphs')).toBeInTheDocument();
  });

  it('should decrease paragraph count', () => {
    renderModal();
    fireEvent.click(screen.getByText('×3'));
    expect(screen.getByText('3 paragraphs')).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    const minus = buttons.find((b) => b.textContent === '−')!;
    fireEvent.click(minus);
    expect(screen.getByText('2 paragraphs')).toBeInTheDocument();
  });

  it('should not go below 1 paragraph', () => {
    renderModal();
    fireEvent.click(screen.getByText('×1'));
    expect(screen.getByText('1 paragraph')).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    const minus = buttons.find((b) => b.textContent === '−')!;
    expect(minus).toBeDisabled();
  });

  it('should show preset buttons for 1, 3, 5', () => {
    renderModal();
    expect(screen.getByText('×1')).toBeInTheDocument();
    expect(screen.getByText('×3')).toBeInTheDocument();
    expect(screen.getByText('×5')).toBeInTheDocument();
  });

  it('should show char and word count', () => {
    renderModal();
    expect(screen.getByText(/chars/)).toBeInTheDocument();
    expect(screen.getByText(/words/)).toBeInTheDocument();
  });

  it('should have a read-only textarea with generated text', () => {
    renderModal();
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('readonly');
    expect(textarea).not.toHaveValue('');
  });

  it('should copy text to clipboard', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
    renderModal();
    fireEvent.click(screen.getByText('Copy'));
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(await screen.findByText('✓ Copied')).toBeInTheDocument();
  });
});
