import { render } from '@testing-library/react';
import { Game2048Modal } from '../Game2048Modal';

describe('Game2048Modal', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render', () => {
    const { container } = render(<Game2048Modal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
