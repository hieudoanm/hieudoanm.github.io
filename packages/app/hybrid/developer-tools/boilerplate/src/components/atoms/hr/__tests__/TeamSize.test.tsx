import { render, screen } from '@testing-library/react';
import { TeamSize } from '../TeamSize';

describe('TeamSize', () => {
  it('renders the count and default label', () => {
    render(<TeamSize count={8} />);
    expect(screen.getByTestId('team-size')).toHaveTextContent('8 team members');
  });

  it('renders a custom label', () => {
    render(<TeamSize count={1} label="direct report" />);
    expect(screen.getByTestId('team-size')).toHaveTextContent(
      '1 direct report'
    );
  });
});
