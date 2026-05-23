import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { StatusTab } from '../StatusTab';

const renderStatusTab = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <StatusTab />
    </QueryClientProvider>
  );
};

describe('StatusTab', () => {
  it('should render and filter services', () => {
    renderStatusTab();

    // Check if initial services are rendered (e.g., github)
    expect(screen.getByText(/github/i)).toBeInTheDocument();

    // Find search input
    const input = screen.getByPlaceholderText(/search services/i);

    // Filter for "github"
    fireEvent.change(input, { target: { value: 'github' } });

    // github should still be there
    expect(screen.getByText(/github/i)).toBeInTheDocument();

    // trello should be gone (atlassian category)
    expect(screen.queryByText(/trello/i)).not.toBeInTheDocument();

    // Check footer updates
    expect(screen.getByText(/1 found/i)).toBeInTheDocument();

    // Clear search
    const clearButton = screen.getByTitle(/clear search/i);
    fireEvent.click(clearButton);

    // trello should be back
    expect(screen.getByText(/trello/i)).toBeInTheDocument();
  });

  it('should show empty state when no matches', () => {
    renderStatusTab();
    const input = screen.getByPlaceholderText(/search services/i);
    fireEvent.change(input, { target: { value: 'nonexistent-service' } });

    expect(screen.getByText(/no matching services found/i)).toBeInTheDocument();
    expect(screen.getByText(/0 found/i)).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = renderStatusTab();
    expect(container).toMatchSnapshot();
  });
});
