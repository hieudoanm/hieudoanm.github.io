import { render, screen } from '@testing-library/react';
import { FormRow } from '../FormRow';

describe('FormRow', () => {
  it('renders label, hint, and children', () => {
    render(
      <FormRow label="Name" hint="First and last" htmlFor="name">
        <input id="name" aria-label="Name" />
      </FormRow>
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('First and last')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'name');
  });

  it('renders required marker', () => {
    render(
      <FormRow label="Name" required>
        <input aria-label="Name" />
      </FormRow>
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders error and hides hint', () => {
    render(
      <FormRow label="Name" hint="Optional" error="Required field">
        <input aria-label="Name" />
      </FormRow>
    );
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.queryByText('Optional')).not.toBeInTheDocument();
  });
});
