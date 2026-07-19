import { fireEvent, render, screen } from '@testing-library/react';
import { FormsShowcaseTemplate } from '../FormsShowcaseTemplate';

describe('FormsShowcaseTemplate', () => {
  it('renders all form controls', () => {
    render(<FormsShowcaseTemplate />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Plan')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add notes...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('submits a summary of all values', () => {
    render(<FormsShowcaseTemplate />);
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Alice Kim' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'alice@test.com' },
    });
    fireEvent.change(screen.getByLabelText('Plan'), {
      target: { value: 'Pro' },
    });
    fireEvent.click(screen.getByLabelText('Design'));
    fireEvent.click(screen.getByLabelText('Business'));
    fireEvent.change(screen.getByRole('slider'), { target: { value: '750' } });
    fireEvent.click(screen.getByLabelText('Notifications'));
    fireEvent.change(screen.getByPlaceholderText('Add notes...'), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText(/Submitted:/)).toHaveTextContent('name: Alice Kim');
    expect(screen.getByText(/Submitted:/)).toHaveTextContent(
      'email: alice@test.com'
    );
    expect(screen.getByText(/Submitted:/)).toHaveTextContent('plan: Pro');
    expect(screen.getByText(/Submitted:/)).toHaveTextContent(
      'interests: Design'
    );
    expect(screen.getByText(/Submitted:/)).toHaveTextContent('budget: 750');
    expect(screen.getByText(/Submitted:/)).toHaveTextContent(
      'notifications: off'
    );
    expect(screen.getByText('Budget: $750')).toBeInTheDocument();
  });

  it('shows default values when nothing is changed', () => {
    render(<FormsShowcaseTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText(/Submitted:/)).toHaveTextContent('interests: none');
    expect(screen.getByText(/Submitted:/)).toHaveTextContent(
      'notifications: on'
    );
    expect(screen.getByText(/Submitted:/)).toHaveTextContent('plan: Free');
    expect(screen.getByText(/Submitted:/)).toHaveTextContent('budget: 500');
  });

  it('resets the summary', () => {
    render(<FormsShowcaseTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText(/Submitted:/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.queryByText(/Submitted:/)).not.toBeInTheDocument();
  });

  it('toggles interest checkboxes', () => {
    render(<FormsShowcaseTemplate />);
    const design = screen.getByLabelText('Design');
    fireEvent.click(design);
    expect(design).toBeChecked();
    fireEvent.click(design);
    expect(design).not.toBeChecked();
  });
});
