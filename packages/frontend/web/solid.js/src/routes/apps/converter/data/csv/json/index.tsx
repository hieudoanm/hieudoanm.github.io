import { csv2json } from '~/utils/csv';
import { copyToClipboard } from '~/utils/navigator';

import { createSignal } from 'solid-js';

const CsvToJsonPage = () => {
  const [{ csv = '', json = '' }, setState] = createSignal<{
    csv: string;
    json: string;
  }>({
    csv: '',
    json: '',
  });

  return (
    <div class="h-screen w-screen">
      <div class="grid h-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <div class="col-span-1 row-span-1 h-full bg-gray-100 text-gray-900">
          <textarea
            id="csv"
            name="csv"
            placeholder="CSV"
            class="h-full w-full p-4 md:p-8"
            value={csv}
            onChange={(event) => {
              const newCSV: string = event.target.value;
              const newJSON: string = JSON.stringify(csv2json(csv), null, 2);
              setState({ csv: newCSV, json: newJSON });
            }}
          />
        </div>
        <div class="col-span-1 row-span-1 h-full bg-gray-900 text-gray-100">
          <textarea
            id="json"
            name="json"
            placeholder="JSON"
            class="h-full w-full p-4 md:p-8"
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
