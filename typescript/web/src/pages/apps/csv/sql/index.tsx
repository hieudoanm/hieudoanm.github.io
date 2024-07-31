import { Layout } from '@web/layout';
import { copyToClipboard } from '@web/utils/copy';
import { csvToJson } from '@web/utils/csv-to-json';
import { download } from '@web/utils/download';
import { jsonParse } from '@web/utils/json-parse';
import type { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

const HomePage: NextPage = () => {
  const [csv, setCSV] = useState<string>(
    'header1,header2,header3,header4\nvalue1,value2,value3,value4\nvalue1,value2,value3,value4\nvalue1,value2,value3,value4\nvalue1,value2,value3,value4'
  );
  const [json, setJSON] = useState<string>('[]');
  const [name, setName] = useState<string>('table_name');
  const [delimiter, setDelimiter] = useState<string>(',');

  const data: object[] = jsonParse(json);
  const sql: string = data
    .map((item) => {
      const keys: string[] = Object.keys(item);
      const values: string[] = Object.values(item);
      const columns: string = keys.map((key: string) => `"${key}"`).join(', ');
      const columnValues: string = values
        .map((value: string) => `"${value}"`)
        .join(', ');
      return `INSERT INTO ${name} (${columns}) VALUES (${columnValues})`;
    })
    .join(';\n');

  return (
    <Layout nav full>
      <div className='container mx-auto h-full'>
        <div className='h-full p-4 md:p-8'>
          <div className='grid h-full grid-cols-2 gap-2 md:gap-4'>
            <div className='col-span-1'>
              <div className='flex h-full flex-col gap-y-2 md:gap-y-4'>
                <label htmlFor='delimiter' className='form-control w-full'>
                  <div className='label'>
                    <span className='label-text'>Delimiter</span>
                  </div>
                  <select
                    id='delimiter'
                    name='delimiter'
                    className='select select-bordered'
                    value={delimiter}
                    onChange={(event) => {
                      const newDelimiter = event.target.value;
                      setDelimiter(newDelimiter);
                    }}>
                    <option value=','>Comma ,</option>
                    <option value=';'>Semicolon ;</option>
                  </select>
                </label>
                <textarea
                  id='csv'
                  name='csv'
                  placeholder='CSV'
                  className='textarea textarea-bordered h-full w-full'
                  style={{ resize: 'none' }}
                  value={csv}
                  onChange={(event) => {
                    setCSV(event.target.value);
                  }}
                />
                <div className='grid grid-cols-1 gap-y-2 md:grid-cols-3 md:gap-x-4'>
                  <div className='col-span-1'>
                    <button
                      type='button'
                      className='btn btn-outline w-full'
                      onClick={() => {
                        const jsonObject = csvToJson(csv, { delimiter });
                        const jsonString: string = JSON.stringify(jsonObject);
                        setJSON(jsonString);
                      }}>
                      Convert SQL
                    </button>
                  </div>
                  <div className='col-span-1'>
                    <button
                      type='button'
                      className='btn btn-outline w-full'
                      onClick={() => copyToClipboard(csv)}>
                      Copy CSV
                    </button>
                  </div>
                  <div className='col-span-1'>
                    <button
                      type='button'
                      className='btn btn-outline w-full'
                      onClick={() => download(csv, 'csv', 'csv')}>
                      Download CSV
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-span-1'>
              <div className='flex h-full flex-col gap-y-2 md:gap-y-4'>
                <label htmlFor='table-name' className='form-control w-full'>
                  <div className='label'>
                    <span className='label-text'>Table Name</span>
                  </div>
                  <input
                    id='name'
                    name='name'
                    className='select select-bordered'
                    value={name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      setName(event.target.value);
                    }}
                  />
                </label>
                <textarea
                  id='sql'
                  name='sql'
                  placeholder='SQL'
                  className='textarea textarea-bordered h-full w-full whitespace-pre'
                  style={{ resize: 'none' }}
                  value={sql}
                  disabled
                />
                <div className='grid grid-cols-1 gap-y-2 md:grid-cols-2 md:gap-x-4'>
                  <div className='col-span-1'>
                    <button
                      type='button'
                      className='btn btn-outline w-full'
                      onClick={() => copyToClipboard(sql)}>
                      Copy SQL
                    </button>
                  </div>
                  <div className='col-span-1'>
                    <button
                      type='button'
                      className='btn btn-outline w-full'
                      onClick={() => download(sql, 'sql', name)}>
                      Download SQL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
