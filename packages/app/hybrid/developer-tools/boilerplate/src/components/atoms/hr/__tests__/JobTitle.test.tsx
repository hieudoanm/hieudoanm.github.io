import { render, screen } from '@testing-library/react';
import { JobTitle } from '../JobTitle';

describe('JobTitle', () => {
  it('renders the title', () => {
    render(<JobTitle title="Frontend Engineer" />);
    expect(screen.getByTestId('job-title')).toHaveTextContent(
      'Frontend Engineer'
    );
  });

  it('applies the base styling classes', () => {
    render(<JobTitle title="Designer" />);
    expect(screen.getByTestId('job-title')).toHaveClass(
      'text-sm',
      'font-medium'
    );
  });
});
