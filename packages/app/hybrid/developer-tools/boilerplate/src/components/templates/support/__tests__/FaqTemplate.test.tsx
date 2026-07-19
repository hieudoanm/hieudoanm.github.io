import { fireEvent, render, screen } from '@testing-library/react';
import { FaqTemplate } from '../FaqTemplate';

describe('FaqTemplate', () => {
  it('renders all questions and the summary', () => {
    render(<FaqTemplate />);
    expect(screen.getByRole('heading', { name: 'FAQs' })).toBeInTheDocument();
    expect(screen.getByText('5 FAQs')).toBeInTheDocument();
    expect(screen.getByText('How do I reset my password?')).toBeInTheDocument();
    expect(screen.getByText('How do I contact support?')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Show answer' })).toHaveLength(
      5
    );
  });

  it('expands an answer', () => {
    render(<FaqTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Show answer' })[0]);
    expect(
      screen.getByText('Go to the login page and click Forgot password.')
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Hide answer' })).toHaveLength(
      1
    );
  });

  it('collapses an answer when toggled again', () => {
    render(<FaqTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Show answer' })[0]);
    fireEvent.click(screen.getByRole('button', { name: 'Hide answer' }));
    expect(
      screen.queryByText('Go to the login page and click Forgot password.')
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Show answer' })).toHaveLength(
      5
    );
  });
});
