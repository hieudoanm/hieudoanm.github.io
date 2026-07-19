import { fireEvent, render, screen } from '@testing-library/react';
import { OnboardingTemplate } from '../OnboardingTemplate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('OnboardingTemplate', () => {
  it('shows first step by default', () => {
    render(<OnboardingTemplate />);
    expect(screen.getByText('Create your profile')).toBeInTheDocument();
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
  });

  it('hides back button on first step', () => {
    render(<OnboardingTemplate />);
    expect(screen.getByRole('button', { name: /Back/ })).toHaveClass(
      'invisible'
    );
  });

  it('advances to preferences step', () => {
    render(<OnboardingTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    expect(screen.getByText('Set your preferences')).toBeInTheDocument();
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
  });

  it('updates profile fields and returns to previous step', () => {
    render(<OnboardingTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Jane Doe'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'developer' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    fireEvent.click(screen.getByRole('button', { name: /Back/ }));
    expect(screen.getByPlaceholderText('Jane Doe')).toHaveValue('John Doe');
    expect(screen.getByRole('combobox')).toHaveValue('developer');
  });

  it('toggles preference checkboxes', () => {
    render(<OnboardingTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    const toggles = screen.getAllByRole('checkbox');
    fireEvent.click(toggles[0]);
    fireEvent.click(toggles[1]);
    expect(toggles[0]).not.toBeChecked();
    expect(toggles[1]).toBeChecked();
  });

  it('reaches explore step and finishes onboarding', () => {
    render(<OnboardingTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    expect(screen.getByText('Explore the app')).toBeInTheDocument();
    expect(screen.getByText('Step 3 of 3')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Finish' }));
    expect(screen.getByText('All set!')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to dashboard' })
    ).toBeInTheDocument();
  });
});
