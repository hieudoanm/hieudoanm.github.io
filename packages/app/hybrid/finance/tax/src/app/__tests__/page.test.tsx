import { render, screen, waitFor } from '@testing-library/react';
import RootPage from '../page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe('Root page', () => {
  it('redirects to /personal', async () => {
    const { useRouter } = require('next/navigation');
    render(<RootPage />);
    await waitFor(() => {
      expect(useRouter().replace).toHaveBeenCalledWith('/personal');
    });
  });
});
