import { render } from '@testing-library/react';
import { ToastContainer } from '@/components/organisms/ToastContainer';

describe('ToastContainer', () => {
  it('renders nothing', () => {
    render(<ToastContainer />);
    expect(document.body.childElementCount).toBeGreaterThanOrEqual(1);
  });
});
