import { render } from '@testing-library/react';
import { ConverterModal } from '../ConverterModal';

describe('ConverterModal', () => {
  it('should render', () => {
    const { container } = render(<ConverterModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
