import { render } from '@testing-library/react';
import { SuccessMark } from '@/components/pos/atoms/SuccessMark';

describe('SuccessMark', () => {
  it('renders the check icon container', () => {
    const { container } = render(<SuccessMark />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('bg-success/20');
  });
});
