import { render, screen } from '@testing-library/react';
import AuthTemplate from '../AuthTemplate';

describe('AuthTemplate', () => {
  it('renders children', () => {
    render(
      <AuthTemplate>
        <div>Test content</div>
      </AuthTemplate>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });
});
