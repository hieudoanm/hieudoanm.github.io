import { fireEvent, render, screen } from '@testing-library/react';
import { SubscribeForm } from '../SubscribeForm';

describe('SubscribeForm', () => {
  it('renders title, description and email input', () => {
    render(<SubscribeForm onSubmit={jest.fn()} />);
    expect(screen.getByText('Subscribe to our newsletter')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('disables the button until an email is entered', () => {
    render(<SubscribeForm onSubmit={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeDisabled();
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'jane@example.com' },
    });
    expect(screen.getByRole('button', { name: 'Subscribe' })).toBeEnabled();
  });

  it('calls onSubmit with the trimmed email and clears the input', () => {
    const onSubmit = jest.fn();
    render(<SubscribeForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: '  jane@example.com  ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(onSubmit).toHaveBeenCalledWith('jane@example.com');
    expect(screen.getByLabelText('Email')).toHaveValue('');
  });
});
