import { render, screen } from '@testing-library/react';
import { Card } from '../Card';

describe('Card', () => {
  it('renders children only', () => {
    render(<Card>Body</Card>);
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('renders title, description, and action', () => {
    render(
      <Card title="Title" description="Desc" action={<button>Go</button>}>
        Body
      </Card>
    );
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });
});
