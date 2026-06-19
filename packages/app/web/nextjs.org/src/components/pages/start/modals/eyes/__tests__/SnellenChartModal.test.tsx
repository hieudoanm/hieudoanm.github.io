import { render } from '@testing-library/react';
import { SnellenChartModal } from '../SnellenChartModal';

describe('SnellenChartModal', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render', () => {
    const { container } = render(<SnellenChartModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
