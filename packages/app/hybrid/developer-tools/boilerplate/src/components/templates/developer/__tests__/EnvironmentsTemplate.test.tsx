import { fireEvent, render, screen, within } from '@testing-library/react';
import { EnvironmentsTemplate } from '../EnvironmentsTemplate';

describe('EnvironmentsTemplate', () => {
  it('renders environments with status badges', () => {
    render(<EnvironmentsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Environments' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 of 5 healthy')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('https://sandbox.acme.com')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Healthy')).toHaveLength(3);
    expect(within(table).getAllByText('Warning')).toHaveLength(1);
    expect(within(table).getAllByText('Down')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Restart' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Deploy fix' })).toHaveLength(
      1
    );
  });

  it('filters environments by status', () => {
    render(<EnvironmentsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Down' }));
    expect(screen.getByText('0 of 1 healthy')).toBeInTheDocument();
    expect(screen.getByText('Sandbox')).toBeInTheDocument();
    expect(screen.queryByText('Production')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Healthy' }));
    expect(screen.getByText('3 of 3 healthy')).toBeInTheDocument();
  });

  it('recovers warning and down environments', () => {
    render(<EnvironmentsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Restart' })[0]);
    expect(screen.getByText('4 of 5 healthy')).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).queryAllByText('Warning')).toHaveLength(0);
    fireEvent.click(screen.getAllByRole('button', { name: 'Deploy fix' })[0]);
    expect(screen.getByText('5 of 5 healthy')).toBeInTheDocument();
    expect(within(table).queryAllByText('Down')).toHaveLength(0);
  });
});
