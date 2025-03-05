import { csv2json } from '@nothing/utils/csv';
import { copyToClipboard } from '@nothing/utils/navigator';
import { NextPage } from 'next';
import { useState } from 'react';

const CsvToJsonPage: NextPage = () => {
  const [{ csv = '', json = '' }, setState] = useState<{
    csv: string;
    json: string;
  }>({
    csv: '',
    json: '',
  });

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-2 grid-rows-1 md:grid-cols-2 md:grid-rows-1">
        <div className="col-span-1 row-span-1 h-full">
          <textarea
            id="csv"
            name="csv"
            placeholder="CSV"
            className="h-full w-full p-4 md:p-8"
            value={csv}
            onChange={(event) => {
              const newCSV: string = event.target.value;
              const newJSON: string = JSON.stringify(csv2json(csv), null, 2);
              setState({ csv: newCSV, json: newJSON });
            }}
          />
        </div>
        <div className="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="json"
            name="json"
            placeholder="JSON"
            className="h-full w-full p-4 md:p-8"
            value={json}
            onClick={() => {
              copyToClipboard(json);
            }}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default CsvToJsonPage;
