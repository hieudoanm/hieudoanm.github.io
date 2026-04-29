import { render } from '@testing-library/react';
import { QRCodeModal } from '../QRCodeModal';

describe('QRCodeModal', () => {
  it('should render', () => {
    const { container } = render(<QRCodeModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
