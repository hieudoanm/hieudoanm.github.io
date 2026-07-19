import { render } from '@testing-library/react';
import { PeriodicTableModal } from '../PeriodicTableModal';

describe('PeriodicTableModal', () => {
  it('should render', () => {
    const { container } = render(<PeriodicTableModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
