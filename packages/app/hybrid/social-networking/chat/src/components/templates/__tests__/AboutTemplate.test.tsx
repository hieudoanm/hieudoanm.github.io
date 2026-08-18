import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description, items, and version', () => {
    render(
      <AboutTemplate
        name="Chat"
        description="A chat app"
        version="1.0.0"
        items={[
          { label: 'Version', value: '1.0.0' },
          { label: 'Author', value: 'You' },
        ]}
      />
    );
    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(screen.getByText('A chat app')).toBeInTheDocument();
    expect(screen.getByText('Version')).toBeInTheDocument();
    expect(screen.getAllByText('1.0.0')).toHaveLength(2);
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it('renders no items when empty', () => {
    render(
      <AboutTemplate name="Chat" description="" version="1.0.0" items={[]} />
    );
    expect(screen.getByText('Chat')).toBeInTheDocument();
  });
});
