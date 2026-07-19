import { render, screen } from '@testing-library/react';
import { Fieldset } from '../Fieldset';

describe('Fieldset', () => {
  it('renders legend, description, and children', () => {
    render(
      <Fieldset legend="Profile" description="Basic info">
        <input aria-label="Name" />
      </Fieldset>
    );
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Basic info')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('disables children when disabled', () => {
    render(
      <Fieldset legend="Profile" disabled>
        <button>Save</button>
      </Fieldset>
    );
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });
});
