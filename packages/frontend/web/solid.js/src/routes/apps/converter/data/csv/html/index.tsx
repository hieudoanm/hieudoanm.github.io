/* eslint-disable @typescript-eslint/no-explicit-any */
import { csv2json, csv2md, csv2sql } from '~/utils/csv';
import { copyToClipboard } from '~/utils/navigator';
import { createSignal } from 'solid-js';

const Table = ({ data = [] }: { data: any[] }) => {
  return (
    <div class="h-full w-full overflow-auto rounded border">
      <table id="html-table" class="w-full">
        {data[0] ? (
          <thead>
            <tr>
              {Object.keys(data[0]).map((key: string) => {
                return (
                  <th title={key}>
                    <p class="w-32 truncate px-2" title={key}>
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
              <tr title={`row-${JSON.stringify(item)}`} class="border-t">
                {Object.values(item).map((value: string) => {
                  return (
                    <th title={value}>
                      <p class="w-32 truncate px-2" title={value}>
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

const CsvPage = () => {
  const delimiter = ',';
  const initialCSV =
    'header1,header2,header3,header4\nvalue1,value2,value3,value4\nvalue1,value2,value3,value4\nvalue1,value2,value3,value4\nvalue1,value2,value3,value4';

  const [{ file, csv, data = [] }, setEditor] = createSignal<{
    file: string;
    csv: string;
    data: Record<string, string>[];
  }>({
    file: '',
    csv: initialCSV,
    data: csv2json(initialCSV, { delimiter }),
  });

  const getFile = async (file: string) => {
    let fileCSV: string = initialCSV;
    if (file !== '') {
      const response = await fetch(`/${file}`);
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
    <div class="h-screen w-screen">
      <div class="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div class="col-span-1 row-span-1 h-full bg-gray-100 text-gray-900">
          <div class="flex h-full flex-col gap-y-4 p-4">
            <div>
              <select
                name="file"
                class="w-full appearance-none rounded-full bg-gray-900 px-4 py-2 text-gray-100"
                value={file}
                onChange={async (event) => {
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
            <div class="grow">
              <textarea
                id="csv"
                name="csv"
                placeholder="CSV"
                class="h-full w-full rounded-2xl border border-black p-4"
                style={{ resize: 'none' }}
                value={csv}
                onChange={(event) => {
                  const newCSV = event.target.value;
                  const newData = csv2json(newCSV, { delimiter });
                  setEditor((previous) => ({
                    ...previous,
                    csv: newCSV,
                    data: newData,
                  }));
                }}
              />
            </div>
          </div>
        </div>
        <div class="col-span-1 row-span-1 h-full bg-gray-900 p-4 text-gray-100">
          <button
            class="w-full"
            onClick={() => {
              const htmlTable: string =
                document.getElementById('html-table')?.outerHTML ?? '';
              copyToClipboard(htmlTable);
            }}>
            <Table data={data} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CsvPage;
