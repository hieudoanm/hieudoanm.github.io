import { render, screen } from '@testing-library/react';
import ApiKeysPage from '@/app/(templates)/developer/api-keys/page';

describe('ApiKeysPage', () => {
  it('renders the ApiKeysPage', () => {
    render(<ApiKeysPage />);
    expect(screen.getByText('3 active keys')).toBeInTheDocument();
  });
});
