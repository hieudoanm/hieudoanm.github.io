import { render, screen } from '@testing-library/react';
import ScenesPage from '@/app/(templates)/developer/scenes/page';

describe('ScenesPage', () => {
  it('renders the ScenesPage', () => {
    render(<ScenesPage />);
    expect(screen.getByRole('heading', { name: 'Scenes' })).toBeInTheDocument();
    expect(screen.getByText('4 scenes')).toBeInTheDocument();
  });
});
