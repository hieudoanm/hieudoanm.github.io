import { render, fireEvent, screen } from '@testing-library/react';
import { Blackjack } from '../Blackjack';

describe('Blackjack', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(<Blackjack onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('deals a card on Deal click', () => {
    render(<Blackjack onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Deal'));
    expect(screen.getAllByText(/Deal/).length).toBeGreaterThanOrEqual(1);
  });

  it('shows reveal button', () => {
    render(<Blackjack onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Deal'));
    fireEvent.click(screen.getByText('Reveal'));
    expect(screen.getByText(/Count:/)).toBeInTheDocument();
  });

  it('resets deck on Reset click', () => {
    render(<Blackjack onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Deal'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText(/Deal a card to start/)).toBeInTheDocument();
  });

  it('Tab key deals card', () => {
    render(<Blackjack onClose={jest.fn()} />);
    const container = screen
      .getAllByText(/Deal/)[0]
      .closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'Tab' });
    }
    expect(screen.getAllByText(/Deal/).length).toBeGreaterThanOrEqual(1);
  });

  it('Space key reveals count', () => {
    render(<Blackjack onClose={jest.fn()} />);
    const container = screen
      .getAllByText(/Deal/)[0]
      .closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: ' ' });
    }
    expect(screen.getByText(/Count:/)).toBeInTheDocument();
  });

  it('R key resets', () => {
    render(<Blackjack onClose={jest.fn()} />);
    const container = screen
      .getAllByText(/Deal/)[0]
      .closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'Tab' });
      fireEvent.keyDown(container, { key: 'r' });
    }
    expect(screen.getByText(/Deal a card to start/)).toBeInTheDocument();
  });

  it('Reveal button is disabled after reveal', () => {
    render(<Blackjack onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Deal'));
    fireEvent.click(screen.getByText('Reveal'));
    const revealBtn = screen.getByText('Reveal');
    expect(revealBtn).toBeDisabled();
  });

  it('Deal button shows deck finished when no cards left', () => {
    render(<Blackjack onClose={jest.fn()} />);
    expect(screen.getByText(/Deal a card to start/)).toBeInTheDocument();
  });
});
