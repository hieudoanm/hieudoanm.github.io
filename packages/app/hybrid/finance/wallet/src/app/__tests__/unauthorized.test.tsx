import { render, screen } from '@testing-library/react';

import Unauthorized from '../unauthorized';

describe('Unauthorized', () => {
  it('renders 401', () => {
    render(<Unauthorized />);
    expect(screen.getByText('401')).toBeInTheDocument();
  });
});
