import { fireEvent, render, screen } from '@testing-library/react';
import { EloModal } from '../index';

describe('EloModal', () => {
  it('renders with rating tab by default', () => {
    render(<EloModal onClose={jest.fn()} />);
    expect(screen.getByText('Elo Calculator')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
    expect(screen.getByText('Performance')).toBeInTheDocument();
    expect(screen.getByText('Your Rating')).toBeInTheDocument();
  });

  it('shows rating tab as active by default', () => {
    render(<EloModal onClose={jest.fn()} />);
    expect(screen.getByText('Rating').classList.contains('tab-active')).toBe(
      true
    );
  });

  it('switches to performance tab', () => {
    render(<EloModal onClose={jest.fn()} />);
    const perfTab = screen.getAllByText('Performance')[0];
    fireEvent.click(perfTab);
    expect(perfTab.classList.contains('tab-active')).toBe(true);
    expect(screen.getByText('Add Game')).toBeInTheDocument();
  });

  it('calculates rating on button click', () => {
    render(<EloModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Calculate Rating'));
    const newRatingInput = screen.getByDisplayValue('1020');
    expect(newRatingInput).toBeInTheDocument();
  });

  it('switches back to rating tab from performance', () => {
    render(<EloModal onClose={jest.fn()} />);
    const perfTab = screen.getAllByText('Performance')[0];
    fireEvent.click(perfTab);
    fireEvent.click(screen.getByText('Rating'));
    expect(screen.getByText('Rating').classList.contains('tab-active')).toBe(
      true
    );
  });

  it('adds a game in performance tab', () => {
    render(<EloModal onClose={jest.fn()} />);
    const perfTab = screen.getAllByText('Performance')[0];
    fireEvent.click(perfTab);
    fireEvent.click(screen.getByText('Add Game'));
    const inputs = screen.getAllByDisplayValue('1800');
    expect(inputs).toHaveLength(2);
  });

  it('calculates performance on button click', () => {
    render(<EloModal onClose={jest.fn()} />);
    const perfTab = screen.getAllByText('Performance')[0];
    fireEvent.click(perfTab);
    fireEvent.click(screen.getByText('Calculate Performance'));
    expect(screen.getByDisplayValue('1850')).toBeInTheDocument();
  });

  it('updates player rating input', () => {
    render(<EloModal onClose={jest.fn()} />);
    const inputs = screen.getAllByDisplayValue('1000');
    fireEvent.change(inputs[0], { target: { value: '1200' } });
    expect(screen.getByDisplayValue('1200')).toBeInTheDocument();
  });

  it('updates opponent rating input', () => {
    render(<EloModal onClose={jest.fn()} />);
    const inputs = screen.getAllByDisplayValue('1000');
    fireEvent.change(inputs[1], { target: { value: '1500' } });
    expect(screen.getByDisplayValue('1500')).toBeInTheDocument();
  });

  it('changes score selection', () => {
    render(<EloModal onClose={jest.fn()} />);
    const select = screen.getByDisplayValue('Draw');
    fireEvent.change(select, { target: { value: 'win' } });
    expect(screen.getByDisplayValue('Win')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<EloModal onClose={onClose} />);
    const closeButtons = screen.getAllByText('✕');
    fireEvent.click(closeButtons[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('updates opponent rating in performance tab game row', () => {
    render(<EloModal onClose={jest.fn()} />);
    const perfTab = screen.getAllByText('Performance')[0];
    fireEvent.click(perfTab);
    const inputs = screen.getAllByDisplayValue('1800');
    fireEvent.change(inputs[0], { target: { value: '2000' } });
    expect(screen.getByDisplayValue('2000')).toBeInTheDocument();
  });

  it('changes score in performance tab game row', () => {
    render(<EloModal onClose={jest.fn()} />);
    const perfTab = screen.getAllByText('Performance')[0];
    fireEvent.click(perfTab);
    const selects = screen.getAllByDisplayValue('Win');
    fireEvent.change(selects[0], { target: { value: 'loss' } });
    expect(screen.getByDisplayValue('Loss')).toBeInTheDocument();
  });
});
