import { render } from '@testing-library/react';
import DefaultPage from '../default';

describe('DefaultPage', () => {
  it('is a function component', () => {
    expect(typeof DefaultPage).toBe('function');
  });

  it('renders nothing', () => {
    const { container } = render(<DefaultPage />);
    expect(container).toBeEmptyDOMElement();
  });
});
