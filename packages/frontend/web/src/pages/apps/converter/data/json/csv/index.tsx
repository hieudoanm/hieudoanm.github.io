import { copyToClipboard } from '@nothing/utils/navigator';
import { NextPage } from 'next';
import { useState } from 'react';
import { json2csv } from '@nothing/utils/json';

const JsonToYamlPage: NextPage = () => {
  const [{ json = '', csv = '' }, setState] = useState<{
    json: string;
    csv: string;
  }>({
    json: '',
    csv: '',
  });

  return (
    <div className="h-screen w-screen">
      <div className="grid h-full grid-cols-2 grid-rows-1 md:grid-cols-2 md:grid-rows-1">
        <div className="col-span-1 row-span-1 h-full">
          <textarea
            id="json"
            name="json"
            placeholder="JSON"
            className="h-full w-full p-4 md:p-8"
            value={json}
            onChange={(event) => {
              const newJSON: string = event.target.value;
              try {
                const newCSV: string = json2csv(JSON.parse(newJSON));
                setState({ csv: newCSV, json: newJSON });
              } catch (error) {
                console.error('error', error);
                setState((previous) => ({ ...previous, json: newJSON }));
              }
            }}
          />
        </div>
        <div className="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="csv"
            name="csv"
            placeholder="CSV"
            className="h-full w-full p-4 md:p-8"
            value={csv}
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

export default JsonToYamlPage;
