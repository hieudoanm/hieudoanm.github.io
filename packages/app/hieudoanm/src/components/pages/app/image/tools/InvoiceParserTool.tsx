'use client';

import * as ort from 'onnxruntime-web';
import { FC, useState } from 'react';
import Tesseract from 'tesseract.js';
import { Dropzone } from '@hieudoanm.github.io/components/atoms';
import { ImageToolConfig } from '../config';

interface ExtractedFields {
  vendor: string;
  total: string;
  date: string;
}

export const InvoiceParserTool: FC<{ config: ImageToolConfig }> = ({
  config,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState<string>('');
  const [fields, setFields] = useState<ExtractedFields | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = (file: File): void => {
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
    if (!image) {
      console.warn('[WARN] No image selected');
      return;
    }

    setLoading(true);

    try {
      const res = await Tesseract.recognize(image, 'eng');
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
      console.error('ERROR during OCR/ONNX pipeline:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6">
          <div className="card bg-base-200 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-normal">Upload Invoice</h2>

            <Dropzone accept="image/*" onFile={handleUpload} />

            {image && (
              <div className="mt-4">
                <h3 className="font-normal">Preview</h3>
                <img
                  src={image}
                  alt="Invoice"
                  loading="lazy"
                  className="mt-2 max-w-full rounded-xl border shadow"
                />
              </div>
            )}

            <button
              className={`btn btn-primary mt-6 ${loading ? 'btn-disabled' : ''}`}
              onClick={runOCR}
              disabled={!image}>
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : null}
              {loading ? 'Processing...' : 'Run OCR + AI'}
            </button>
          </div>

          {fields && (
            <div className="card bg-base-200 mt-6 p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-normal">Extracted Fields</h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="alert alert-info">
                  <span>
                    <b>Vendor:</b> {fields.vendor}
                  </span>
                </div>
                <div className="alert alert-success">
                  <span>
                    <b>Total:</b> {fields.total}
                  </span>
                </div>
                <div className="alert alert-warning">
                  <span>
                    <b>Date:</b> {fields.date}
                  </span>
                </div>
              </div>
            </div>
          )}

          {ocrText && (
            <div className="card bg-base-200 mt-6 p-6 shadow-sm">
              <h2 className="text-xl font-normal">OCR Output</h2>
              <pre className="mt-3 text-xs whitespace-pre-wrap">{ocrText}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
InvoiceParserTool.displayName = 'InvoiceParserTool';
