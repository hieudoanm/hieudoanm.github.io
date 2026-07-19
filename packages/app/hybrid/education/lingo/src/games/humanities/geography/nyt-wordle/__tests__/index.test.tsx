import { fireEvent, render, screen } from '@testing-library/react';
import { MAX_GUESSES } from '../types';
import { Wordle } from '../index';

const typeWord = (word: string): void => {
  for (const letter of word) {
    fireEvent.click(screen.getByTestId(`wordle-key-${letter}`));
  }
};

describe('Wordle', () => {
  it('renders the board with six rows of answer-length tiles', () => {
    render(<Wordle initialAnswer="CHILE" />);
    expect(screen.getByText('Country Wordle')).toBeInTheDocument();
    expect(screen.getAllByTestId(/^wordle-tile-\d+-\d+$/)).toHaveLength(
      MAX_GUESSES * 5
    );
  });

  it('types via the on-screen keyboard into the current row', () => {
    render(<Wordle initialAnswer="CHILE" />);
    typeWord('CHA');
    expect(screen.getByTestId('wordle-tile-0-0')).toHaveTextContent('C');
    expect(screen.getByTestId('wordle-tile-0-1')).toHaveTextContent('H');
    expect(screen.getByTestId('wordle-tile-0-2')).toHaveTextContent('A');
    expect(screen.getByTestId('wordle-tile-0-3')).toHaveTextContent('');
  });

  it('supports physical keyboard input and backspace', () => {
    render(<Wordle initialAnswer="CHILE" />);
    fireEvent.keyDown(window, { key: 'c' });
    fireEvent.keyDown(window, { key: 'h' });
    fireEvent.keyDown(window, { key: 'Backspace' });
    typeWord('A'); // on-screen still works
    expect(screen.getByTestId('wordle-tile-0-0')).toHaveTextContent('C');
    expect(screen.getByTestId('wordle-tile-0-1')).toHaveTextContent('A');
    expect(screen.getByTestId('wordle-tile-0-2')).toHaveTextContent('');
  });

  it('ignores modified keys', () => {
    render(<Wordle initialAnswer="CHILE" />);
    fireEvent.keyDown(window, { key: 'c', metaKey: true });
    fireEvent.keyDown(window, { key: 'c', ctrlKey: true });
    fireEvent.keyDown(window, { key: 'c', altKey: true });
    expect(screen.getByTestId('wordle-tile-0-0')).toHaveTextContent('');
  });

  it('shows a validation message for an incomplete guess', () => {
    render(<Wordle initialAnswer="CHILE" />);
    typeWord('CHA');
    fireEvent.click(screen.getByTestId('wordle-enter'));
    expect(screen.getByTestId('wordle-message')).toHaveTextContent(
      'Not enough letters'
    );
  });

  it('colors tiles green and shows the win alert on success', () => {
    render(<Wordle initialAnswer="CHILE" />);
    typeWord('CHILE');
    fireEvent.click(screen.getByTestId('wordle-enter'));
    expect(screen.getByTestId('wordle-status')).toHaveTextContent(
      'Correct! Solved in 1 guess.'
    );
    for (let column = 0; column < 5; column += 1) {
      expect(screen.getByTestId(`wordle-tile-0-${column}`)).toHaveClass(
        'bg-success'
      );
    }
    expect(screen.getByTestId('wordle-key-C')).toHaveClass('bg-success');
  });

  it('colors absent tiles gray on a wrong guess', () => {
    render(<Wordle initialAnswer="CHILE" />);
    typeWord('JAPAN');
    fireEvent.click(screen.getByTestId('wordle-enter'));
    expect(screen.getByTestId('wordle-tile-0-0')).toHaveClass('bg-neutral');
    expect(screen.queryByTestId('wordle-status')).not.toBeInTheDocument();
  });

  it('reveals the loss after six failed guesses', () => {
    render(<Wordle initialAnswer="CHILE" />);
    const fillers = ['GHANA', 'INDIA', 'KENYA', 'MALTA', 'EGYPT', 'SUDAN'];
    for (const filler of fillers) {
      typeWord(filler);
      fireEvent.click(screen.getByTestId('wordle-enter'));
    }
    expect(screen.getByTestId('wordle-status')).toHaveTextContent(
      'The country was CHILE'
    );
  });

  it('starts a new game from the header button', () => {
    render(<Wordle initialAnswer="CHILE" />);
    typeWord('CHILE');
    fireEvent.click(screen.getByTestId('wordle-enter'));
    expect(screen.getByTestId('wordle-status')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('wordle-new-game'));
    expect(screen.queryByTestId('wordle-status')).not.toBeInTheDocument();
    expect(screen.getByTestId('wordle-tile-0-0')).toHaveTextContent('');
  });

  it('uses DEL to remove the last typed letter', () => {
    render(<Wordle initialAnswer="CHILE" />);
    typeWord('CHA');
    fireEvent.click(screen.getByTestId('wordle-backspace'));
    expect(screen.getByTestId('wordle-tile-0-2')).toHaveTextContent('');
  });
});
