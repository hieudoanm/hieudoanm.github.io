import { fireEvent, render, screen } from '@testing-library/react';
import { TimesheetsTemplate } from '../TimesheetsTemplate';

describe('TimesheetsTemplate', () => {
  it('renders weekly entries and the total hours', () => {
    render(<TimesheetsTemplate />);
    expect(screen.getAllByText('Website redesign').length).toBeGreaterThan(0);
    expect(screen.getByText('Mobile app')).toBeInTheDocument();
    expect(screen.getByText('API integration')).toBeInTheDocument();
    expect(screen.getAllByText('Mon').length).toBeGreaterThan(0);
    expect(screen.getByText('Total 14h')).toBeInTheDocument();
  });

  it('logs a new time entry and updates the total', () => {
    render(<TimesheetsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Log time/ }));
    expect(screen.getByLabelText('Project')).toBeInTheDocument();
    expect(screen.getByLabelText('Hours')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Hours'), {
      target: { value: '2' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add entry' }));
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Total 16h')).toBeInTheDocument();
  });
});
