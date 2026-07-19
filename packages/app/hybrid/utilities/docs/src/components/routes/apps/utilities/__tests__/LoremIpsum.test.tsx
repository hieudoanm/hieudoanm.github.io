import { render, screen, fireEvent, within } from '@testing-library/react';
import { LoremIpsum } from '../LoremIpsum';

const renderModal = (onClose = jest.fn()) =>
  render(<LoremIpsum onClose={onClose} />);

const getTextarea = () => screen.getByRole('textbox') as HTMLTextAreaElement;

const getCountInput = () =>
  screen.getByTestId('lorem-count') as HTMLInputElement;

const getUnitLabel = () => screen.getByTestId('lorem-unit-label');

const clickTab = (name: string) =>
  fireEvent.click(screen.getByRole('tab', { name }));

const byteLength = (text: string) => new TextEncoder().encode(text).length;

const stats = () => within(screen.getByTestId('lorem-stats'));

describe('LoremIpsum', () => {
  it('should render with default 3 paragraphs', () => {
    renderModal();
    expect(getCountInput()).toHaveValue(3);
    expect(getUnitLabel()).toHaveTextContent('paragraphs');
  });

  it('should render unit tabs for paragraphs, words, bytes and lists', () => {
    renderModal();
    expect(screen.getByRole('tab', { name: 'paragraphs' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'words' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'bytes' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'lists' })).toBeInTheDocument();
  });

  it('should increase paragraph count', () => {
    renderModal();
    const buttons = screen.getAllByRole('button');
    const plus = buttons.find((b) => b.textContent === '+')!;
    fireEvent.click(plus);
    expect(getCountInput()).toHaveValue(4);
  });

  it('should decrease paragraph count', () => {
    renderModal();
    fireEvent.click(screen.getByText('×3'));
    expect(getCountInput()).toHaveValue(3);
    const buttons = screen.getAllByRole('button');
    const minus = buttons.find((b) => b.textContent === '−')!;
    fireEvent.click(minus);
    expect(getCountInput()).toHaveValue(2);
  });

  it('should not go below 1 paragraph', () => {
    renderModal();
    fireEvent.click(screen.getByText('×1'));
    expect(getCountInput()).toHaveValue(1);
    expect(getUnitLabel()).toHaveTextContent('paragraph');
    const buttons = screen.getAllByRole('button');
    const minus = buttons.find((b) => b.textContent === '−')!;
    expect(minus).toBeDisabled();
  });

  it('should show preset buttons for paragraphs', () => {
    renderModal();
    expect(screen.getByText('×1')).toBeInTheDocument();
    expect(screen.getByText('×3')).toBeInTheDocument();
    expect(screen.getByText('×5')).toBeInTheDocument();
  });

  it('should show char, word and byte counts', () => {
    renderModal();
    expect(stats().getByText(/chars/)).toBeInTheDocument();
    expect(stats().getByText(/words/)).toBeInTheDocument();
    expect(stats().getByText(/bytes/)).toBeInTheDocument();
  });

  it('should have a read-only textarea with generated text', () => {
    renderModal();
    expect(getTextarea()).toHaveAttribute('readonly');
    expect(getTextarea()).not.toHaveValue('');
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

  it('should accept a custom value typed into the count input', () => {
    renderModal();
    fireEvent.change(getCountInput(), { target: { value: '12' } });
    expect(getCountInput()).toHaveValue(12);
    expect(getTextarea().value.split(/\n\n/)).toHaveLength(12);
  });

  it('should clamp a typed custom value to the unit max', () => {
    renderModal();
    clickTab('words');
    fireEvent.change(getCountInput(), { target: { value: '500' } });
    expect(getCountInput()).toHaveValue(200);
  });

  it('should generate exactly the requested number of words', () => {
    renderModal();
    clickTab('words');
    expect(getCountInput()).toHaveValue(10);
    expect(getTextarea().value.split(/\s+/)).toHaveLength(10);
  });

  it('should generate exactly the requested number of bytes', () => {
    renderModal();
    clickTab('bytes');
    expect(getCountInput()).toHaveValue(100);
    expect(byteLength(getTextarea().value)).toBe(100);
  });

  it('should generate a bulleted list when switching to lists', () => {
    renderModal();
    clickTab('lists');
    expect(getCountInput()).toHaveValue(3);
    expect(getUnitLabel()).toHaveTextContent('list items');
    const value = getTextarea().value;
    expect(value.split('\n')).toHaveLength(3);
    expect(value.startsWith('•')).toBe(true);
  });

  it('should step by 100 for bytes', () => {
    renderModal();
    clickTab('bytes');
    const buttons = screen.getAllByRole('button');
    const plus = buttons.find((b) => b.textContent === '+')!;
    fireEvent.click(plus);
    expect(getCountInput()).toHaveValue(200);
  });

  it('should hide preset buttons for words and bytes', () => {
    renderModal();
    clickTab('bytes');
    expect(screen.queryByText('×1')).not.toBeInTheDocument();
  });
});
