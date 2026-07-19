import { render, screen, fireEvent } from '@testing-library/react';
import { SignaturePad } from '@/components/molecules/SignaturePad';

const createCtx = () => ({
  lineWidth: 0,
  lineCap: '',
  lineJoin: '',
  strokeStyle: '',
  fillStyle: '',
  fillRect: jest.fn(),
  drawImage: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
});

const ctx = createCtx();
const getContext = jest.fn(() => ctx);
const toDataURL = jest.fn(() => 'data:image/png;base64,canvas-signature');

class MockFileReader {
  result: string | null = null;
  onload: (() => void) | null = null;

  readAsDataURL(): void {
    this.result = 'data:image/png;base64,uploaded-signature';
    this.onload?.();
  }
}

class MockImage {
  onload: (() => void) | null = null;
  private _src = '';

  set src(value: string) {
    this._src = value;
    this.onload?.();
  }

  get src(): string {
    return this._src;
  }
}

const DATA_URL = 'data:image/png;base64,iVBORw0KGgo=';

const renderPad = (
  initialValue = '',
  onSave = jest.fn(),
  onClose = jest.fn()
) =>
  render(
    <SignaturePad
      initialValue={initialValue}
      onSave={onSave}
      onClose={onClose}
    />
  );

describe('SignaturePad molecule', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      writable: true,
      configurable: true,
      value: getContext,
    });
    Object.defineProperty(HTMLCanvasElement.prototype, 'toDataURL', {
      writable: true,
      configurable: true,
      value: toDataURL,
    });
    (global as { FileReader: unknown }).FileReader = MockFileReader;
    (global as { Image: unknown }).Image = MockImage;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initializes typed text from a plain-text initial value', () => {
    renderPad('Jane Doe');
    fireEvent.click(screen.getByLabelText('type signature'));
    expect(
      (screen.getByLabelText('Typed signature text') as HTMLInputElement).value
    ).toBe('Jane Doe');
  });

  it('starts empty for a data-URL initial value', () => {
    renderPad(DATA_URL);
    fireEvent.click(screen.getByLabelText('type signature'));
    expect(
      (screen.getByLabelText('Typed signature text') as HTMLInputElement).value
    ).toBe('');
  });

  it('preloads a data-URL initial value as the uploaded image', () => {
    renderPad(DATA_URL);
    fireEvent.click(screen.getByLabelText('upload signature'));
    expect(screen.getByAltText('Uploaded signature')).toHaveAttribute(
      'src',
      DATA_URL
    );
  });

  it('draws an existing data-URL signature onto the canvas', () => {
    renderPad(DATA_URL);
    expect(getContext).toHaveBeenCalledWith('2d');
    expect(ctx.drawImage).toHaveBeenCalled();
  });

  it('saves typed text from the type tab', () => {
    const onSave = jest.fn();
    renderPad('', onSave);
    fireEvent.click(screen.getByLabelText('type signature'));
    fireEvent.change(screen.getByLabelText('Typed signature text'), {
      target: { value: 'John Smith' },
    });
    fireEvent.click(screen.getByText('Save Signature'));
    expect(onSave).toHaveBeenCalledWith('John Smith');
  });

  it('ignores pointer moves before the pointer is pressed', () => {
    const canvas = renderPad().getByTestId('signature-canvas');
    fireEvent.pointerMove(canvas, { clientX: 10, clientY: 10 });
    expect(ctx.stroke).not.toHaveBeenCalled();
  });

  it('draws a stroke while the pointer is held down', () => {
    const canvas = renderPad().getByTestId('signature-canvas');
    fireEvent.pointerDown(canvas, { clientX: 10, clientY: 20 });
    fireEvent.pointerMove(canvas, { clientX: 30, clientY: 40 });
    fireEvent.pointerUp(canvas);
    expect(ctx.moveTo).toHaveBeenCalledWith(10, 20);
    expect(ctx.lineTo).toHaveBeenCalledWith(30, 40);
    expect(ctx.stroke).toHaveBeenCalled();
  });

  it('saves the canvas drawing from the draw tab', () => {
    const onSave = jest.fn();
    renderPad('', onSave);
    fireEvent.click(screen.getByText('Save Signature'));
    expect(toDataURL).toHaveBeenCalledWith('image/png');
    expect(onSave).toHaveBeenCalledWith(
      'data:image/png;base64,canvas-signature'
    );
  });

  it('saves an uploaded image signature', () => {
    const onSave = jest.fn();
    renderPad('', onSave);
    fireEvent.click(screen.getByLabelText('upload signature'));
    const file = new File(['x'], 'sig.png', { type: 'image/png' });
    fireEvent.change(screen.getByLabelText('Upload signature image'), {
      target: { files: [file] },
    });
    fireEvent.click(screen.getByText('Save Signature'));
    expect(onSave).toHaveBeenCalledWith(
      'data:image/png;base64,uploaded-signature'
    );
  });

  it('does nothing when saving an empty uploaded signature', () => {
    const onSave = jest.fn();
    renderPad('', onSave);
    fireEvent.click(screen.getByLabelText('upload signature'));
    fireEvent.change(screen.getByLabelText('Upload signature image'), {
      target: { files: [] },
    });
    fireEvent.click(screen.getByText('Save Signature'));
    expect(onSave).not.toHaveBeenCalled();
  });

  it('calls onClose when cancelling', () => {
    const onClose = jest.fn();
    renderPad('', jest.fn(), onClose);
    fireEvent.click(screen.getByLabelText('Close signature pad'));
    expect(onClose).toHaveBeenCalled();
  });
});
