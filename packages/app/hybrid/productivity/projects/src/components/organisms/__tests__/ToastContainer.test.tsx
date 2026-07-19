import { render } from '@testing-library/react';
import { ToastContainer } from '@/components/organisms/ToastContainer';

describe('ToastContainer', () => {
  it('renders nothing', () => {
    const { container } = render(<ToastContainer />);
    expect(container).toBeEmptyDOMElement();
  });
});
