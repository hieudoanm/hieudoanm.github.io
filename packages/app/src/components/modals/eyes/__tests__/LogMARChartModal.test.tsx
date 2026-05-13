import { render } from '@testing-library/react';
import { LogMARChartModal } from '../LogMARChartModal';

describe('LogMARChartModal', () => {
  it('should render', () => {
    const { container } = render(<LogMARChartModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
