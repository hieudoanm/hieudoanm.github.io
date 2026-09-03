import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description, items and version', () => {
    render(
      <AboutTemplate
        name="Markdown Editor"
        description="Write and preview markdown"
        version="v2.3.1"
        items={[{ label: 'Engine', value: 'remark' }]}
      />
    );
    expect(screen.getByText('Markdown Editor')).toBeInTheDocument();
    expect(
      screen.getByText('Write and preview markdown')
    ).toBeInTheDocument();
    expect(screen.getByText('Engine')).toBeInTheDocument();
    expect(screen.getByText('remark')).toBeInTheDocument();
    expect(screen.getByText('v2.3.1')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});
