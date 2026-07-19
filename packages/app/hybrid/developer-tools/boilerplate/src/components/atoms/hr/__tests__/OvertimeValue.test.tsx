import { render, screen } from '@testing-library/react';
import { OvertimeValue } from '../OvertimeValue';

describe('OvertimeValue', () => {
  it('renders positive hours with a plus sign', () => {
    render(<OvertimeValue hours={5} />);
    expect(screen.getByTestId('overtime-value')).toHaveTextContent('+5h');
    expect(screen.getByTestId('overtime-value')).toHaveClass('text-success');
  });

  it('renders negative hours without a plus sign', () => {
    render(<OvertimeValue hours={2} positive={false} />);
    expect(screen.getByTestId('overtime-value')).toHaveTextContent('2h');
    expect(screen.getByTestId('overtime-value')).toHaveClass('text-error');
  });
});
