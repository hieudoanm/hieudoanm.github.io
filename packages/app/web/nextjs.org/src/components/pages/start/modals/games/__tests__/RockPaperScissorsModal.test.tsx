import { render } from '@testing-library/react';
import { RockPaperScissorsModal } from '../RockPaperScissorsModal';

describe('RockPaperScissorsModal', () => {
  it('should render', () => {
    const { container } = render(
      <RockPaperScissorsModal onClose={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });
});
