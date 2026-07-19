import { fireEvent, render, screen } from '@testing-library/react';
import { DoctorCard } from '../DoctorCard';

describe('DoctorCard', () => {
  it('renders doctor name and specialty', () => {
    render(<DoctorCard name="Jane Doe" specialty="Dermatology" rating={4.8} />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Dermatology')).toBeInTheDocument();
  });

  it('renders rating and reviews', () => {
    render(
      <DoctorCard
        name="Jane Doe"
        specialty="Dermatology"
        rating={4.8}
        reviews={120}
      />
    );
    expect(screen.getByTestId('doctor-rating')).toHaveTextContent('4.8');
    expect(screen.getByTestId('doctor-rating')).toHaveTextContent(
      '120 reviews'
    );
  });

  it('shows initials avatar', () => {
    render(<DoctorCard name="Jane Doe" specialty="Dermatology" rating={4.8} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('fires onBook when booking', () => {
    const onBook = jest.fn();
    render(
      <DoctorCard
        name="Jane Doe"
        specialty="Dermatology"
        rating={4.8}
        onBook={onBook}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Book appointment' }));
    expect(onBook).toHaveBeenCalledTimes(1);
  });
});
