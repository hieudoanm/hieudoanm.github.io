import { Layout } from '@web/layout';
import { copyToClipboard } from '@web/utils/copy';
import { csvToJson } from '@web/utils/csv-to-json';
import { download } from '@web/utils/download';
import { jsonParse } from '@web/utils/json-parse';
import { jsonToCsv } from '@web/utils/json-to-csv';
import type { NextPage } from 'next';
import { useState } from 'react';

const HomePage: NextPage = () => {
  const [csv, setCSV] = useState<string>('header1,header2\nvalue1,value2');
  const [json, setJSON] = useState<string>('');
  const [space, setSpace] = useState<number>(2);
  const [delimiter, setDelimiter] = useState<string>(',');

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
                    <option value={'\t'}>Tab</option>
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
                        const jsonString: string = JSON.stringify(
                          jsonObject,
                          null,
                          space
                        );
                        setJSON(jsonString);
                      }}>
                      Convert JSON
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
                <label htmlFor='space' className='form-control w-full'>
                  <div className='label'>
                    <span className='label-text'>Space</span>
                  </div>
                  <select
                    id='space'
                    name='space'
                    className='select select-bordered'
                    value={space}
                    onChange={(event) => {
                      const newSpace = Number.parseInt(event.target.value, 10);
                      setSpace(newSpace);
                      const jsonObject = jsonParse(json);
                      const jsonString: string = JSON.stringify(
                        jsonObject,
                        null,
                        newSpace
                      );
                      setJSON(jsonString);
                    }}>
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                  </select>
                </label>
                <textarea
                  id='json'
                  name='json'
                  placeholder='JSON'
                  className='textarea textarea-bordered h-full w-full'
                  style={{ resize: 'none' }}
                  value={json}
                  onChange={(event) => {
                    setJSON(event.target.value);
                  }}
                />
                <div className='grid grid-cols-1 gap-y-2 md:grid-cols-3 md:gap-x-4'>
                  <div className='col-span-1'>
                    <button
                      type='button'
                      className='btn btn-outline w-full'
                      onClick={() => {
                        const jsonArray = jsonParse(json);
                        const newCSV: string = jsonToCsv(jsonArray, {
                          delimiter,
                        });
                        setCSV(newCSV);
                      }}>
                      Convert CSV
                    </button>
                  </div>
                  <div className='col-span-1'>
                    <button
                      type='button'
                      className='btn btn-outline w-full'
                      onClick={() => copyToClipboard(json)}>
                      Copy JSON
                    </button>
                  </div>
                  <div className='col-span-1'>
                    <button
                      type='button'
                      className='btn btn-outline w-full'
                      onClick={() => download(json, 'json', 'json')}>
                      Download JSON
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
