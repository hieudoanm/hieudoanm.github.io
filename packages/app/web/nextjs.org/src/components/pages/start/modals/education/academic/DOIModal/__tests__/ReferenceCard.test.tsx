import { render, screen, fireEvent } from '@testing-library/react';
import { ReferenceCard } from '../ReferenceCard';

describe('ReferenceCard', () => {
  const reference = {
    authors: [
      { family: 'Doe', given: 'John' },
      { family: 'Smith', given: 'Jane' },
    ],
    year: 2023,
    title: 'A Study on Something',
    journal: 'Journal of Things',
    volume: '10',
    issue: '2',
    pages: '100-110',
    url: 'https://doi.org/example',
  };

  it('renders authors with initials', () => {
    render(<ReferenceCard reference={reference} onDelete={jest.fn()} />);
    expect(screen.getByText(/Doe, J\., Smith, & J\./)).toBeInTheDocument();
  });

  it('renders reference details', () => {
    render(<ReferenceCard reference={reference} onDelete={jest.fn()} />);
    expect(screen.getByText('A Study on Something')).toBeInTheDocument();
    expect(screen.getByText('Journal of Things')).toBeInTheDocument();
  });

  it('renders URL as link', () => {
    render(<ReferenceCard reference={reference} onDelete={jest.fn()} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://doi.org/example');
  });

  it('calls onDelete when delete button clicked', () => {
    const onDelete = jest.fn();
    render(<ReferenceCard reference={reference} onDelete={onDelete} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('handles missing issue number', () => {
    const refWithoutIssue = { ...reference, issue: undefined };
    render(<ReferenceCard reference={refWithoutIssue} onDelete={jest.fn()} />);
    expect(screen.getByText(/10, 100-110/)).toBeInTheDocument();
  });
});
