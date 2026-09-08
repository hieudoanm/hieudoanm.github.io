import MentalAccountingScenariosPage from '@/app/(games)/mental-accounting/scenarios/page';
import { render, screen } from '@testing-library/react';

describe('MentalAccountingScenariosPage', () => {
  it('renders the mental accounting game', () => {
    render(<MentalAccountingScenariosPage />);
    expect(
      screen.getByRole('heading', { name: /Mental Accounting Game/ })
    ).toBeInTheDocument();
    expect(screen.getByTestId('scenario')).toBeInTheDocument();
    expect(screen.getByTestId('choice-a')).toBeInTheDocument();
    expect(screen.getByTestId('choice-b')).toBeInTheDocument();
  });
});
