import { render, screen } from '@testing-library/react';
import { DealPriority } from '../DealPriority';

describe('DealPriority', () => {
  it('renders the default label and class for high', () => {
    render(<DealPriority priority="high" />);
    expect(screen.getByText('High')).toHaveClass('badge-error');
  });

  it('renders a custom label', () => {
    render(<DealPriority priority="low" label="Urgent" />);
    expect(screen.getByText('Urgent')).toHaveClass('badge-info');
  });

  it.each([
    ['low', 'badge-info'],
    ['medium', 'badge-warning'],
    ['high', 'badge-error'],
  ] as const)('maps %s priority to %s', (priority, expected) => {
    render(<DealPriority priority={priority} />);
    expect(screen.getByTestId('deal-priority')).toHaveClass(expected);
  });
});
