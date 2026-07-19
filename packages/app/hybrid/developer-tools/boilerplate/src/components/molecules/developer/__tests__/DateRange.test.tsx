import { fireEvent, render, screen } from '@testing-library/react';
import { DateRange } from '../DateRange';

describe('DateRange', () => {
  it('renders from and to date inputs', () => {
    render(
      <DateRange
        start="2026-08-01"
        end="2026-08-31"
        onStartChange={jest.fn()}
        onEndChange={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Date range start')).toHaveValue('2026-08-01');
    expect(screen.getByLabelText('Date range end')).toHaveValue('2026-08-31');
  });

  it('calls handlers on change', () => {
    const onStartChange = jest.fn();
    const onEndChange = jest.fn();
    render(
      <DateRange
        start="2026-08-01"
        end="2026-08-31"
        onStartChange={onStartChange}
        onEndChange={onEndChange}
      />
    );
    fireEvent.change(screen.getByLabelText('Date range start'), {
      target: { value: '2026-08-05' },
    });
    fireEvent.change(screen.getByLabelText('Date range end'), {
      target: { value: '2026-08-20' },
    });
    expect(onStartChange).toHaveBeenCalledWith('2026-08-05');
    expect(onEndChange).toHaveBeenCalledWith('2026-08-20');
  });

  it('applies min and max bounds to each input', () => {
    render(
      <DateRange
        start="2026-08-01"
        end="2026-08-31"
        onStartChange={jest.fn()}
        onEndChange={jest.fn()}
        min="2026-01-01"
        max="2026-12-31"
      />
    );
    expect(screen.getByLabelText('Date range start')).toHaveAttribute(
      'min',
      '2026-01-01'
    );
    expect(screen.getByLabelText('Date range start')).toHaveAttribute(
      'max',
      '2026-08-31'
    );
    expect(screen.getByLabelText('Date range end')).toHaveAttribute(
      'min',
      '2026-08-01'
    );
    expect(screen.getByLabelText('Date range end')).toHaveAttribute(
      'max',
      '2026-12-31'
    );
  });

  it('renders a custom label', () => {
    render(
      <DateRange
        label="Booking window"
        start=""
        end=""
        onStartChange={jest.fn()}
        onEndChange={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Booking window start')).toBeInTheDocument();
  });
});
