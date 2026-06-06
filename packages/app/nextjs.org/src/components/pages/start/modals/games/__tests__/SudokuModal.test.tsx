import { render } from '@testing-library/react';
import { SudokuModal } from '../SudokuModal';

describe('SudokuModal', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render', () => {
    const { container } = render(<SudokuModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
