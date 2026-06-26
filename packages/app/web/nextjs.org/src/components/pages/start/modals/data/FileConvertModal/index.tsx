'use client';

import { FC, useState, useCallback } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab =
  | 'split-csv'
  | 'split-excel'
  | 'csv-to-excel'
  | 'excel-to-csv'
  | 'xml-to-excel'
  | 'excel-to-xml'
  | 'xml-to-csv'
  | 'xml-to-json'
  | 'excel-to-pdf';

const TAB_LABELS: Record<Tab, string> = {
  'split-csv': 'Split CSV',
  'split-excel': 'Split Excel',
  'csv-to-excel': 'CSV → Excel',
  'excel-to-csv': 'Excel → CSV',
  'xml-to-excel': 'XML → Excel',
  'excel-to-xml': 'Excel → XML',
  'xml-to-csv': 'XML → CSV',
  'xml-to-json': 'XML → JSON',
  'excel-to-pdf': 'Excel → PDF',
};

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ',') {
        current.push(field);
        field = '';
      } else if (ch === '\n' || (ch === '\r' && text[i + 1] === '\n')) {
        current.push(field);
        field = '';
        if (current.length > 0 && current.some((c) => c)) rows.push(current);
        current = [];
        if (ch === '\r') i++;
      } else if (ch === '\r') {
        current.push(field);
        field = '';
        if (current.length > 0 && current.some((c) => c)) rows.push(current);
        current = [];
      } else field += ch;
    }
  }
  current.push(field);
  if (current.length > 0 && current.some((c) => c)) rows.push(current);
  return rows;
}

function toCSV(rows: string[][]): string {
  return rows
    .map((row) =>
      row
        .map((f) =>
          f.includes(',') || f.includes('"') || f.includes('\n')
            ? `"${f.replace(/"/g, '""')}"`
            : f
        )
        .join(',')
    )
    .join('\n');
}

function xmlToJson(xml: string): any {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, 'text/xml');
  const walk = (node: Element): any => {
    const obj: any = {};
    if (node.attributes.length > 0) {
      for (let i = 0; i < node.attributes.length; i++) {
        obj[`@${node.attributes[i].name}`] = node.attributes[i].value;
      }
    }
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const val = child.children.length > 0 ? walk(child) : child.textContent;
      if (obj[child.tagName]) {
        if (!Array.isArray(obj[child.tagName]))
          obj[child.tagName] = [obj[child.tagName]];
        obj[child.tagName].push(val);
      } else obj[child.tagName] = val;
    }
    if (node.textContent?.trim() && Object.keys(obj).length === 0)
      return node.textContent.trim();
    return obj;
  };
  return walk(doc.documentElement);
}

export const FileConvertModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('split-csv');
  const [loading, setLoading] = useState(false);
  const [rowsPerFile, setRowsPerFile] = useState(100);
  const [fileCount, setFileCount] = useState(0);

  const readFile = useCallback(
    (file: File): Promise<ArrayBuffer> =>
      new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result as ArrayBuffer);
        r.onerror = () => rej(r.error);
        r.readAsArrayBuffer(file);
      }),
    []
  );

  const readFileAsText = useCallback(
    (file: File): Promise<string> =>
      new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result as string);
        r.onerror = () => rej(r.error);
        r.readAsText(file);
      }),
    []
  );

  const handleSplitCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setFileCount(0);
    const text = await readFileAsText(file);
    const rows = parseCSV(text);
    if (rows.length < 2) {
      setLoading(false);
      return;
    }
    const header = rows[0];
    const dataRows = rows.slice(1);
    let count = 0;
    for (let i = 0; i < dataRows.length; i += rowsPerFile) {
      const chunk = [header, ...dataRows.slice(i, i + rowsPerFile)];
      const csv = toCSV(chunk);
      downloadBlob(
        new Blob([csv], { type: 'text/csv' }),
        `${file.name.replace('.csv', '')}_part${Math.floor(i / rowsPerFile) + 1}.csv`
      );
      count++;
    }
    setFileCount(count);
    setLoading(false);
  };

  const handleSplitExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setFileCount(0);
    try {
      const XLSX = await import('xlsx');
      const buf = await readFile(file);
      const wb = XLSX.read(new Uint8Array(buf), { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<string[]>(ws, {
        header: 1,
      }) as string[][];
      if (rows.length < 2) {
        setLoading(false);
        return;
      }
      const header = rows[0];
      const dataRows = rows.slice(1);
      let count = 0;
      for (let i = 0; i < dataRows.length; i += rowsPerFile) {
        const chunk = [header, ...dataRows.slice(i, i + rowsPerFile)];
        const nw = XLSX.utils.book_new();
        const ns = XLSX.utils.aoa_to_sheet(chunk);
        XLSX.utils.book_append_sheet(nw, ns, 'Sheet1');
        const out = XLSX.write(nw, { bookType: 'xlsx', type: 'array' });
        downloadBlob(
          new Blob([out]),
          `${file.name.replace(/\.\w+$/, '')}_part${Math.floor(i / rowsPerFile) + 1}.xlsx`
        );
        count++;
      }
      setFileCount(count);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleCSVtoExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const XLSX = await import('xlsx');
      const text = await readFileAsText(file);
      const rows = parseCSV(text);
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const out = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      downloadBlob(new Blob([out]), file.name.replace('.csv', '.xlsx'));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleExcelToCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const XLSX = await import('xlsx');
      const buf = await readFile(file);
      const wb = XLSX.read(new Uint8Array(buf), { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<string[]>(ws, {
        header: 1,
      }) as string[][];
      const csv = toCSV(rows);
      downloadBlob(
        new Blob([csv], { type: 'text/csv' }),
        file.name.replace(/\.\w+$/, '.csv')
      );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleXMLtoExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const XLSX = await import('xlsx');
      const text = await readFileAsText(file);
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/xml');
      const rows: string[][] = [['Tag', 'Attribute', 'Value']];
      const walk = (node: Element, path: string) => {
        for (let i = 0; i < node.attributes.length; i++) {
          rows.push([path, node.attributes[i].name, node.attributes[i].value]);
        }
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          if (child.children.length === 0 && child.textContent) {
            rows.push([`${path}/${child.tagName}`, '', child.textContent]);
          } else walk(child, `${path}/${child.tagName}`);
        }
      };
      walk(doc.documentElement, doc.documentElement.tagName);
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      const out = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      downloadBlob(new Blob([out]), file.name.replace('.xml', '.xlsx'));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleExcelToXML = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const XLSX = await import('xlsx');
      const buf = await readFile(file);
      const wb = XLSX.read(new Uint8Array(buf), { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<string[]>(ws, {
        header: 1,
      }) as string[][];
      if (rows.length < 2) {
        setLoading(false);
        return;
      }
      const headers = rows[0];
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';
      for (let i = 1; i < rows.length; i++) {
        xml += '  <row>\n';
        for (let j = 0; j < headers.length && j < rows[i].length; j++) {
          xml += `    <${headers[j]}>${rows[i][j]}</${headers[j]}>\n`;
        }
        xml += '  </row>\n';
      }
      xml += '</root>';
      downloadBlob(
        new Blob([xml], { type: 'text/xml' }),
        file.name.replace(/\.\w+$/, '.xml')
      );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleXMLtoCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const text = await readFileAsText(file);
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/xml');
      const rows: string[][] = [];
      const walk = (node: Element, path: string) => {
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          if (child.children.length === 0 && child.textContent) {
            rows.push([path, child.tagName, child.textContent]);
          } else walk(child, `${path}/${child.tagName}`);
        }
      };
      rows.push(['Path', 'Tag', 'Value']);
      walk(doc.documentElement, doc.documentElement.tagName);
      const csv = toCSV(rows);
      downloadBlob(
        new Blob([csv], { type: 'text/csv' }),
        file.name.replace('.xml', '.csv')
      );
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleXMLtoJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const text = await readFileAsText(file);
      const json = xmlToJson(text);
      const blob = new Blob([JSON.stringify(json, null, 2)], {
        type: 'application/json',
      });
      downloadBlob(blob, file.name.replace('.xml', '.json'));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <ModalWrapper onClose={onClose} title="File Convert" size="max-w-lg">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            className={`tab ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {tab === 'split-csv' && (
          <>
            <label className="flex flex-col gap-1">
              <span className="text-sm">Rows per file:</span>
              <input
                type="number"
                className="input input-bordered"
                min={1}
                value={rowsPerFile}
                onChange={(e) =>
                  setRowsPerFile(Math.max(1, Number(e.target.value)))
                }
              />
            </label>
            <input
              type="file"
              accept=".csv"
              className="file-input file-input-bordered"
              onChange={handleSplitCSV}
            />
            {loading && <span className="loading loading-spinner" />}
            {fileCount > 0 && (
              <p className="text-sm">Split into {fileCount} files.</p>
            )}
          </>
        )}

        {tab === 'split-excel' && (
          <>
            <label className="flex flex-col gap-1">
              <span className="text-sm">Rows per file:</span>
              <input
                type="number"
                className="input input-bordered"
                min={1}
                value={rowsPerFile}
                onChange={(e) =>
                  setRowsPerFile(Math.max(1, Number(e.target.value)))
                }
              />
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              className="file-input file-input-bordered"
              onChange={handleSplitExcel}
            />
            {loading && <span className="loading loading-spinner" />}
            {fileCount > 0 && (
              <p className="text-sm">Split into {fileCount} files.</p>
            )}
          </>
        )}

        {tab === 'csv-to-excel' && (
          <>
            <input
              type="file"
              accept=".csv"
              className="file-input file-input-bordered"
              onChange={handleCSVtoExcel}
            />
            {loading && <span className="loading loading-spinner" />}
          </>
        )}

        {tab === 'excel-to-csv' && (
          <>
            <input
              type="file"
              accept=".xlsx,.xls"
              className="file-input file-input-bordered"
              onChange={handleExcelToCSV}
            />
            {loading && <span className="loading loading-spinner" />}
          </>
        )}

        {tab === 'xml-to-excel' && (
          <>
            <input
              type="file"
              accept=".xml"
              className="file-input file-input-bordered"
              onChange={handleXMLtoExcel}
            />
            {loading && <span className="loading loading-spinner" />}
          </>
        )}

        {tab === 'excel-to-xml' && (
          <>
            <input
              type="file"
              accept=".xlsx,.xls"
              className="file-input file-input-bordered"
              onChange={handleExcelToXML}
            />
            {loading && <span className="loading loading-spinner" />}
          </>
        )}

        {tab === 'xml-to-csv' && (
          <>
            <input
              type="file"
              accept=".xml"
              className="file-input file-input-bordered"
              onChange={handleXMLtoCSV}
            />
            {loading && <span className="loading loading-spinner" />}
          </>
        )}

        {tab === 'xml-to-json' && (
          <>
            <input
              type="file"
              accept=".xml"
              className="file-input file-input-bordered"
              onChange={handleXMLtoJSON}
            />
            {loading && <span className="loading loading-spinner" />}
          </>
        )}

        {tab === 'excel-to-pdf' && (
          <div className="flex flex-col gap-4">
            <p className="text-sm">Convert Excel files to PDF format.</p>
            <div className="bg-base-200 rounded p-4">
              <p className="mb-2 text-xs font-bold">CLI Command:</p>
              <pre className="text-sm">hieudoanm data excel info file.xlsx</pre>
              <pre className="mt-2 text-sm">
                hieudoanm data excel to-csv file.xlsx
              </pre>
            </div>
            <p className="text-base-content/60 text-xs">
              Excel to PDF conversion requires LibreOffice or pandoc on your
              system.
            </p>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
