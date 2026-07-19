import { fireEvent, render, screen } from '@testing-library/react';
import { LabelsTemplate } from '../LabelsTemplate';

describe('LabelsTemplate', () => {
  it('renders labels and the summary', () => {
    render(<LabelsTemplate />);
    expect(screen.getByRole('heading', { name: 'Labels' })).toBeInTheDocument();
    expect(screen.getByText('4 labels')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
    expect(screen.getByText('Newsletter')).toBeInTheDocument();
  });

  it('adds a label', () => {
    render(<LabelsTemplate />);
    fireEvent.change(screen.getByLabelText('Label name'), {
      target: { value: 'Travel' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add label' }));
    expect(screen.getByText('Travel')).toBeInTheDocument();
    expect(screen.getByText('5 labels')).toBeInTheDocument();
    expect(screen.getByText('Label added')).toBeInTheDocument();
  });

  it('rejects empty and duplicate labels', () => {
    render(<LabelsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add label' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a label name');
    fireEvent.change(screen.getByLabelText('Label name'), {
      target: { value: 'Work' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add label' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Label already exists');
    expect(screen.getByText('4 labels')).toBeInTheDocument();
  });

  it('removes a label', () => {
    render(<LabelsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Personal' }));
    expect(screen.queryByText('Personal')).not.toBeInTheDocument();
    expect(screen.getByText('3 labels')).toBeInTheDocument();
  });
});
