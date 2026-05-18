import { render } from '@testing-library/react';
import { TumblingEChartModal } from '../TumblingEChartModal';

describe('TumblingEChartModal', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render', () => {
    const { container } = render(<TumblingEChartModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
