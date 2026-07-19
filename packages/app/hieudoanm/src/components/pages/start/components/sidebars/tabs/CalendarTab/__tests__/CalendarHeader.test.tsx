import { fireEvent, render, screen } from '@testing-library/react';
import { CalendarHeader } from '../CalendarHeader';

describe('CalendarHeader', () => {
  const defaultProps = {
    month: 0,
    year: 2026,
    setMonth: jest.fn(),
    setYear: jest.fn(),
    handlePrev: jest.fn(),
    handleNext: jest.fn(),
  };

  it('should render', () => {
    const { container } = render(<CalendarHeader {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should call handlePrev on prev click', () => {
    render(<CalendarHeader {...defaultProps} />);
    fireEvent.click(screen.getByText('‹'));
    expect(defaultProps.handlePrev).toHaveBeenCalled();
  });

  it('should call handleNext on next click', () => {
    render(<CalendarHeader {...defaultProps} />);
    fireEvent.click(screen.getByText('›'));
    expect(defaultProps.handleNext).toHaveBeenCalled();
  });
});
