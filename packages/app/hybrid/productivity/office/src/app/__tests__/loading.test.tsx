import { render } from '@testing-library/react';

import LoadingPage from '../loading';

describe('LoadingPage', () => {
  it('renders spinner', () => {
    const { container } = render(<LoadingPage />);
    expect(container.querySelector('.loading-spinner')).toBeInTheDocument();
  });
});
