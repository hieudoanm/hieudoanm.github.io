import { render } from '@testing-library/react';

import DefaultPage from '../default';

describe('DefaultPage', () => {
  it('renders nothing', () => {
    const { container } = render(<DefaultPage />);
    expect(container.firstChild).toBeNull();
  });
});
