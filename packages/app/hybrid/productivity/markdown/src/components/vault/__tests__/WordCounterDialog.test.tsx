import { fireEvent, render, screen } from '@testing-library/react';
import { WordCounterDialog } from '../WordCounterDialog';

describe('WordCounterDialog', () => {
  const renderDialog = (
    props: Partial<React.ComponentProps<typeof WordCounterDialog>> = {}
  ): void => {
    render(
      <WordCounterDialog
        text="Hello world. Second sentence!"
        onTextChange={props.onTextChange ?? (() => undefined)}
        onClose={props.onClose ?? (() => undefined)}
      />
    );
  };

  it('renders stats for the given text', () => {
    renderDialog();
    expect(screen.getByTestId('stat-characters')).toHaveTextContent('29');
    expect(screen.getByTestId('stat-words')).toHaveTextContent('4');
    expect(screen.getByTestId('stat-sentences')).toHaveTextContent('2');
    expect(screen.getByTestId('stat-lines')).toHaveTextContent('1');
    expect(screen.getByTestId('stat-readingTime')).toHaveTextContent('1 min');
  });

  it.each([
    ['Lowercase', 'hello world. second sentence!'],
    ['Uppercase', 'HELLO WORLD. SECOND SENTENCE!'],
    ['Trim Spaces', 'Hello world. Second sentence!'],
  ])('applies the %s transform', (label, expected) => {
    const onTextChange = jest.fn();
    renderDialog({ onTextChange });
    fireEvent.click(screen.getByRole('button', { name: label }));
    expect(onTextChange).toHaveBeenCalledWith(expected);
  });

  it('copies text to the clipboard', () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    renderDialog();
    fireEvent.click(screen.getByRole('button', { name: 'Copy text' }));
    expect(writeText).toHaveBeenCalledWith('Hello world. Second sentence!');
  });

  it('closes via backdrop and close button', () => {
    const onClose = jest.fn();
    renderDialog({ onClose });
    fireEvent.click(screen.getByLabelText('Close word counter'));
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('word-counter-dialog').parentElement!);
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
