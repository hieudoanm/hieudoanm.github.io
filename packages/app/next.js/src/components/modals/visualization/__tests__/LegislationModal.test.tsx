import { render } from '@testing-library/react';
import { LegislationModal } from '../LegislationModal';

describe('LegislationModal', () => {
  it('should render', () => {
    const { container } = render(<LegislationModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
