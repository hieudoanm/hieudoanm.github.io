import { render } from '@testing-library/react';
import { SnakeModal } from '../SnakeModal';

describe('SnakeModal', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render', () => {
    const { container } = render(<SnakeModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
