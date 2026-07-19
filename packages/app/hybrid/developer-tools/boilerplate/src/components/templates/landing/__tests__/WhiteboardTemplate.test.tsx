import { fireEvent, render, screen } from '@testing-library/react';
import { WhiteboardTemplate } from '../WhiteboardTemplate';

describe('WhiteboardTemplate', () => {
  it('selects a color and paints cells', () => {
    render(<WhiteboardTemplate />);
    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByText('0 marks')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Select Red' }));
    expect(screen.getByText('Red')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cell 1' }));
    expect(screen.getByText('1 marks')).toBeInTheDocument();
  });

  it('clears the whiteboard', () => {
    render(<WhiteboardTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Select Blue' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cell 2' }));
    expect(screen.getByText('1 marks')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(screen.getByText('0 marks')).toBeInTheDocument();
    expect(screen.getByText('Black')).toBeInTheDocument();
  });
});
