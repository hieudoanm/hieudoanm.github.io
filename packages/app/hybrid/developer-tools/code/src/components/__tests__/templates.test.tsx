import { render, screen, fireEvent, act } from '@testing-library/react';
import { AboutTemplate } from '../templates/AboutTemplate';
import { ErrorTemplate } from '../templates/ErrorTemplate';
import { VersionTemplate } from '../templates/VersionTemplate';

describe('templates', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  describe('AboutTemplate', () => {
    it('renders name, description, version and items', () => {
      render(
        <AboutTemplate
          name="Code"
          description="A code editor"
          version="v1.0.0"
          items={[
            { label: 'Framework', value: 'Next.js' },
            { label: 'Language', value: 'TypeScript' },
          ]}
        />
      );

      expect(screen.getByRole('heading', { name: 'Code' })).toBeInTheDocument();
      expect(screen.getByText('A code editor')).toBeInTheDocument();
      expect(screen.getByText('v1.0.0')).toBeInTheDocument();
      expect(screen.getByText('Framework')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Stable')).toBeInTheDocument();
    });
  });

  describe('ErrorTemplate', () => {
    it('renders only the code when optional props are omitted', () => {
      render(<ErrorTemplate code="404" />);
      expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
      expect(screen.queryByText(/not found/i)).not.toBeInTheDocument();
    });

    it('renders description and action when provided', () => {
      render(
        <ErrorTemplate
          code="500"
          description="Server exploded"
          action={<button>Retry</button>}
        />
      );
      expect(screen.getByRole('heading', { name: '500' })).toBeInTheDocument();
      expect(screen.getByText('Server exploded')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    });
  });

  describe('VersionTemplate', () => {
    it('renders full segments when year, month and day are present', () => {
      render(<VersionTemplate version="2026.08.05.12.30.45" />);
      expect(screen.getByText('2026')).toBeInTheDocument();
      expect(screen.getByText('Year')).toBeInTheDocument();
      expect(screen.getByText('Hour')).toBeInTheDocument();
      expect(screen.getByText('Min')).toBeInTheDocument();
      expect(screen.getByText('Sec')).toBeInTheDocument();
    });

    it('renders only partial segments when time parts are missing', () => {
      render(<VersionTemplate version="2026.08.05" />);
      expect(screen.getByText('2026')).toBeInTheDocument();
      expect(screen.queryByText('Hour')).not.toBeInTheDocument();
    });

    it('renders the raw version when segments are incomplete', () => {
      render(<VersionTemplate version="0.1" />);
      expect(screen.getAllByText('0.1')).toHaveLength(2);
      expect(screen.queryByText('Year')).not.toBeInTheDocument();
    });

    it('copies the version and shows Copied state briefly', async () => {
      jest.useFakeTimers();
      const writeText = jest.fn().mockResolvedValue(undefined);
      Object.assign(navigator, { clipboard: { writeText } });

      render(<VersionTemplate version="2026.08.05" />);

      fireEvent.click(screen.getByRole('button', { name: /Copy version/i }));
      await act(async () => {});

      expect(writeText).toHaveBeenCalledWith('2026.08.05');
      expect(screen.getByText('Copied')).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      expect(
        screen.getByRole('button', { name: /Copy version/i })
      ).toBeInTheDocument();
    });
  });
});
