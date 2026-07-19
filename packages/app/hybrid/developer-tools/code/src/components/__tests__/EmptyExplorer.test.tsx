import { render, screen } from '@testing-library/react';
import { EmptyExplorer } from '../EmptyExplorer';

describe('EmptyExplorer', () => {
  it('renders empty state message', () => {
    render(<EmptyExplorer />);
    expect(screen.getByText('Open a folder to start')).toBeInTheDocument();
  });
});
