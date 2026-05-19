import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { StatusTab } from '../StatusTab';

describe('StatusTab', () => {
  it('should render', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <StatusTab />
      </QueryClientProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
