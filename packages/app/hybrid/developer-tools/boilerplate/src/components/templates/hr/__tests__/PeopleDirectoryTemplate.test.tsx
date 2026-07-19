import { fireEvent, render, screen } from '@testing-library/react';
import { PeopleDirectoryTemplate } from '../PeopleDirectoryTemplate';

describe('PeopleDirectoryTemplate', () => {
  it('renders all people and the summary', () => {
    render(<PeopleDirectoryTemplate />);
    expect(
      screen.getByRole('heading', { name: 'People Directory' })
    ).toBeInTheDocument();
    expect(screen.getByText('8 employees')).toBeInTheDocument();
    expect(screen.getByText('Priya Patel')).toBeInTheDocument();
    expect(screen.getByText('Engineering Lead')).toBeInTheDocument();
    expect(screen.getByText('Tom Baker')).toBeInTheDocument();
  });

  it('filters people by department', () => {
    render(<PeopleDirectoryTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Engineering' }));
    expect(screen.getByText('4 employees')).toBeInTheDocument();
    expect(screen.getByText('David Chen')).toBeInTheDocument();
    expect(screen.queryByText('Lena Kim')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Design' }));
    expect(screen.getByText('2 employees')).toBeInTheDocument();
    expect(screen.getByText('Maya Singh')).toBeInTheDocument();
    expect(screen.queryByText('Omar Haddad')).not.toBeInTheDocument();
  });

  it('searches people by name and shows the empty state', () => {
    render(<PeopleDirectoryTemplate />);
    fireEvent.change(screen.getByLabelText('Search people'), {
      target: { value: 'sofia' },
    });
    expect(screen.getByText('1 employees')).toBeInTheDocument();
    expect(screen.getByText('Sofia Rossi')).toBeInTheDocument();
    expect(screen.queryByText('Priya Patel')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search people'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No employees found')).toBeInTheDocument();
    expect(screen.getByText('0 employees')).toBeInTheDocument();
  });
});
