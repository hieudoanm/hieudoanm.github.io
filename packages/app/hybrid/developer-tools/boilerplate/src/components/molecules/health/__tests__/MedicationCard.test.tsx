import { fireEvent, render, screen } from '@testing-library/react';
import { MedicationCard } from '../MedicationCard';

describe('MedicationCard', () => {
  it('renders name, dose and time', () => {
    render(<MedicationCard name="Ibuprofen" dose="400mg" time="08:00" />);
    expect(screen.getByText('Ibuprofen')).toBeInTheDocument();
    expect(screen.getByText('400mg · 08:00')).toBeInTheDocument();
  });

  it('shows frequency when provided', () => {
    render(
      <MedicationCard
        name="Vitamin D"
        dose="1 tab"
        time="08:00"
        frequency="Daily"
      />
    );
    expect(screen.getByText('1 tab · 08:00 · Daily')).toBeInTheDocument();
  });

  it('marks medication as taken on click', () => {
    const onToggle = jest.fn();
    render(
      <MedicationCard
        name="Ibuprofen"
        dose="400mg"
        time="08:00"
        onToggle={onToggle}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Mark as taken' }));
    expect(screen.getByText('Taken')).toBeInTheDocument();
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('starts taken when initialized taken', () => {
    const onToggle = jest.fn();
    render(
      <MedicationCard
        name="Ibuprofen"
        dose="400mg"
        time="08:00"
        taken
        onToggle={onToggle}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Mark as not taken' }));
    expect(onToggle).toHaveBeenCalledWith(false);
  });
});
