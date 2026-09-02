import { render } from '@testing-library/react';
import UnauthorizedPage from '@/app/unauthorized';

describe('UnauthorizedPage', () => {
  it('renders 401', () => {
    const { getByText } = render(<UnauthorizedPage />);
    expect(getByText('401')).toBeInTheDocument();
  });
});
