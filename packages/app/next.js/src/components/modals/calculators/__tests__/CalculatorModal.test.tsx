import { render } from '@testing-library/react';
import { CalculatorModal } from '../CalculatorModal';

describe('CalculatorModal', () => {
  it('should render', () => {
    const { container } = render(<CalculatorModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
