import { render, screen } from '@testing-library/react';
import WhiteboardPage from '@/app/(templates)/landing/whiteboard/page';

describe('WhiteboardPage', () => {
  it('renders the WhiteboardPage', () => {
    render(<WhiteboardPage />);
    expect(screen.getByText('Black')).toBeInTheDocument();
  });
});
