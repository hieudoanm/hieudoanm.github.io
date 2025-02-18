/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_PATH } from '@nothing/environments/environments';
import { csv2json, csv2md, csv2sql } from '@nothing/utils/csv';
import { copyToClipboard } from '@nothing/utils/navigator';
import type { NextPage } from 'next';
import { ChangeEvent, FC, useState } from 'react';

const Table: FC<{ data: any[] }> = ({ data = [] }) => {
  return (
    <div className="h-full w-full overflow-auto rounded border">
      <table id="html-table" className="w-full">
        {data[0] ? (
          <thead>
            <tr>
              {Object.keys(data[0]).map((key: string) => {
                return (
                  <th key={key}>
                    <p className="w-32 truncate px-2" title={key}>
                      {key}
                    </p>
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
              <tr key={`row-${JSON.stringify(item)}`} className="border-t">
                {Object.values(item).map((value: string) => {
                  return (
                    <th key={value}>
                      <p className="w-32 truncate px-2" title={value}>
                        {value}
                      </p>
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const CsvPage: NextPage = () => {
  const delimiter = ',';
  const initialCSV =
    'header1,header2,header3,header4\nvalue1,value2,value3,value4\nvalue1,value2,value3,value4\nvalue1,value2,value3,value4\nvalue1,value2,value3,value4';

  const [{ file, view, csv, json, md, sql, data = [] }, setEditor] = useState<{
    file: string;
    view: 'html' | 'json' | 'md' | 'sql';
    csv: string;
    json: string;
    md: string;
    sql: string;
    data: Record<string, string>[];
  }>({
    file: '',
    view: 'html',
    csv: initialCSV,
    json: JSON.stringify(csv2json(initialCSV, { delimiter }), null, 4),
    md: csv2md(initialCSV),
    sql: csv2sql(initialCSV),
    data: csv2json(initialCSV, { delimiter }),
  });

  const getFile = async (file: string) => {
    let fileCSV: string = initialCSV;
    if (file !== '') {
      const response = await fetch(`${BASE_PATH}/${file}`);
      fileCSV = await response.text();
    }
    const fileData: Record<string, string>[] = csv2json(fileCSV, { delimiter });
    console.log(fileData);
    const fileJSON: string = JSON.stringify(fileCSV, null, 4);
    const fileMD: string = csv2md(fileCSV);
    const fileSQL: string = csv2sql(fileCSV);
    setEditor((previous) => ({
      ...previous,
      file,
      csv: fileCSV,
      json: fileJSON,
      data: fileData,
      md: fileMD,
      sql: fileSQL,
    }));
  };

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-2">
        <div className="col-span-1 h-full">
          <div className="flex h-full flex-col gap-y-4 p-4">
            <div>
              <select
                name="file"
                className="w-full appearance-none rounded-full bg-gray-900 px-4 py-2 text-gray-100"
                value={file}
                onChange={async (event: ChangeEvent<HTMLSelectElement>) => {
                  const file = event.target.value;
                  await getFile(file);
                }}>
                <option value="">New</option>
                <option value="data/csv/psychology/hofstede.csv">
                  Psychology - Hofstede
                </option>
                <option value="data/csv/usa/congresses.csv">
                  USA - Congresses
                </option>
                <option value="data/csv/usa/presidents.csv">
                  USA - Presidents
                </option>
                <option value="data/csv/usa/states.csv">USA - States</option>
                <option value="data/csv/vietnam/licenses.csv">
                  Vietnam - Licences
                </option>
                <option value="data/csv/vietnam/provinces.csv">
                  Vietnam - Provinces
                </option>
              </select>
            </div>
            <div className="grow">
              <textarea
                id="csv"
                name="csv"
                placeholder="CSV"
                className="h-full w-full rounded-2xl border border-black p-4"
                style={{ resize: 'none' }}
                value={csv}
                onChange={(event) => {
                  const newCSV = event.target.value;
                  const newData = csv2json(newCSV, { delimiter });
                  const newJSON: string = JSON.stringify(newData, null, 4);
                  const newMD: string = csv2md(newCSV);
                  const newSQL: string = csv2sql(newCSV);
                  setEditor((previous) => ({
                    ...previous,
                    csv: newCSV,
                    json: newJSON,
                    data: newData,
                    md: newMD,
                    sql: newSQL,
                  }));
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 h-full bg-gray-900 text-gray-100">
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
