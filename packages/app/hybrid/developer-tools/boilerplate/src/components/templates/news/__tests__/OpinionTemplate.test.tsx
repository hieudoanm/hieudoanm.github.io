import { fireEvent, render, screen } from '@testing-library/react';
import { OpinionTemplate } from '../OpinionTemplate';

describe('OpinionTemplate', () => {
  it('renders columns with reactions', () => {
    render(<OpinionTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Opinion' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 columns')).toBeInTheDocument();
    expect(
      screen.getByText('Why We Need Stronger Election Reforms')
    ).toBeInTheDocument();
    expect(screen.getByText('Elena Vasquez')).toBeInTheDocument();
    expect(screen.getByText('Aug 1, 2026')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: '24 reactions' })
    ).toHaveLength(1);
  });

  it('filters columns by category tab', () => {
    render(<OpinionTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Culture' }));
    expect(screen.getByText('2 columns')).toBeInTheDocument();
    expect(screen.getByText('The Concert Economy Is Back')).toBeInTheDocument();
    expect(
      screen.queryByText('Why We Need Stronger Election Reforms')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Tech' }));
    expect(screen.getByText('2 columns')).toBeInTheDocument();
    expect(
      screen.getByText('Algorithms Deserve a Human Backstop')
    ).toBeInTheDocument();
  });

  it('increments reactions on click', () => {
    render(<OpinionTemplate />);
    fireEvent.click(screen.getByRole('button', { name: '24 reactions' }));
    expect(
      screen.getByRole('button', { name: '25 reactions' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '24 reactions' })
    ).not.toBeInTheDocument();
  });
});
