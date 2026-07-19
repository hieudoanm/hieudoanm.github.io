import { render } from '@testing-library/react';
import { TanStackQueryClientProvider } from '../TanStackQueryClientProvider';

describe('TanStackQueryClientProvider', () => {
  it('renders children', () => {
    const { getByText } = render(
      <TanStackQueryClientProvider>
        <div>test child</div>
      </TanStackQueryClientProvider>
    );
    expect(getByText('test child')).toBeInTheDocument();
  });
});
