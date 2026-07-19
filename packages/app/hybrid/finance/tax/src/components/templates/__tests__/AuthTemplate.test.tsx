import { render } from '@testing-library/react';
import { AuthTemplate } from '../AuthTemplate';

describe('AuthTemplate', () => {
  it('renders children', () => {
    render(
      <AuthTemplate>
        <div>Auth Content</div>
      </AuthTemplate>
    );
  });
});
