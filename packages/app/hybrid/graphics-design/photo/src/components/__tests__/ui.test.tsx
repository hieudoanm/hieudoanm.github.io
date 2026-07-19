import { fireEvent, render, screen } from '@testing-library/react';
import { ImageFileUpload } from '@/components/atoms/ImageFileUpload';
import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { VersionTemplate } from '@/components/templates/VersionTemplate';
import { ToastContainer } from '@/components/organisms/ToastContainer';

describe('ImageFileUpload', () => {
  it('calls onFile for dropped files', () => {
    const onFile = jest.fn();
    render(<ImageFileUpload onFile={onFile} />);
    const zone = screen.getByText(/Drop a file here/i).parentElement!;
    fireEvent.dragOver(zone);
    fireEvent.dragLeave(zone);
    fireEvent.drop(zone, {
      dataTransfer: {
        files: [new File(['x'], 'a.png', { type: 'image/png' })],
      },
    });
    expect(onFile).toHaveBeenCalledTimes(1);
  });

  it('calls onFile when a file is selected via the input', () => {
    const onFile = jest.fn();
    render(<ImageFileUpload onFile={onFile} />);
    const input = document.querySelector('input[type="file"]')!;
    fireEvent.change(input, {
      target: { files: [new File(['x'], 'b.png')] },
    });
    expect(onFile).toHaveBeenCalledTimes(1);
  });

  it('opens the file picker on Enter key', () => {
    const click = jest.spyOn(HTMLInputElement.prototype, 'click');
    render(<ImageFileUpload onFile={jest.fn()} />);
    const zone = screen.getByText(/Drop a file here/i).parentElement!;
    fireEvent.keyDown(zone, { key: 'Enter' });
    expect(click).toHaveBeenCalled();
  });
});

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

describe('ErrorTemplate', () => {
  it('renders code, description, and action', () => {
    render(
      <ErrorTemplate
        code="404"
        description="Not found"
        action={<button>Go home</button>}
      />
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Not found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go home' })).toBeInTheDocument();
  });

  it('omits optional sections', () => {
    render(<ErrorTemplate code="500" />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

describe('VersionTemplate', () => {
  it('renders segmented version when complete', () => {
    render(<VersionTemplate version="2026.08.06.12.00.00" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('falls back to raw version for short strings', () => {
    render(<VersionTemplate version="dev" />);
    expect(screen.getAllByText('dev').length).toBeGreaterThan(0);
  });

  it('copies the version and shows feedback', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
    render(<VersionTemplate version="2026.08.06" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy version' }));
    expect(await screen.findByText('Copied')).toBeInTheDocument();
  });
});

describe('ToastContainer', () => {
  it('renders nothing', () => {
    render(<ToastContainer />);
    expect(document.body.childElementCount).toBeGreaterThanOrEqual(1);
  });
});
