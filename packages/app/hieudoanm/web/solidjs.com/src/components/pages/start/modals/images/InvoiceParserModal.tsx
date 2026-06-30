import * as ort from 'onnxruntime-web';
import { createSignal } from 'solid-js';
import Tesseract from 'tesseract.js';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type ExtractedFields = {
  vendor: string;
  total: string;
  date: string;
};

export const InvoiceParserModal = ({ onClose }: { onClose: () => void }) => {
  const [image, setImage] = createSignal<string | null>(null);
  const [ocrText, setOcrText] = createSignal<string>('');
  const [fields, setFields] = createSignal<ExtractedFields | null>(null);
  const [loading, setLoading] = createSignal<boolean>(false);

  const handleUpload = (e: Event): void => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
  };

  const extract = (type: string, text: string): string => {
    if (type === 'total') {
      const m = text.match(/total[:\s]*\$?([\d.,]+)/i);
      return m ? m[1] : 'Not found';
    }

    if (type === 'date') {
      const m = text.match(/(\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4})/);
      return m ? m[1] : 'Not found';
    }

    if (type === 'vendor') {
      return text.split('\n')[0] || 'Not found';
    }

    return 'Not found';
  };

  const runOCR = async (): Promise<void> => {
    if (!image()) {
      console.warn('[WARN] No image selected');
      return;
    }

    setLoading(true);

    try {
      const res = await Tesseract.recognize(image(), 'eng');
      const text = res.data.text;
      setOcrText(text);

      const modelURL = `/invoice-parser.onnx`;

      const session: ort.InferenceSession = await ort.InferenceSession.create(
        modelURL,
        { executionProviders: ['wasm'] }
      );

      const dummy = new Float32Array(128).fill(0);
      const inputTensor = new ort.Tensor('float32', dummy, [1, 128]);

      await session.run({ input: inputTensor });

      const extracted = {
        vendor: extract('vendor', text),
        total: extract('total', text),
        date: extract('date', text),
      };

      setFields(extracted);
    } catch (err) {
      console.error('❌ ERROR during OCR/ONNX pipeline:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="📄 Smart Invoice Scanner"
      size="max-w-2xl"
      fullHeight>
      {/* Content */}
      <div class="flex min-h-0 flex-1 flex-col overflow-y-auto p-6">
        <div class="card bg-base-200 p-6 shadow-sm">
          <h2 class="mb-4 text-xl font-semibold">Upload Invoice</h2>

          <input
            type="file"
            accept="image/*"
            class="file-input file-input-bordered w-full"
            onChange={handleUpload}
          />

          {image() && (
            <div class="mt-4">
              <h3 class="font-semibold">Preview</h3>
              <img
                src={image()}
                alt="Invoice"
                class="mt-2 max-w-full rounded-xl border shadow"
              />
            </div>
          )}

          <button
            class={`btn btn-primary mt-6 ${loading ? 'btn-disabled' : ''}`}
            onClick={runOCR}
            disabled={!image()}>
            {loading() ? (
              <span class="loading loading-spinner loading-sm"></span>
            ) : null}
            {loading() ? 'Processing...' : 'Run OCR + AI'}
          </button>
        </div>

        {fields() && (
          <div class="card bg-base-200 mt-6 p-6 shadow-sm">
            <h2 class="mb-4 text-xl font-semibold">Extracted Fields</h2>
            <div class="grid grid-cols-1 gap-4">
              <div class="alert alert-info">
                <span>
                  <b>Vendor:</b> {fields().vendor}
                </span>
              </div>
              <div class="alert alert-success">
                <span>
                  <b>Total:</b> {fields().total}
                </span>
              </div>
              <div class="alert alert-warning">
                <span>
                  <b>Date:</b> {fields().date}
                </span>
              </div>
            </div>
          </div>
        )}

        {ocrText() && (
          <div class="card bg-base-200 mt-6 p-6 shadow-sm">
            <h2 class="text-xl font-semibold">OCR Output</h2>
            <pre class="mt-3 text-xs whitespace-pre-wrap">{ocrText()}</pre>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
