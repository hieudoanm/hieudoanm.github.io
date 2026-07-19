import { render } from '@testing-library/react';
import { PeriodicTable } from '../PeriodicTable';

describe('PeriodicTable', () => {
  it('should render', () => {
    const { container } = render(<PeriodicTable onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
