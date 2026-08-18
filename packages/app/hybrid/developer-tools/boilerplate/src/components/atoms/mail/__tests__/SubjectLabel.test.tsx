import { render, screen } from '@testing-library/react';
import { SubjectLabel } from '../SubjectLabel';

describe('SubjectLabel', () => {
  it('renders the subject text', () => {
    render(<SubjectLabel subject="Q3 planning" />);
    expect(screen.getByTestId('subject-label')).toHaveTextContent(
      'Q3 planning'
    );
  });

  it('emphasises unread subjects', () => {
    render(<SubjectLabel subject="Urgent" unread />);
    expect(screen.getByTestId('subject-label')).toHaveClass('font-semibold');
  });

  it('mutes read subjects', () => {
    render(<SubjectLabel subject="Read email" />);
    expect(screen.getByTestId('subject-label')).toHaveClass(
      'text-base-content/70'
    );
  });
});
