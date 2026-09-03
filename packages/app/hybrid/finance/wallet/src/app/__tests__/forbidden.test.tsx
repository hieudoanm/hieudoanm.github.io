import { render, screen } from '@testing-library/react';

import Forbidden from '../forbidden';

describe('Forbidden', () => {
  it('renders 403', () => {
    render(<Forbidden />);
    expect(screen.getByText('403')).toBeInTheDocument();
  });
});
