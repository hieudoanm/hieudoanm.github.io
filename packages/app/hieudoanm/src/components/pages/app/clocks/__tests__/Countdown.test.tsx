import { render, fireEvent, screen, act } from '@testing-library/react';
import { Countdown } from '../CountdownModal';

jest.useFakeTimers();

describe('Countdown', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  it('renders modal title', () => {
    render(<Countdown onClose={onClose} />);
    expect(screen.getByText('Countdown')).toBeInTheDocument();
  });

  it('renders default countdown units', () => {
    render(<Countdown onClose={onClose} />);
    expect(screen.getByText('yrs')).toBeInTheDocument();
    expect(screen.getByText('mo')).toBeInTheDocument();
    expect(screen.getByText('days')).toBeInTheDocument();
    expect(screen.getByText('hrs')).toBeInTheDocument();
    expect(screen.getByText('min')).toBeInTheDocument();
    expect(screen.getByText('sec')).toBeInTheDocument();
  });

  it('renders edit button', () => {
    render(<Countdown onClose={onClose} />);
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('shows editing mode when edit clicked', () => {
    render(<Countdown onClose={onClose} />);
    fireEvent.click(screen.getByText('Edit'));
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('renders progress bar', () => {
    render(<Countdown onClose={onClose} />);
    expect(document.querySelector('progress')).toBeInTheDocument();
  });

  it('allows editing title', () => {
    render(<Countdown onClose={onClose} />);
    fireEvent.click(screen.getByText('Edit'));
    const input = screen.getByDisplayValue('My Countdown');
    fireEvent.change(input, { target: { value: 'New Title' } });
    expect(input).toHaveValue('New Title');
  });

  it('updates subtitle after save', () => {
    render(<Countdown onClose={onClose} />);
    fireEvent.click(screen.getByText('Edit'));
    const input = screen.getByDisplayValue('My Countdown');
    fireEvent.change(input, { target: { value: 'Edited Title' } });
    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByText('Edited Title')).toBeInTheDocument();
  });

  it('exits edit mode on Cancel', () => {
    render(<Countdown onClose={onClose} />);
    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('progress value is a number', () => {
    render(<Countdown onClose={onClose} />);
    const progress = document.querySelector('progress');
    expect(progress).toHaveAttribute('value');
    expect(Number(progress!.getAttribute('value'))).toBeGreaterThanOrEqual(0);
  });
});
