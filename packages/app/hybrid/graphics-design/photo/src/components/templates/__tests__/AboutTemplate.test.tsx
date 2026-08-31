import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '@/components/templates/AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description, and items', () => {
    render(
      <AboutTemplate
        name="Photo"
        description="An editor"
        version="1.0.0"
        items={[
          { label: 'Author', value: 'hieudoanm' },
          { label: 'License', value: 'GPL-3.0' },
        ]}
      />
    );
    expect(screen.getByText('Photo')).toBeInTheDocument();
    expect(screen.getByText('An editor')).toBeInTheDocument();
    expect(screen.getByText('hieudoanm')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
  });
});
