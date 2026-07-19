import { fireEvent, render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';
import { ErrorTemplate } from '../ErrorTemplate';
import { VersionTemplate } from '../VersionTemplate';

describe('AboutTemplate', () => {
  it('renders name, description, version and info rows', () => {
    render(
      <AboutTemplate
        name="Resume"
        description="A builder"
        version="v1.0"
        items={[{ label: 'Framework', value: 'Next.js' }]}
      />
    );
    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText('A builder')).toBeInTheDocument();
    expect(screen.getByText('v1.0')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });
});

describe('ErrorTemplate', () => {
  it('renders code, description and action', () => {
    render(
      <ErrorTemplate
        code="404"
        description="Missing page"
        action={<button>Home</button>}
      />
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Missing page')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
  });

  it('renders without optional props', () => {
    render(<ErrorTemplate code="500" />);
    expect(screen.getByText('500')).toBeInTheDocument();
  });
});

describe('VersionTemplate', () => {
  it('copies the version to the clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<VersionTemplate version="2024.01.01" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy version' }));
    expect(writeText).toHaveBeenCalledWith('2024.01.01');
  });
});
