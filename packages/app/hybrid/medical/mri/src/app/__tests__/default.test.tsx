import { render, screen } from '@testing-library/react';
import DefaultPage from '@/app/default';

describe('DefaultPage', () => {
  it('renders nothing', () => {
    const { container } = render(<DefaultPage />);
    expect(container).toBeEmptyDOMElement();
  });
});
