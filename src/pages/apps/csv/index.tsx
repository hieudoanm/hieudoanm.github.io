/* eslint-disable @typescript-eslint/no-explicit-any */
import { csv2json, csv2md, csv2sql } from '@nothing/utils/csv';
import { copyToClipboard } from '@nothing/utils/navigator';
import type { NextPage } from 'next';
import { FC, useState } from 'react';

const Table: FC<{ data: any[] }> = ({ data = [] }) => {
  return (
    <table id="html-table" className="w-full">
      {data[0] ? (
        <thead>
          <tr>
            {Object.keys(data[0]).map((key: string) => {
              return (
                <th key={key} className="border">
                  {key}
                </th>
              );
            })}
          </tr>
        </thead>
      ) : (
        <></>
      )}
      <tbody>
        {data.map((item: Record<string, string>) => {
          return (
            <tr key={`row-${JSON.stringify(item)}`}>
              {Object.values(item).map((value: string) => {
                return (
                  <th key={value} className="border">
                    {value}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const CsvPage: NextPage = () => {
  const delimiter = ',';
  const initialCSV =
    'header1,header2,header3,header4\nvalue1,value2,value3,value4\nvalue1,value2,value3,value4\nvalue1,value2,value3,value4\nvalue1,value2,value3,value4';

  const [{ view, csv, json, md, sql, data }, setEditor] = useState<{
    view: 'html' | 'json' | 'md' | 'sql';
    csv: string;
    json: string;
    md: string;
    sql: string;
    data: any[];
  }>({
    view: 'html',
    csv: initialCSV,
    json: JSON.stringify(csv2json(initialCSV, { delimiter }), null, 4),
    md: csv2md(initialCSV),
    sql: csv2sql(initialCSV),
    data: csv2json(initialCSV, { delimiter }),
  });

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="grid h-full grid-cols-2">
        <div className="col-span-1">
          <textarea
            id="csv"
            name="csv"
            placeholder="CSV"
            className="h-full w-full p-4"
            style={{ resize: 'none' }}
            value={csv}
            onChange={(event) => {
              const newCSV = event.target.value;
              const newData = csv2json(newCSV, { delimiter });
              const newJSON: string = JSON.stringify(newData, null, 4);
              setEditor((previous) => ({
                ...previous,
                csv: newCSV,
                json: newJSON,
                data: newData,
              }));
            }}
          />
        </div>
        <div className="col-span-1 bg-black text-white">
          <div className="flex h-full flex-col gap-y-4 p-4">
            <div className="grid grid-cols-5 gap-x-2">
              {['html', 'json', 'md', 'sql'].map((view: any) => {
                return (
                  <div key={view} className="col-span-1">
                    <button
                      type="button"
                      className="w-full rounded-full bg-white py-2 text-black uppercase"
                      onClick={() =>
                        setEditor((previous) => ({ ...previous, view }))
                      }>
                      {view}
                    </button>
                  </div>
                );
              })}
              <div className="col-span-1">
                <button
                  type="button"
                  className="w-full rounded-full bg-white py-2 text-black uppercase"
                  onClick={() => {
                    if (view === 'html') {
                      const htmlTable: string =
                        document.getElementById('html-table')?.outerHTML ?? '';
                      copyToClipboard(htmlTable);
                    } else if (view === 'json') {
                      copyToClipboard(json);
                    } else if (view === 'md') {
                      copyToClipboard(md);
                    } else if (view === 'sql') {
                      copyToClipboard(sql);
                    }
                  }}>
                  Copy
                </button>
              </div>
            </div>
            {view === 'json' && (
              <div className="grow">
                <textarea
                  id="json"
                  name="json"
                  placeholder="JSON"
                  value={json}
                  readOnly
                  disabled
                  className="no-scrollbar h-full w-full appearance-none"
                />
              </div>
            )}
            {view === 'md' && (
              <div className="grow">
                <textarea
                  id="md"
                  name="md"
                  placeholder="MD"
                  value={md}
                  readOnly
                  disabled
                  className="no-scrollbar h-full w-full appearance-none"
                />
              </div>
            )}
            {view === 'sql' && (
              <div className="grow">
                <textarea
                  id="sql"
                  name="sql"
                  placeholder="SQL"
                  value={sql}
                  readOnly
                  disabled
                  className="no-scrollbar h-full w-full appearance-none"
                />
              </div>
            )}
            {view === 'html' && (
              <div className="grow">
                <Table data={data} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CsvPage;
