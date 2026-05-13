import { render } from '@testing-library/react';
import { TumblingEChartModal } from '../TumblingEChartModal';

describe('TumblingEChartModal', () => {
  it('should render', () => {
    const { container } = render(<TumblingEChartModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
