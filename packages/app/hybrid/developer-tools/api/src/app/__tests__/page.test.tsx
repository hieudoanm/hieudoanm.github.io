import { fireEvent, render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders the api client ready to use', () => {
    render(<HomePage />);
    expect(screen.getByLabelText('HTTP method')).toHaveValue('GET');
    expect(screen.getByLabelText('Request URL')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Sidebar section'), {
      target: { value: 'history' },
    });
    expect(screen.getByText('No requests yet')).toBeInTheDocument();
  });
});
