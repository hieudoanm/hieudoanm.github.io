import { render } from '@testing-library/react';
import { CronModal } from '../CronModal';

describe('CronModal', () => {
  it('should render', () => {
    const { container } = render(<CronModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
