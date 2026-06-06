import { render } from '@testing-library/react';
import { PrisonerDilemmaModal } from '../PrisonerDilemmaModal';

describe('PrisonerDilemmaModal', () => {
  it('should render', () => {
    const { container } = render(<PrisonerDilemmaModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
