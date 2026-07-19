import { render, screen } from '@testing-library/react';
import { WaterIntake } from '../WaterIntake';

describe('WaterIntake', () => {
  it('renders the amount with the default unit', () => {
    render(<WaterIntake amount={1500} />);
    expect(screen.getByTestId('water-intake')).toHaveTextContent('1500');
    expect(screen.getByTestId('water-intake')).toHaveTextContent('ml');
  });

  it('renders cups when selected', () => {
    render(<WaterIntake amount={8} unit="cups" />);
    expect(screen.getByTestId('water-intake')).toHaveTextContent('cups');
  });

  it('shows the goal when provided', () => {
    render(<WaterIntake amount={1500} goal={2000} />);
    expect(screen.getByTestId('water-intake')).toHaveTextContent(
      'Goal 2000 ml'
    );
  });

  it('omits the goal when not provided', () => {
    render(<WaterIntake amount={1500} />);
    expect(screen.getByTestId('water-intake')).not.toHaveTextContent('Goal');
  });
});
