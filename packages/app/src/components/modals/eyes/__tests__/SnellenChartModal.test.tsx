import { render } from '@testing-library/react';
import { SnellenChartModal } from '../SnellenChartModal';

describe('SnellenChartModal', () => {
  it('should render', () => {
    const { container } = render(<SnellenChartModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
