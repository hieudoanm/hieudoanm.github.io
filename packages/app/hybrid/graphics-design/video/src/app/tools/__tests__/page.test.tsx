import { render, screen } from '@testing-library/react';
import ToolsPage from '@/app/tools/page';

describe('tools page', () => {
  it('renders the video tools page', () => {
    render(<ToolsPage />);
    expect(
      screen.getByRole('heading', { name: 'Video Tools' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Select a video tool from the sidebar')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search tools...')).toBeInTheDocument();
  });
});
