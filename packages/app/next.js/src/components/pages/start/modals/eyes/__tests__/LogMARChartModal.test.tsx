import { render } from '@testing-library/react';
import { LogMARChartModal } from '../LogMARChartModal';

describe('LogMARChartModal', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render', () => {
    const { container } = render(<LogMARChartModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
