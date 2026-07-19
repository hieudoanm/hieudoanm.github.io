import { render } from '@testing-library/react';

import Default from '../default';

describe('Default', () => {
  it('renders nothing', () => {
    const { container } = render(<Default />);
    expect(container.innerHTML).toBe('');
  });
});
